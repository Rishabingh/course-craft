import { getResend } from './resend.js';

export const sendEmailResend = async (to: string, subject: string, html: string) => {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [to],
    subject,
    html,
  });

  if (error) {
    throw Error(`Resend failed: ${error.message}`);
  }

  return data;
};
