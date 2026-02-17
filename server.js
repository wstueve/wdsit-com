import express from "express";
import { createRequestHandler } from "@react-router/express";
import { Resend } from "resend";
import * as path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Initialize Resend for email sending
const resend = process.env.RESEND_API_KEY
	? new Resend(process.env.RESEND_API_KEY)
	: null;

// Trust proxy for Cloud Run (must be set before rate limiter)
app.set("trust proxy", true);

// Security headers via helmet
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'"],
				styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
				imgSrc: ["'self'", "data:", "https:"],
				fontSrc: ["'self'", "https://fonts.gstatic.com"],
				connectSrc: ["'self'"],
				frameAncestors: ["'none'"],
				baseUri: ["'self'"],
				formAction: ["'self'"],
				upgradeInsecureRequests: [],
			},
		},
		referrerPolicy: { policy: "strict-origin-when-cross-origin" },
		hsts: {
			maxAge: 63072000, // 2 years
			includeSubDomains: true,
			preload: true,
		},
		permissionsPolicy: {
			features: {
				camera: ["'none'"],
				microphone: ["'none'"],
				geolocation: ["'none'"],
				payment: ["'none'"],
			},
		},
	}),
);

// Middleware with body size limits to prevent DoS
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 10 requests per window
	standardHeaders: true,
	legacyHeaders: false,
	message: { error: "Too many requests, please try again later." },
});

// General rate limiting
const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 200,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(generalLimiter);

// Health check endpoint for Cloud Run
app.get("/health", (req, res) => {
	res.status(200).json({ status: "healthy" });
});

/**
 * Escape HTML entities to prevent XSS in email content.
 * @param {string} str - Raw user input string.
 * @returns {string} Escaped string safe for HTML embedding.
 */
function escapeHtml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

// Contact form API endpoint with rate limiting
app.post("/api/contact", apiLimiter, async (req, res) => {
	try {
		const { name, email, message } = req.body;

		// Validate required fields
		if (!name || !email || !message) {
			return res.status(400).json({
				error: "Missing required fields",
				details: "Name, email, and message are required",
			});
		}

		// Validate input types
		if (
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof message !== "string"
		) {
			return res.status(400).json({
				error: "Invalid input types",
			});
		}

		// Validate input lengths to prevent abuse
		if (name.length > 200 || email.length > 254 || message.length > 5000) {
			return res.status(400).json({
				error: "Input too long",
				details: "Name (max 200), email (max 254), message (max 5000) characters",
			});
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				error: "Invalid email format",
			});
		}

		// Check if Resend is configured
		if (!resend) {
			console.error("Resend API key not configured");
			return res.status(500).json({
				error: "Email service not configured",
			});
		}

		// Sanitize inputs before embedding in HTML
		const safeName = escapeHtml(name.trim());
		const safeEmail = escapeHtml(email.trim());
		const safeMessage = escapeHtml(message.trim());

		// Send email via Resend
		const { data, error } = await resend.emails.send({
			from: "contact@wdsit.com",
			to: "info@wdsit.com",
			replyTo: email.trim(),
			subject: `Contact Form: ${safeName}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${safeName}</p>
				<p><strong>Email:</strong> ${safeEmail}</p>
				<p><strong>Message:</strong></p>
				<p>${safeMessage.replace(/\n/g, "<br>")}</p>
			`,
		});

		if (error) {
			console.error("Resend API error:", error);
			return res.status(500).json({
				error: "Failed to send email",
			});
		}

		console.log("Email sent successfully:", data?.id);
		res.status(200).json({
			success: true,
			message: "Email sent successfully",
		});
	} catch (error) {
		console.error("Contact form error:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Serve static assets from build/client
app.use(
	express.static(path.join(__dirname, "build", "client"), {
		maxAge: "1y",
		immutable: true,
		setHeaders: (res, filePath) => {
			// Set caching headers for hashed assets
			if (filePath.includes("/assets/")) {
				res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
			}
		},
	}),
);

// Serve public files
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1h" }));

// React Router SSR handler
const viteDevServer =
	process.env.NODE_ENV === "production"
		? undefined
		: await import("vite").then((vite) =>
				vite.createServer({
					server: { middlewareMode: true },
				}),
			);

if (viteDevServer) {
	app.use(viteDevServer.middlewares);
} else {
	app.all(
		"*",
		createRequestHandler({
			build: () => import("./build/server/index.js"),
		}),
	);
}

// Error handling middleware
app.use((err, req, res, next) => {
	console.error("Server error:", err);
	res.status(500).json({
		error: "Internal server error",
		...(process.env.NODE_ENV !== "production" && { message: err.message }),
	});
});

// Start server
app.listen(port, "0.0.0.0", () => {
	console.log(`Server running on port ${port}`);
	console.log(`Environment: ${process.env.NODE_ENV}`);
	console.log(`Resend configured: ${!!resend}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
	console.log("SIGTERM received, shutting down gracefully");
	process.exit(0);
});
