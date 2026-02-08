import { User } from '../models/User.model.js';

export const generateRandomUsernameFromEmail = async (email: string): Promise<string> => {
  const base = email
    .split('@')[0]
    ?.toLowerCase()
    .replace(/[^a-z0-9]/gi, '');

  while (true) {
    const random = Math.floor(1000 + Math.random() * 9000);
    const username = `${base}_${random}`;
    const exists = await User.findOne({ username });

    if (!exists) return username;
  }
};
