const mongoose = require('mongoose');
const dateOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

const BlogPostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: 'string',
    required: true
  },
  content: {
    type: 'string',
    required: true
  },
  image: {
    type: 'string',
    required: true
  },
  category: {
    type: 'string',
    default: 'others'
  },
  created_at: {
    type: 'string',
    default: new Date().toLocaleDateString('pl-PL', )
  }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
