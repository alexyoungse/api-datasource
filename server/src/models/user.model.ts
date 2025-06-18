import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
}

export const User = model<IUser>('User', userSchema);
