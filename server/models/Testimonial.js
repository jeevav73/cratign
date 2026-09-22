import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    quote: String,
    name: String,
    company: String,
    role: String,
  },
  { timestamps: true },
);

export const Testimonial =
  mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
