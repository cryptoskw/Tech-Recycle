# TechRecycle GitHub Pages Contact Form Patch

This patch updates only:

- `/contact/index.html`
- `/thank-you/index.html`

Upload these folders into the root of the GitHub Pages repository and overwrite the current files.

## Important email note

GitHub Pages is static hosting, so PHP email handlers such as `/send-contact.php` cannot work there.

The contact form in this patch uses FormSubmit:

```html
<form action="https://formsubmit.co/info@techrecycle.co.za" method="post">
```

For this to work, `info@techrecycle.co.za` must be able to receive email.

## Best setup for TechRecycle

Since the website is hosted on GitHub Pages, the cleanest setup is:

1. Keep the website on GitHub Pages.
2. Use Cloudflare DNS for the domain.
3. Enable Cloudflare Email Routing.
4. Create the custom address `info@techrecycle.co.za`.
5. Forward it to your real Gmail inbox.
6. Submit the website contact form once.
7. Confirm the FormSubmit activation email that arrives in the Gmail inbox.

After that, contact form submissions should be delivered to the Gmail inbox through `info@techrecycle.co.za`.

## Google Form alternative

A Google Form can also work, but it will look less professional unless it is carefully embedded and styled. The current FormSubmit setup keeps the contact page looking like part of the TechRecycle website.
