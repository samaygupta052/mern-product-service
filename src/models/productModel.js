const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  userId: { type: String, required: true } // Reference to user-service
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
