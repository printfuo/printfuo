PRINTFUO WEBSITE
================

Files
- index.html: page structure and content
- style.css: responsive styling, logo palette, themes and animations
- script.js: loading animation, scroll reveals, mobile menu, FAQ accordion and WhatsApp links
- assets/printfuo-logo.png: cropped logo from your supplied reference

HOW TO RUN
1. Extract the ZIP file.
2. Open index.html in a browser, or upload the folder to Netlify/GitHub Pages.
3. To make WhatsApp ordering work, open script.js and replace the placeholder
   WHATSAPP_NUMBER value with the real business number in international format.
   Example: 2348012345678 (digits only, no + sign or spaces).

The site has no login or sign-up page, as requested.
The FAQs and service descriptions are based on the supplied PrintFUO website
redesign content document. Please review service offerings and update the
WhatsApp number before publishing.


HERO IMAGE GALLERY
------------------
The hero artwork is now a swipeable image gallery. On a phone, swipe left/right.
On desktop, use the arrow buttons or dots.

To add more images:
1. Copy image files into assets/gallery/ (JPG, PNG or WebP are suitable).
2. Open script.js and find the PRINTFUO_GALLERY array near the bottom.
3. Add a new item, using the same format:
   { src: 'assets/gallery/my-new-image.jpg',
     alt: 'Short description of the image',
     category: '04 / NEW WORK',
     title: 'A short caption.' }
4. Save and refresh. The arrows, dots and slide count update automatically.

Three sample artworks are included so the gallery works immediately. Replace them
with your own portfolio photos/designs whenever you're ready.
