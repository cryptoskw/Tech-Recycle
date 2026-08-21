# TechRecycle V5.3 Logo, Blog & Contact Forms Update

Changes included:

- Added the official TechRecycle logo to `/assets/images/techrecycle-logo.png`.
- Replaced the text logo in the shared header and footer with the official logo.
- Added `/assets/icons/favicon.png` and `/assets/icons/apple-touch-icon.png` using the official logo.
- Updated all pages to use the new PNG favicon and cache busting `?v=5.3`.
- Added `/blog/index.html` as a dynamic blog/archive page.
- The blog page is populated automatically from `/assets/js/posts.js` through `main.js`.
- Added a footer link to Blog & Articles.
- Added `/send-contact.php` to send contact form enquiries to `info@techrecycle.co.za`.
- Rebuilt `/contact/` with a polished enquiry form.
- Added recycling enquiry forms on:
  - `/laptop-recycling-johannesburg/`
  - `/laptop-recycling/`
  - `/recycle-laptops-johannesburg/`
- Forms include fields for business name, quantity, service type, phone, email, and message.

Important hosting note:

The contact form requires PHP `mail()` to be enabled on the hosting account. If email does not arrive, check cPanel email deliverability, SPF/DKIM, spam folder, and whether the hosting provider allows PHP mail. A stronger future upgrade would be SMTP using PHPMailer, but this version keeps the website lightweight.
