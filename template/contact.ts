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
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); overflow: hidden;">
          <tr>
            <td style="background-color: #0F2A4A; padding: 24px 32px; color: #ffffff;">
              <h1 style="margin: 0 0 4px; font-size: 20px; font-weight: 600;">New website enquiry</h1>
              <p style="margin: 0; font-size: 13px; color: #C9A961;">Laksh Capital — contact form</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 32px; color: #2a3441;">
              <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #6b7480;">Contact</h2>
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 6px 0; width: 140px; font-size: 13px; color: #6b7480;">Name</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 500; color: #0F2A4A;">{{name}}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7480;">Email</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0F2A4A;"><a href="mailto:{{email}}" style="color: #0F2A4A; text-decoration: none;">{{email}}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7480;">Phone</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0F2A4A;">{{phone}}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7480;">Prefers</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0F2A4A;">{{preferredContact}}</td>
                </tr>
              </table>

              <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #6b7480;">Qualifying</h2>
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 6px 0; width: 140px; font-size: 13px; color: #6b7480;">Interest area</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 500; color: #0F2A4A;">{{interest}}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7480;">Portfolio size</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 500; color: #0F2A4A;">{{portfolio}}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7480;">Primary goal</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0F2A4A;">{{goal}}</td>
                </tr>
              </table>

              <h2 style="margin: 0 0 12px; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #6b7480;">Message</h2>
              <div style="padding: 14px 16px; background-color: #faf7f2; border-left: 3px solid #C9A961; border-radius: 4px; font-size: 14px; line-height: 1.6; white-space: pre-line; color: #2a3441;">{{message}}</div>

              <p style="margin: 24px 0 0; font-size: 12px; color: #6b7480;">
                Submitted on {{date}} IST · Risk acknowledgement: accepted
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f0f0f5; padding: 16px 32px; text-align: center; font-size: 12px; color: #777;">
              Sent automatically from the Laksh Capital website contact form.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
