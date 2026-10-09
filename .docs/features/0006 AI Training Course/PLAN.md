# Plan: AI training for non-technical people

Use this file to finish the repositioning. Do not start the site rewrite until the open decisions in the last section are filled in. Recommended defaults are marked so we can move if an answer does not arrive.

## Goal

Turn the public site from a Shopify plugin brochure into a training business. The business teaches people who do not write code how to use AI in their real work.

Visitors should be able to read a concrete course, decide it is for them, and sign up. Signing up is for two things:

1. A protected class (lessons, exercises, and a prompt library that are not on the public site).
2. One-on-one instruction tied to the student's actual job.

## What the site is today

The live marketing site is a small React Router app. Public routes are only:

- `/` Home
- `/about`
- `/contact`
- `/privacy`
- `/terms`

Copy, titles, and the footer still sell enterprise Shopify plugins, Azure AI integration, and custom app development. The contact form collects a name, email, subject, and message, then only logs the submission in the browser. There is no account system, no payment, and no page that requires a login.

Company facts already on the site, and safe to keep unless you say otherwise:

- Legal name: WDS IT, LLC
- Location: Olathe, Kansas
- Email: support@wds-it.com

Do not invent instructor credentials, student counts, testimonials, prices, or guarantees. Privacy and terms are written for Shopify apps. They need a real legal pass before we publish training terms. This plan does not draft legal language.

## Offer we are designing toward

Working name: **Use AI at Work**

One-line promise: a short, practical course that shows non-technical people how to brief an AI assistant, check its work, and use it on the writing, research, and planning they already do.

Who it is for, until you pick a tighter audience: working adults who live in email, documents, meetings, and spreadsheets, and who feel behind on AI. They do not want to learn to code or to build models.

Who it is not for: developers shopping for an engineering course, and anyone looking for a certificate that promises a job.

What a student gets:

- Four guided weeks of class material.
- Exercises that use the student's own work, with private data stripped out.
- A small prompt library and checklists.
- Two private sessions: one to choose a workflow, one to review the capstone.

Public pages sell the outcome and show the week titles. The lesson steps, worked examples, worksheets, and prompt library stay behind the class login.

## Course outline

Public syllabus (this is what the course page shows). Protected notes are what we write into the classroom, not onto the marketing page.

### Week 1 — See what it can and cannot do

Public: Stop guessing. Leave with a clear picture of what these tools are good at, and three tasks you can try the same day.

Protected lessons:

- A plain explanation: the tool predicts a useful next answer. It is not a person and it does not "know" your files unless you give them.
- Set up one mainstream assistant the student already has access to. Teach the skill, not a single vendor.
- Three first tasks: rewrite an email, summarize meeting notes, turn a brain dump into a list.
- What never goes into the tool: passwords, customer lists, health information, legal matters, and unpublished financials.

Exercise: bring one real email with names and account details removed. Produce a rewrite. Keep the version you would actually send.

### Week 2 — Brief it like a capable assistant

Public: Give instructions that return a useful first draft instead of a generic one.

Protected lessons:

- The brief: role, goal, audience, constraints, and one example of a good result.
- What to say when the draft is wrong, vague, too long, or the wrong tone.
- Reusable briefs for an email, a meeting agenda, a status update, and a customer reply.
- How to save the briefs that worked so you are not starting over next time.

Exercise: write three briefs from the student's real job and run them.

### Week 3 — Trust, but verify

Public: Catch invented facts, and keep private information private.

Protected lessons:

- Why a confident answer can still be wrong.
- A short check: names, numbers, dates, quotes, and sources.
- A research habit: ask for a plan, check the claims, then write.
- Decisions the student still makes: hiring, health, legal, money, and anything about a specific person.

Exercise: fact-check one AI research brief and mark what you would not pass on.

### Week 4 — Make it part of your week

Public: Leave with one workflow you will keep using, and a 30-minute weekly routine.

