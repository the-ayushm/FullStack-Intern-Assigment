import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    externalId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      default: 'jsonplaceholder',
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: 'text', body: 'text' });

export const Post = mongoose.model('Post', postSchema);
