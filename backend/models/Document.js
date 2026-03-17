const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  url: String,
  accessRoles: [String]
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);
