import mongoose from 'mongoose';

const XPostSchema = new mongoose.Schema({
  postedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('XPost', XPostSchema);
