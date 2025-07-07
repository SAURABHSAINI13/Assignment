const EMAIL_API_URL = import.meta.env.VITE_EMAIL_API_URL;
const EMAIL_API_KEY = import.meta.env.VITE_EMAIL_API_KEY;

export const sendEmail = async (emailData) => {
  const response = await fetch(`${EMAIL_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${EMAIL_API_KEY}`,
    },
    body: JSON.stringify(emailData),
  });

  const data = await response.json();
  return data;
};
