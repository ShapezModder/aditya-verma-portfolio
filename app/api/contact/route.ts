import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email configuration. EMAIL_USER:", !!process.env.EMAIL_USER, "EMAIL_PASS:", !!process.env.EMAIL_PASS);
      return NextResponse.json(
        { 
          error: "Email configuration is missing. Please create a .env.local file with EMAIL_USER and EMAIL_PASS. See the setup instructions for details." 
        },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: "adityaverma9777@gmail.com",
      subject: subject || `Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #06b6d4;">
              ${message.replace(/\n/g, "<br>")}
            </p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ""}

Message:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    
    // Provide more specific error messages
    let errorMessage = "Failed to send email. Please try again later.";
    
    if (error.code === "EAUTH") {
      errorMessage = "Authentication failed. Please check your email credentials.";
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      errorMessage = "Connection failed. Please check your internet connection and SMTP settings.";
    } else if (error.response) {
      errorMessage = `SMTP Error: ${error.response}`;
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

