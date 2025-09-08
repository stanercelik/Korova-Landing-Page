// Hidden forms for Netlify Forms detection
// These forms are hidden but needed for Netlify to detect form structure at build time

export function HiddenNetlifyForms() {
  return (
    <div style={{ display: 'none' }}>
      {/* Waitlist Form */}
      <form name="waitlist" data-netlify="true">
        <input type="email" name="email" />
      </form>

      {/* Contact Form */}
      <form name="contact" data-netlify="true">
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message"></textarea>
      </form>
    </div>
  );
}