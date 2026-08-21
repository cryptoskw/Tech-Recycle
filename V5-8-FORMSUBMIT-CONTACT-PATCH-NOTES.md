# TechRecycle V5.8 — GitHub/FormSubmit Contact Update Patch

This patch is for the GitHub Pages version of TechRecycle.

## What this patch updates

- Confirms all TechRecycle contact forms use:
  `https://formsubmit.co/info@techrecycle.co.za`
- Adds the FormSubmit hidden fields:
  - `_subject` = New TechRecycle website enquiry
  - `_template` = table
  - `_captcha` = false
  - `_next` = https://techrecycle.co.za/thank-you/
  - `_honey` honeypot anti-spam field
- Removes the old blank `_replyto` hidden field.
- Updates the contact form JavaScript fallback in `assets/js/main.js`.
- Updates cache-busting to `?v=5.8` on the patched form pages.

## How to upload

Unzip this patch and upload the contents into the root of your GitHub repository.
Overwrite existing files when GitHub asks.

The patch contains only the affected files, not the whole website.

## Required email setup

1. In Cloudflare Email Routing, create:
   `info@techrecycle.co.za -> your Gmail address`
2. Make sure your Gmail destination is verified in Cloudflare.
3. Send a normal test email to `info@techrecycle.co.za` and confirm it arrives in Gmail.
4. Open `https://techrecycle.co.za/contact/` and submit the form once.
5. FormSubmit will send a confirmation email to `info@techrecycle.co.za`.
6. Click the confirmation link in Gmail.

After that, the website forms should send enquiries to your Gmail through the chain:

Website form -> FormSubmit -> info@techrecycle.co.za -> Cloudflare Email Routing -> Gmail

## Important

GitHub Pages cannot run PHP, so there is no `send-contact.php` in this setup.
