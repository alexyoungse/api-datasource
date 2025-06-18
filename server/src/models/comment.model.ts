import { Schema, model } from 'mongoose';

interface IComment {
  userId: string;
  storyId: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  userId: { type: String, required: true },
  storyId: { type: Number, required: true },
  text: { type: String, required: true }
}, { timestamps: true });

export const Comment = model<IComment>('Comment', commentSchema);
