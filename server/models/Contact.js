import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true, maxlength: 100, default: '' },
    message: { type: String, required: true, maxlength: 2000 },
  },
  { timestamps: true },
);

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
