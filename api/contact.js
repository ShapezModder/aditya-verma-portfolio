// Vercel Serverless Function for Contact Form
// Uses nodemailer to send emails
// Environment variable: EMAIL_PASS (Gmail App Password)

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'supercellatcoc@gmail.com',
            pass: process.env.EMAIL_PASS // Gmail App Password from environment variable
        }
    });

    // Email content
    const mailOptions = {
        from: 'supercellatcoc@gmail.com',
        to: 'adityaverma9777@gmail.com',
        subject: `New Contact Form Message from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0;">New Contact Form Submission</h1>
                </div>
                <div style="padding: 30px; background: #f9f9f9;">
                    <div style="margin-bottom: 20px;">
                        <p style="color: #666; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase;">Name</p>
                        <p style="color: #000; margin: 0; font-size: 16px; font-weight: 600;">${name}</p>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p style="color: #666; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase;">Email</p>
                        <p style="color: #000; margin: 0; font-size: 16px;">
                            <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
                        </p>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p style="color: #666; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase;">Message</p>
                        <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
                            <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                </div>
                <div style="background: #000; padding: 20px; text-align: center;">
                    <p style="color: #888; margin: 0; font-size: 12px;">
                        Sent from your portfolio contact form
                    </p>
                </div>
            </div>
        `,
        replyTo: email // So you can reply directly to the sender
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};
