export const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
  </head>

  <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f6fb;
    font-family: Arial, Helvetica, sans-serif;
  ">

    <table width="100%" cellpadding="0" cellspacing="0"
      style="padding: 40px 15px;">

      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0"
            style="
              max-width: 500px;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
            ">

            <!-- Header -->
            <tr>
              <td align="center"
                style="
                  background-color: #4f46e5;
                  padding: 30px 20px;
                  color: #ffffff;
                ">

                <h1 style="
                  margin: 0;
                  font-size: 26px;
                  letter-spacing: 1px;
                ">
                  Welcome!
                </h1>

                <p style="
                  margin: 10px 0 0;
                  font-size: 14px;
                  color: #e0e7ff;
                ">
                  Verify your email address
                </p>

              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 35px 30px;">

                <h2 style="
                  color: #1f2937;
                  font-size: 21px;
                  margin-top: 0;
                ">
                  Email Verification Code
                </h2>

                <p style="
                  color: #6b7280;
                  font-size: 15px;
                  line-height: 1.7;
                ">
                  Thank you for creating an account!
                  To complete your registration, please
                  use the verification code below.
                </p>

                <!-- OTP -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center"
                      style="
                        background-color: #f3f4ff;
                        border: 1px dashed #4f46e5;
                        border-radius: 10px;
                        padding: 22px;
                      ">

                      <h1 style="
                        color: #4f46e5;
                        font-size: 36px;
                        letter-spacing: 10px;
                        margin: 0;
                      ">
                        ${otp}
                      </h1>

                    </td>
                  </tr>
                </table>

                <p style="
                  color: #6b7280;
                  font-size: 14px;
                  line-height: 1.6;
                  text-align: center;
                  margin-top: 20px;
                ">
                  This code will expire in
                  <strong style="color: #1f2937;">
                    5 minutes
                  </strong>.
                </p>

                <hr style="
                  border: none;
                  border-top: 1px solid #e5e7eb;
                  margin: 25px 0;
                ">

                <p style="
                  color: #9ca3af;
                  font-size: 13px;
                  line-height: 1.6;
                ">
                  If you didn't request this verification code,
                  please ignore this email. For your security,
                  never share this code with anyone.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center"
                style="
                  background-color: #f9fafb;
                  padding: 20px;
                  color: #9ca3af;
                  font-size: 12px;
                ">

                © 2026 srahaApp . All rights reserved.

              </td>
            </tr>

          </table>

        </td>
      </tr>

    </table>

  </body>
  </html>
  `;
};