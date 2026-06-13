# FULL FEATURE PROMPT — BUSINESS SYSTEM (NEW FEATURE)
### For: Google AI Studio / Gemini (Anti-Gravity)
### Important: This is a COMPLETELY NEW feature. Do NOT modify or interfere with any existing features on the website (AR Album, existing admin menus, existing payment system, existing homepage, etc.). Build this as a separate, isolated module.

---

## TECH STACK
- **Frontend**: React + JavaScript (same as existing site)
- **Database**: Supabase
- **Hosting**: Vercel
- **Payment**: Manual UPI (admin provides UPI ID + QR code from admin panel)

---

## OVERVIEW

Build a **Business System** module — a subscription-based multi-client access platform where the admin registers businesses, assigns packages, and controls access. Each registered business gets their own subdomain login portal and dashboard to use the Magic Frame (AR Album) feature with limits based on their package.

---

## PART 1 — ADMIN PANEL CHANGES

### 1.1 — Menu Structure Update

In the existing admin panel, **split the current menu into two separate sections**:

**Section 1**: Keep all existing menu options as-is (do not touch).

**Section 2**: Add a new section with heading: **"Business System"**

Under "Business System", add the following menu options:
1. **Register Business** — Register a new client business
2. **Access History** — View and manage all registered businesses
3. **Purchase Requests** — View incoming upgrade/renewal requests from clients
4. **Payment Settings** — Admin inputs UPI ID and uploads QR code image

---

### 1.2 — Register Business (Admin Menu)

This form allows the admin to register a new business client.

**Form Fields:**
- Business Name (text) — this becomes the subdomain slug (auto-lowercase, spaces replaced with hyphens)
- Business Logo (image upload)
- Email ID
- Password (admin sets this for the client)
- Instagram ID (optional)
- Package Selection (radio or dropdown):
  - ₹299 — 600 Magic Frames / month
  - ₹799 — 1500 Magic Frames / month
  - ₹4999 — Own Website + Unlimited Magic Frames / month
