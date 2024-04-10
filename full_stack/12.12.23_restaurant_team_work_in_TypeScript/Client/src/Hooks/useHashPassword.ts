import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const useHashPassword = (password: string) => {
  const [hashedPassword, setHashedPassword] = useState<string | null>(null);

  useEffect(() => {
    const hashPassword = async () => {
      const hashedValue = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
      setHashedPassword(hashedValue);
    };

    hashPassword();
  }, [password]);

  return hashedPassword;
};

export default useHashPassword;
