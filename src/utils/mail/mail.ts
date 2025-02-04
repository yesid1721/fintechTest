import nodemailer from "nodemailer";
import config from "@app/config/index";

export const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: "fintechtest12@outlook.com",
        pass: "Fintechtest"
    }
});