- Activation Date (auto-set to today's date)
- Next Renewal Date (auto-set to exactly 1 month from activation date)

**On Submit:**
- Save all data to Supabase table: `business_clients`
- Auto-generate subdomain URL: `businessname.yourdomain.com` (use the Business Name as slug)
- Create login credentials: email + password (store securely in Supabase — hash password)
- Set frame usage count to 0
- Set frame limit based on selected package (600 / 1500 / unlimited)
- Send confirmation (optional console log or success toast)

**Supabase Table: `business_clients`**
```
id, business_name, business_slug, logo_url, email, password_hash,
instagram_id, package_type (299/799/4999), frame_limit,
frames_used, activation_date, next_renewal_date, is_active,
created_at
```

---

### 1.3 — Access History (Admin Menu)

A full table/list of all registered business clients.

**Each row shows:**
- Business Name + Logo thumbnail
- Package type
- Frames used / Frame limit
- Activation Date
- Next Renewal Date
- Days remaining until renewal
- Status (Active / Expired)
- Actions: **Edit** button

**Edit functionality:**
Admin can edit any field: Business Name, Logo, Email, Password, Instagram ID, Package, Frame Limit, Renewal Date, Active/Inactive toggle.

All changes save to Supabase in real-time and immediately reflect on the client's dashboard.

---

### 1.4 — Purchase Requests (Admin Menu)

When a client submits an upgrade request (from their dashboard), it appears here.

**Each request shows:**
- Business Name
- Current Package
- Requested Package
- Transaction Screenshot (viewable image)
- Transaction Number (text entered by client)
- Request Date/Time
- Status: Pending / Approved / Rejected

**Admin Actions:**
- **Approve**: Updates client's package in `business_clients` table, resets frame limit to new package's limit, resets frames_used to 0, updates next_renewal_date to today + 1 month. Status changes to Approved.
- **Reject**: Status changes to Rejected. Client sees rejection on dashboard.

---

### 1.5 — Payment Settings (Admin Menu)

Admin inputs:
- UPI ID (text field)
- QR Code Image (upload)

Saved to Supabase table: `payment_settings`
```
id, upi_id, qr_code_url, updated_at
```

This data is used in the client upgrade payment flow.

---

## PART 2 — CLIENT SUBDOMAIN PORTAL

### 2.1 — Subdomain Routing

Each business client gets a unique subdomain:
`businessslug.yourdomain.com`

**Implementation using Vercel + Supabase:**
- In Vercel, add a wildcard domain: `*.yourdomain.com`
- In the React app, on page load detect `window.location.hostname`
- Extract subdomain slug from hostname
- Query Supabase `business_clients` table where `business_slug = extractedSlug`
- If found and active → render the Business Client Portal
- If not found → show 404 / "Invalid Link" page

---

### 2.2 — Client Login Page

URL: `businessslug.yourdomain.com` (root of subdomain)

**Page Design:**
- Show client's Business Logo (fetched from Supabase by slug)
- Login form: Email + Password
- Login button
- On login: verify credentials against Supabase `business_clients` table
- On success: store session (localStorage or Supabase auth session) and redirect to Client Dashboard
- On failure: show error message

---

### 2.3 — Client Dashboard

After login, the client sees their dashboard.

**Section A — Subscription Info:**
- Current Package Name (e.g., "₹299 Plan — 600 Magic Frames")
- Next Renewal Date (exact date)
- Days remaining until renewal
- Frames Used / Total Limit (e.g., "320 / 600 Magic Frames used")
- Progress bar showing usage

**Section B — Renewal Notification (Popup):**
- On every login, check if renewal date is within 7 days
- If yes → show a popup/banner: *"Your subscription is expiring soon! Please renew to continue using Magic Frames."*
- Show only once per login session (not repeatedly during same session)

**Section C — Upgrade Package:**
- Show list of available higher packages (only packages above current one)
- Each package card shows: Price, Frame limit, Features
- **"Upgrade Now"** button on each card
- On click → opens Upgrade Payment Flow (see 2.4)

**Section D — Magic Frame Access:**
- Menu item / button labeled **"Magic Frames"** (same concept as existing AR Album menu, just renamed)
- On click → opens the same AR Album / scan page that currently exists in the website
- **Important**: This does NOT rebuild the AR Album. It just routes to the existing AR Album feature/page, linked to this client's account
- Frame upload limit enforced: if client tries to upload and frames_used >= frame_limit → show error: *"You have reached your Magic Frame limit. Please upgrade your plan."*
- Every time a frame is uploaded through this client's account → increment `frames_used` in Supabase by 1
- Always show remaining frame count on this page: *"X frames remaining"*

**Section E — Enable/Disable Photo Frame Display (Client Admin Toggle):**
- A toggle switch: **"Show Photo Frame Designs"** (Enabled / Disabled)
- When Enabled → on the client's subdomain landing/public page, photo frame design previews are shown below the scan button
- When Disabled → photo frame designs are hidden from the public-facing page
- This preference saved in Supabase: `show_frames_preview` (boolean) in `business_clients` table

---

### 2.4 — Upgrade Payment Flow

When client clicks "Upgrade Now":

1. Show payment page with:
   - Admin's UPI ID (fetched from `payment_settings`)
   - Admin's QR Code image (fetched from `payment_settings`)
   - Amount to pay (based on selected package)
   - Input field: Transaction Number
   - Upload field: Payment Screenshot (image)
   - Submit button: "Send Upgrade Request"

2. On submit:
   - Save request to Supabase table: `upgrade_requests`
   ```
   id, client_id, current_package, requested_package,
   transaction_number, screenshot_url, status (pending/approved/rejected),
   created_at
   ```
   - Show confirmation: *"Your upgrade request has been submitted. Admin will review and activate shortly."*

3. Admin sees request in **Purchase Requests** menu (Part 1.4)
4. On admin approval → client package updates in real-time (next time they refresh or check dashboard)

---

## PART 3 — CLIENT PUBLIC PAGE (Subdomain Landing)

When someone visits `businessslug.yourdomain.com` **without logging in** (public-facing page):

**Layout:**
- Top: Client's Business Logo
- Center: Button — **"Scan Magic Frame"** (with camera icon)
  - On click → opens the existing AR Album scan feature (same as what currently exists on the main site for AR scan, just linked here)
  - **Fix needed**: Currently the scan option is only visible on mobile view. Make it visible and functional on desktop/PC view as well. Apply responsive CSS so the scan button and camera functionality works on both mobile and desktop.
- Below scan button: Photo Frame Design Previews
  - These are shown ONLY if the client has toggled "Show Photo Frame Designs" = Enabled (from their dashboard)
  - If disabled → this section is hidden

---

## PART 4 — REAL-TIME DATA REQUIREMENTS

All the following must be real-time (live Supabase data, no static/hardcoded values):
- Frame usage count (frames_used)
- Frame limit (frame_limit)
- Renewal date and days remaining
- Package type
- Client active/inactive status
- Show/hide photo frames toggle
- Upgrade request status
- Admin edits reflecting immediately on client dashboard

Use Supabase real-time subscriptions or re-fetch on each page load where applicable.

---

## PART 5 — IMPORTANT NOTES & CONSTRAINTS

1. **Do NOT modify** any existing features: AR Album, existing admin menus, homepage, existing payment system, existing scan page. Only ADD new features.
2. The existing AR Album scan feature is already working. For Magic Frames, simply link/route to it — do not rebuild it.
3. Subdomain routing must be handled via Vercel wildcard domain (`*.yourdomain.com`) + React hostname detection.
4. All client data isolated by `business_slug` / `client_id` — no cross-client data leakage.
5. Admin is the only one who can register clients, approve upgrades, and edit client data.
6. Client login is separate from admin login — different routes, different auth.
7. Package upgrade resets frame count to 0 and sets new frame limit (fresh start).
8. Monthly subscription: activation date + 1 month = renewal date. After renewal date passes and admin hasn't renewed → `is_active` can be set to false (admin controls this manually or via auto-check).
9. Renewal notification popup shows once per login session, only when renewal is within 7 days.
10. All passwords must be hashed (use Supabase Auth or bcrypt — do not store plain text).

---

## SUMMARY OF NEW SUPABASE TABLES NEEDED

| Table | Purpose |
|---|---|
| `business_clients` | All registered client businesses |
| `upgrade_requests` | Client upgrade/purchase requests |
| `payment_settings` | Admin UPI ID and QR code |

---

## DELIVERABLE

Build the complete Business System as described above using React + JavaScript + Supabase. All logic must be functional, real-time, and cleanly separated from existing website features. Admin panel additions must appear under a clearly labeled "Business System" section in the admin menu.
