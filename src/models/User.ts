/** @format */
import mongoose, { Schema } from "mongoose";

// Vendor Assesment
export interface User {
  _id?: string; // Optional for existing items
  name: string;
  description?: string;
  // Add other fields and their types
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

// export default mongoose.model<Item>("Item", itemSchema);
export const User =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
