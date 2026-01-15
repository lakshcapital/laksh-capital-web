export const contactTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Contact Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 40px 0;">
    <tr>
      <td>
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); overflow: hidden;">
          <tr>
            <td style="background-color: #3f51b5; padding: 24px 32px; color: #ffffff;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600;">📬 New Contact Form Submission</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; color: #333333;">
              <p style="margin: 0 0 16px;">
                <strong style="color: #3f51b5;">Name:</strong><br />
                <span>{{name}}</span>
              </p>
              <p style="margin: 0 0 16px;">
                <strong style="color: #3f51b5;">Email:</strong><br />
                <span>{{email}}</span>
              </p>
              <p style="margin: 0 0 16px;">
                <strong style="color: #3f51b5;">Subject:</strong><br />
                <span>{{subject}}</span>
              </p>
              <p style="margin: 0 0 16px;">
                <strong style="color: #3f51b5;">Message:</strong><br />
                <span style="white-space: pre-line;">{{message}}</span>
              </p>
              <p style="margin: 0 0 8px;">
                <strong style="color: #3f51b5;">Sent At:</strong><br />
                <span>{{date}}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f0f0f5; padding: 16px 32px; text-align: center; font-size: 12px; color: #777;">
              This message was automatically sent from your website’s contact form.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
