import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    number: String,
    name: String,
    summary: String,
    description: String,
    tags: [String],
    visual: String,
  },
  { timestamps: true },
);

export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
