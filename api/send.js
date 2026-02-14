import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { target, subject, message, email, pass } = req.query;

    if (!target || !message || !email || !pass) {
        return res.status(400).json({ 
            status: 'failed', 
            error: 'Parameter incomplete' 
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: email, pass: pass }
        });

        await transporter.sendMail({
            from: email,
            to: 'support@support.whatsapp.com',
            subject: subject || "Banding Akun",
            text: message
        });

        return res.status(200).json({
            status: 'success',
            data: {
                target: target,
                sender: email,
                method: 'API VERCEL',
                limit: '∞'
            },
            msg: 'APPEAL SENT SUCCESSFULLY'
        });

    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            error: error.message 
        });
    }
}
