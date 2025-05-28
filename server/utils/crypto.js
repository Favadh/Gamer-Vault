import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const algorithm = 'aes-256-cbc';
if (!process.env.CREDENTIAL_SECRET_KEY || !process.env.CREDENTIAL_SECRET_IV) {
    throw new Error('CREDENTIAL_SECRET_KEY or CREDENTIAL_SECRET_IV is not set in environment variables');
  }
  const key = Buffer.from(process.env.CREDENTIAL_SECRET_KEY, 'hex'); // 32 bytes (256 bits)
  const iv = Buffer.from(process.env.CREDENTIAL_SECRET_IV, 'hex');   // 16 bytes (128 bits)

export function encrypt(text) {
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Encryption failed');
  }
  
}

export function decrypt(encrypted) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed');
  }
  
}