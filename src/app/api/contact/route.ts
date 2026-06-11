import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Create SMTP transporter using Hostinger email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    // Email to company (notification of new inquiry)
    await transporter.sendMail({
      from: `"Metal Packages Website" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: email,
      subject: `🔔 New Inquiry: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #c8a45a, #a88834); padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">New Website Inquiry</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Metal Packages Industries</p>
          </div>
          <div style="padding: 28px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee; width: 130px;">👤 Name</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">✉️ Email</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">📞 Phone</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">🏢 Company</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${company || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">📋 Subject</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #e5e5e5;">
              <p style="font-weight: bold; color: #555; margin: 0 0 8px;">💬 Message:</p>
              <p style="color: #333; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
              This inquiry was submitted via metalpackagesindustries.com contact form<br/>
              ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })}
            </p>
          </div>
        </div>
      `,
    });

    // Auto-reply to the customer
    await transporter.sendMail({
      from: `"Metal Packages Industries" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting Metal Packages Industries`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #c8a45a, #a88834); padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">Thank You, ${name}!</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Metal Packages Industries</p>
          </div>
          <div style="padding: 28px;">
            <p style="color: #333; line-height: 1.7; font-size: 15px;">
              We have received your inquiry regarding <strong>"${subject}"</strong>. 
              Our team will review your message and get back to you within <strong>24 hours</strong>.
            </p>
            <p style="color: #333; line-height: 1.7; font-size: 15px;">
              If you need immediate assistance, please feel free to call us at 
              <strong>+92-21-32815885</strong> (PTCL).
            </p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;"/>
            <p style="color: #777; font-size: 13px; line-height: 1.6;">
              Metal Packages Industries<br/>
              S.I.T.E. Area, Karachi, Pakistan<br/>
              ☎️ +92-21-32815885 | ✉️ contact@metalpackagesindustries.com<br/>
              🌐 <a href="https://metalpackagesindustries.com" style="color: #c8a45a;">metalpackagesindustries.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Metal Packages Industries. We will get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred while sending your message. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      company: "Metal Packages Industries",
      status: "Contact form is active",
      email: "contact@metalpackagesindustries.com",
    },
    { status: 200 }
  );
}
