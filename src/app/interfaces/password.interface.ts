export interface Password {
  id?: string; // Optional since it might not exist when adding a new password
  category: string;
  app: string;
  userName: string;
  encryptedPassword: string;
  updatedAt: Date;
}
