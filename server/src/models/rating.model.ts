import { Schema, model } from 'mongoose';

interface IRating {
  userId: string;
  storyId: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema = new Schema<IRating>({
  userId: { type: String, required: true },
  storyId: { type: Number, required: true },
  value: { type: Number, required: true, min: 1, max: 5 }
}, {timestamps: true});

export const Rating = model<IRating>('Rating', ratingSchema);
