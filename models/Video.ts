import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  youtubeId: string;
  type: 'video' | 'short';
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    youtubeId: { type: String, required: true },
    type: { type: String, enum: ['video', 'short'], default: 'video' },
    category: { type: String, default: 'Uncategorized' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent mongoose error for OverwriteModelError
const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;
