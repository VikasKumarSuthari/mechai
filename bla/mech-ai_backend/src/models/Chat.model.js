import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [10000000, 'Message cannot exceed 1000 characters'],
  },
  sender: {
    type: String,
    enum: ['user', 'assistant', 'text'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['user', 'bot', 'system', 'assistant', 'text'],  
    default: 'text',
  },
});


const ChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [MessageSchema],
  title: {
    type: String,
    trim: true,
    default: 'New Chat'
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  pinned: {
    type: Boolean,
    default: false
  },
  started: {
    type: Boolean,
    default: false
  },
  metadata: {
    totalMessages: {
      type: Number,
      default: 0
    },
    lastMessageAt: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save hook to update metadata
ChatSchema.pre('save', function(next) {
  this.metadata.totalMessages = this.messages.length;
  this.metadata.lastMessageAt = this.messages.length > 0 
    ? this.messages[this.messages.length - 1].timestamp 
    : null;
  next();
});

export default mongoose.model('Chat', ChatSchema);