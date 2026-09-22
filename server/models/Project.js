import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: String,
    title: String,
    category: String,
    year: String,
    client: String,
    services: [String],
    excerpt: String,
    description: String,
    challenge: String,
    approach: String,
    process: [{ title: String, body: String }],
    results: [{ label: String, value: String }],
    palette: [String],
    visual: String,
    featured: Boolean,
    size: String,
  },
  { timestamps: true },
);

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
