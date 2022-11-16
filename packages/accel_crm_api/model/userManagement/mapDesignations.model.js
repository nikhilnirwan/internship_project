const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const MapDesignations = new Schema(
  {
    name: String,
    role: [{
      type: mongoose.Types.ObjectId,
      ref: 'Roles'
    }],
    comboKey: String,
    status: {
      type: String,
      default: "active",
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("MapDesignations", MapDesignations);