Protected lessons:

- Map the week's tasks into "hand off," "draft then edit," and "do it yourself."
- Build the capstone workflow: trigger, brief, check, and where the result goes.
- A weekly routine that does not depend on chasing every new product announcement.
- How the second private session reviews the capstone.

Exercise: finish the capstone template and bring it to the second one-on-one.

### One-on-one instruction

- Session 1, after week 1: the student's role, tools, and the task that wastes the most time. They leave with one workflow chosen.
- Session 2, after week 4: review the capstone on their real work (still with sensitive details removed), fix what feels awkward, and set the next 30 days.

Protected classroom inventory, written only after the public pages are approved:

- Four week pages, each with the lessons above.
- Worksheet for the email rewrite, the three briefs, the fact-check, and the capstone.
- Prompt library (the briefs from week 2, plus a "check my work" brief).
- One-page "do not paste this" checklist.
- Agenda for each private session.

## Public site map

Keep the current visual system (layout, theme switcher, type). Change the words, the routes, and the calls to action.

| Page | Route | Job of the page |
| --- | --- | --- |
| Home | `/` | Promise, who it is for, how class plus one-on-one works, a peek at the four weeks, enroll |
| Course | `/course` | Full public syllabus, what is included, how access works, FAQ, enroll |
| About | `/about` | Why this is taught in plain language, and only the bio facts you confirm |
| Enroll | `/enroll` | Signup for the protected class and the private sessions |
| Privacy | `/privacy` | Keep the page, replace Shopify-app language only after a legal review |
| Terms | `/terms` | Same. Do not publish training terms we drafted ourselves |
| Classroom | `/classroom` | Later. Login required. Not linked in the public nav until it exists |

Navigation becomes Home, Course, About, Enroll. Footer line becomes a training description, still under WDS IT, LLC, until you choose another public name.

### Home, in order

1. Headline and subhead using the one-line promise. Primary button: Enroll. Secondary: See the course.
2. The problem, in the student's words: tools feel confusing, answers look polished and are sometimes wrong, and nobody showed you a way to use this at work without becoming technical.
3. Three outcomes: brief an assistant, check the result, and keep one workflow.
4. How it works: four weeks of class material, exercises on your own work, two private sessions.
5. Four week cards. Titles and the public one-liners only.
6. Who it is for, and who should skip it.
7. Closing enroll block.

No testimonial row until you have permission to quote a real student.

### Course page

- Repeat the promise in one paragraph.
- Week-by-week public syllabus.
- Included list: class material, exercises, prompt library, two one-on-ones.
- Format line, filled from your decision: live meetings, self-paced lessons, or both.
- Access line: materials are for enrolled students. The public page is the outline, not the class.
- FAQ seeds: Do I need to code? Which AI product? What if I have never used one? Is the private session about my job? What data should I avoid pasting? Can I get a refund? (Refund answer waits on your policy.)

### Enroll page

Replace the generic contact pitch. Fields:

- Name
- Email
- Role (short text: what you do at work)
- The task you most want help with
- Optional note

Submit copy: you are requesting a seat in the next group. We reply by email with how to join the class and book the private sessions. Do not say payment succeeded. The form does not charge anyone yet.

Until a real endpoint exists, keep the current simulated submit, and label that limitation in the implementation notes so we do not imply the signup is stored.

### About page

Replace the Shopify story. Teach the point of view: plain language, real work, and checking the output. Add a short instructor bio only from facts you provide. If you do not provide one, the page stays about the teaching approach and the company, with no invented career history.

## Protected content, phased

Do not build accounts in the same pass as the marketing copy.

**Phase 1 — public site and enrollment request.** Rewrite Home, About, and the new Course and Enroll pages. Update titles, descriptions, nav, and footer. Update Playwright checks that look for the old Shopify titles. Enrollment stores nothing until you pick a destination for the form.

