export interface Password {
  id?: number; // Optional since it might not exist when adding a new password
  category: string;
  app: string;
  userName: string;
  encryptedPassword: string;
}
