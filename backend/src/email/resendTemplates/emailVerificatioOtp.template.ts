export const emailVerficationOtpEmailTemplate = (otp: string, expiresIn: string) => {
  return `
    <h1>Email Verfication Opt For coursecraft.rishabs.online</h1>
    <h2>${otp}</h2>
    <p>valid for: ${expiresIn}Min</p>
    <p>Do Not Reply Back at this Email for any queries mail at: jiophone1979@gmail.com</p>
    <p>if you have not requested for this otp then mail at: jiophone1979@gmail.com asap</p>
  `;
};
