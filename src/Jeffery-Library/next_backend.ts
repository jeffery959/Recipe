import nodemailer from "nodemailer";
const sendVerificationCode =  async (otp:string, Email:string) => {
    const options = {
      from: "challengenius827@gmail.com",
      to: Email,
      subject: "Verify Email",
      html: `<p>Your Confirmation code is :<b> ${otp}</b> It will expire in 30 minutes</p>`,
    };
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "challengenius827@gmail.com",
      pass: "Ghana@123",
      },
    });
  
  transporter.sendMail(options, function (err:any, info:any) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent:" + info.response);
    });
  };

  export {sendVerificationCode}