const mongoose = require("mongoose");
//defining schema for expenseDetails
const expenseDetailsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    category: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { versionKey: false }
);
const userDetailsSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  emailid: {
    type: String,
  },
  password: {
    type: String,
  },
});
//creating a model-for accessing data from db-->parameter1-collectionName and parameter2-schema
//model name should always be in capital letter
//using this Expense you can access the database
const Expense = mongoose.model("ExpenseDetails", expenseDetailsSchema);
//creating model for userdetailsSchema
const UserDetail = mongoose.model("UserDetails", userDetailsSchema);
//exported you can import and use in any file
module.exports = { Expense, UserDetail };
