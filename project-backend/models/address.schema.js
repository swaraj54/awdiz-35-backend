import { model, Schema } from "mongoose";

const addressSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  addresses: [{ street: String, city: String, pincode: Number }],
});

const AddressSchema = model("address",addressSchema )

export default AddressSchema;