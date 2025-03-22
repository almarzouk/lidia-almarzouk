import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  link: { type: String },
  reserved: { type: Boolean, default: false },
  reservedBy: { type: String, default: null },
});

const Gift = mongoose.models.Gift || mongoose.model("Gift", GiftSchema);

export default Gift;
