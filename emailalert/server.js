const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter using Gmail SMTP
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dassanchali219@gmail.com",  // Your Gmail address
        pass: "eehxcejyxrtxqnrr"    // Your Gmail password or App-specific password (explained below)
    }
});

// API route to send email
app.post("/send-email", (req, res) => {
    const { to, subject, text } = req.body;

    let mailOptions = {
        from: "dassanchali219@gmail.com",   // Sender's email address
        to: to,                         // Recipient's email address
        subject: subject,               // Email subject
        text: text                      // Email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: "Email sent successfully!" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});