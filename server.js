import express from "express";
import { createRequestHandler } from "@react-router/express";
import { Resend } from "resend";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Initialize Resend for email sending
const resend = process.env.RESEND_API_KEY
	? new Resend(process.env.RESEND_API_KEY)
	: null;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust proxy for Cloud Run
app.set("trust proxy", true);

// Health check endpoint for Cloud Run
app.get("/health", (req, res) => {
	res.status(200).json({ status: "healthy" });
});

// Contact form API endpoint
app.post("/api/contact", async (req, res) => {
	try {
		const { name, email, message } = req.body;

		// Validate input
		if (!name || !email || !message) {
			return res.status(400).json({
				error: "Missing required fields",
				details: "Name, email, and message are required",
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

		// Send email via Resend
		const { data, error } = await resend.emails.send({
			from: "contact@wdsit.com", // Must be verified domain
			to: "info@wdsit.com", // Your receiving email
			replyTo: email,
			subject: `Contact Form: ${name}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, "<br>")}</p>
			`,
		});

		if (error) {
			console.error("Resend API error:", error);
			return res.status(500).json({
				error: "Failed to send email",
				details: error.message,
			});
		}

		console.log("Email sent successfully:", data);
		res.status(200).json({
			success: true,
			message: "Email sent successfully",
		});
	} catch (error) {
		console.error("Contact form error:", error);
		res.status(500).json({
			error: "Internal server error",
			details: error.message,
		});
	}
});

// Serve static assets from build/client
app.use(
	express.static(path.join(__dirname, "build", "client"), {
		maxAge: "1y",
		immutable: true,
		setHeaders: (res, path) => {
			// Set security headers
			res.setHeader("X-Content-Type-Options", "nosniff");
			res.setHeader("X-Frame-Options", "SAMEORIGIN");
			res.setHeader("X-XSS-Protection", "1; mode=block");

			// Set caching headers for assets
			if (path.includes("/assets/")) {
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
		message:
			process.env.NODE_ENV === "production"
				? "Something went wrong"
				: err.message,
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
