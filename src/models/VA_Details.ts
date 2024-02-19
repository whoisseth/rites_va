/** @format */
import mongoose, { Schema } from "mongoose";

// Vendor Assesment
interface VA_Detail {
  _id?: string; // Optional for existing items
  name: string;
  description?: string;
  // Add other fields and their types
}

const VA_Detail_Schema = new Schema<VA_Detail>({
  name: { type: String, required: true },
  description: { type: String }
});

// export default mongoose.model<Item>("Item", itemSchema);
export const VA_Detail =
  mongoose.models.VA_Detail ||
  mongoose.model<VA_Detail>("VA_Detail", VA_Detail_Schema);