**Phase 2 — classroom.** Add a login (magic link is the simplest fit for this audience) and routes under `/classroom` for the four weeks, the worksheets, and the prompt library. A person who is not signed in sees a short explanation and a link to enroll. Lesson text lives in markdown so the class can be edited without a redesign.

**Phase 3 — paid seats and scheduling.** Connect enrollment to payment and to a booking link for the two private sessions. Only after price, refund policy, and the calendar tool are chosen.

Phase 1 is the work this plan unlocks next. Phase 2 and 3 stay scoped here so the public copy does not promise a login or a checkout we have not built. The enroll button asks for a seat. It does not say "start the class now."

## Files phase 1 will touch

- `app/routes/home.tsx`
- `app/routes/about.tsx`
- `app/routes/contact.tsx` (retire or redirect once `/enroll` exists)
- new `app/routes/course.tsx`
- new `app/routes/enroll.tsx`
- `app/routes.ts`
- `app/components/Navigation.tsx`
- `app/components/Footer.tsx`
- `tests/deployment/smoke.spec.ts`
- `tests/e2e/navigation.spec.ts`
- page titles and meta descriptions

Leave `app/routes/privacy.tsx` and `app/routes/terms.tsx` unchanged in phase 1 except where a title still says "Shopify Apps" and would confuse a reader. Body legal text waits for review.

README's opening description should match the new business. Deployment and stack docs stay as they are.

## Content rules

- Write to one reader who is capable and new to AI. Short sentences. Define any term the first time it appears.
- Show the work: before and after an email, a meeting summary, a brief. No slogans without an example.
- Separate "the tool drafted this" from "you decided to send it."
- Name limits: invented facts, private data, and decisions that stay with a person.
- Do not claim certification, job placement, income, or that every answer will be correct.
- Do not name a price, cohort date, or seat count until you set them.

## Open decisions

Fill these in before the rewrite. The default is what we will use if you do not choose.

1. **Primary student.** Default: any working adult in a non-technical role. A tighter answer (office managers, small-business owners, marketers, teachers) changes week 2 examples and the home page.
2. **Format.** Default: self-paced lessons plus two scheduled one-on-ones. Say if the class itself is live on a call.
3. **How one-on-one is sold.** Default: both private sessions are part of the course, not a separate product.
4. **Price and refunds.** Default: no number on the site in phase 1. Enrollment is a request, and you reply with the price. Do not publish a refund policy until you write one.
5. **Public name.** Default: keep WDS IT, LLC, and use "Use AI at Work" as the course name on wdsit.com.
6. **First release.** Default: phase 1 only (public pages and an enrollment request). Classroom login is phase 2.
7. **Voice and bio.** Default: "we," company voice, no personal bio until you send the facts you want published.
8. **Tools we may name.** Default: speak about "an AI assistant you already have," and mention ChatGPT, Copilot, and Gemini only as examples, not as requirements.
9. **Where enrollments go.** Default: leave the form simulated and visible as a request UI. Do not pretend emails are delivered.

## Implementation checklist

Use this order once the decisions above are confirmed or the defaults are accepted.

1. Confirm or edit the nine decisions in this file.
2. Draft Home, Course, About, and Enroll copy into this folder for a read-through before putting it in the routes.
3. Implement the routes and navigation.
4. Point old `/contact` links at `/enroll`.
5. Update tests that assert Shopify titles or the old nav.
6. Run the Playwright suite.
7. Read the four pages in the browser, desktop and mobile: enroll from home, open the course, confirm week titles match this outline, confirm nothing promises a login, a charge, or a testimonial we do not have.
8. Stop. Do not build the classroom until phase 1 is accepted.

## Progress

- [x] Plan written from the current site
- [ ] Decisions confirmed
- [ ] Public copy drafted
- [ ] Phase 1 pages implemented
- [ ] Tests updated and passing
- [ ] Browser check of the enroll path
