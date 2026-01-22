import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    dueDate: Date
  },
  { timestamps: true }
);

// Index for fast queries
taskSchema.index({ userId: 1, createdAt: -1 });
taskSchema.index({ userId: 1, status: 1 });

export const Task = mongoose.model('Task', taskSchema);