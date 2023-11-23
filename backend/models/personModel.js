import mongoose from "mongoose";


const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: {
    type: [String],
  },
});

export const Person = mongoose.model( 'Person', personSchema);
