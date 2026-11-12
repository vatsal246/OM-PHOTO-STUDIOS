# Om Photo Studio — Malad West, Mumbai

A production-quality local website, booking platform, local pickup print ordering system, and admin dashboard for **Om Photo Studio**, a photography business in Malad West, Mumbai owned and operated by **Dharmesh Pithwa**.

---

## Business Information

- **Business Name**: Om Photo Studio
- **Proprietor**: Dharmesh Pithwa
- **Address**: Shop No. 1, Monday Market, Near Patla Devi Temple, Bhailal Road, Somvari Bazar, Malad West, Mumbai – 400064, Maharashtra, India
- **Map Coordinates**: `19°10'58.5"N 72°50'31.9"E` (Decimal: `19.182917, 72.842194`)
- **Directions Link**: [Google Maps Directions](https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194)
- **Map Link**: [Google Maps View](https://www.google.com/maps/search/?api=1&query=19.182917,72.842194)
- **Business Hours (Asia/Kolkata IST)**:
  - **Monday–Saturday**: 10:00 AM – 9:00 PM
  - **Sunday**: 10:30 AM – 5:00 PM

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (warm gold, royal blue, coral red, and deep navy palette)
- **Database & ORM**: SQLite (`dev.db`) with Prisma ORM
- **Validation**: Zod & React Hook Form
- **Icons**: Lucide React
- **Timezone**: Indian Standard Time (`Asia/Kolkata`, UTC+05:30)
- **Authentication**: HMAC-signed session cookie for local password protection

---

## Local Setup & Quick Start

Execute the following standard commands in order:

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Synchronize SQLite local database
npx prisma db push

# 4. Seed realistic demo data (bookings, print orders, inquiries, settings, gallery)
npm run seed

# 5. Run tests for opening hours & booking logic
npm test

# 6. Start the local development server
npm run dev
```

The website will be available at:
👉 **[http://localhost:3000](http://localhost:3000)**

*(Note: If port 3000 is occupied, Next.js will automatically select the next available port, e.g., `http://localhost:3001`)*

---

## Admin Dashboard

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Password**: `admin123` (configured via `ADMIN_PASSWORD` in `.env`)
- **Capabilities**:
  - View, search, filter, approve, mark complete, and cancel appointment bookings.
  - Review print requests with image previews and update production status.
  - Read customer inquiries and respond directly on WhatsApp.
  - Update business configurations (WhatsApp, Phone, Email, Google Review URL, Prices, Holiday Notices, Opening Hours) with instant SQLite persistence.
  - Manage showcase gallery items.

---

## Configurable Items to be Supplied by Dharmesh Pithwa

Before launching commercially, Dharmesh can update the following settings directly in the **Admin Dashboard > Settings** or `.env`:

1. **WhatsApp Number**: Active studio WhatsApp number for receiving prefilled messages (until added, buttons open a friendly setup guidance modal).
2. **Phone Number**: Official studio calling number.
3. **Email Address**: Studio email address.
4. **Real Pricing**: Final confirmed rates for passport packs, visa sets, studio portraits, and print sizes.
5. **Real Photo Gallery**: Replace sample demonstration visuals with actual studio setup and customer portrait portfolio.
6. **Google Review Link**: Official Google Business Profile review link for the "Leave a Google Review" button.
7. **Opening Hours**: Confirm any special Sunday or holiday timings.

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, services, why choose us, visa specs, sample gallery, demo reviews, live IST hours, and directions |
| `/services` | Detailed list of passport, visa, portrait, and photo print services |
| `/passport-visa-photos` | Embassy specifications (India, USA, UK, Schengen, Canada, etc.) with WhatsApp inquiry triggers |
| `/book` | Working booking system with real-time slot availability, Sunday hours logic, and WhatsApp confirmation share |
| `/print-order` | Photo print order form with multiple file uploads, local storage, previews, and size selection |
| `/gallery` | Filterable sample gallery showcasing lighting and finishing standards |
| `/about` | Story of Om Photo Studio, proprietor Dharmesh Pithwa, and Somvari Bazar heritage |
| `/contact` | Working inquiry form, directions, live IST status, and coordinates |
| `/faq` | Searchable accordion FAQs covering passport regulations, glasses, turnaround, and walk-ins |
| `/admin` | Password-protected admin control panel |
| `/admin/login` | Secure login page for admin access |

---

## Verified Business Logic

Run the automated test suite anytime with:
```bash
npm test
```
Verifies:
- Live IST open/closed detection for weekday (10:00 AM – 9:00 PM) vs Sunday (10:30 AM – 5:00 PM).
- Dynamic 30-minute booking slot generation avoiding past times.
- Double-booking prevention on conflicting dates and slots.
- Cryptographic HMAC session signing and anti-tamper security.

