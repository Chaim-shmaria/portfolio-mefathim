import axios, { AxiosError } from 'axios';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

const useEmail = () => {
  const url = process.env.REACT_APP_URL || 'http://localhost:8888';

  
  const sendEmail = async (to: string, subject: string, body: string) => {
    const data: EmailData = {
      to,
      subject,
      body,
    };

    try {
      const response = await axios.post(`${url}/sendEmail`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { sendEmail };
};
   

export default useEmail;
