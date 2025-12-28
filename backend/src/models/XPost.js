import mongoose from 'mongoose';

const XPostSchema = new mongoose.Schema({
  lastPostedAt: {
    type: Date,
    required: true
  }
});

export default mongoose.model('XPost', XPostSchema);
