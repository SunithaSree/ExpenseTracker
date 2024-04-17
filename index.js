// Crud poerations
// adding a new expense-->/add-expense(post)
// view existing ones-->/get-expenses(get)
// edit expenses-->/update-expenses(put or patch)
// deleting expenses-->/delete-expense(delete)
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
//importing Expense from schema.js
const { Expense, UserDetail } = require("./schema.js");
const app = express();
app.use(bodyParser.json());
//to enable handling request from all the domains --> if you have to config the use{} inside cors({})
app.use(cors());
//when connected to db then app listens to that particular port
//specify the database name inbetween /?
async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sunithasekar2004:QCYcgEJwAoIT66PP@cluster0.u9rg76g.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connection established :)");
    //making port number generic by making server deceide your port
    //specifying 4001 to make it run in local machine
    const port = process.env.PORT || 4001;
    app.listen(port, function () {
      console.log(`listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("connection was not established :(");
  }
}
connectToDB();

app.get("/", function (request, response) {
  response.json("works");
});

app.post("/add-expense", async function (request, response) {
  try {
    await Expense.create({
      amount: request.body.amount,
      category: request.body.category,
      date: request.body.date,
    });
    response.status(201).json({
      status: "success",
      message: "entry successfully added",
    });
  } catch (error) {
    response.status(500).json({
      status: "failure",
      message: "entry not created",
      error: error,
    });
  }
});
app.get("/get-expenses", async function (request, response) {
  try {
    const expenseDetails = await Expense.find();
    response.status(200).json(expenseDetails);
  } catch (error) {
    response.status(500).json({
      status: "failure",
      message: "could not fetch data",
      error: error,
    });
  }
});
//while deleting or updating use id===> while giving request also pass the id to delete or update
app.delete("/delete-expense/:id", async function (request, response) {
  try {
    await Expense.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: "success",
      message: "deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      status: "failure",
      message: "deletion failed",
      error: error,
    });
  }
});
//updating data using params and sending data through the body of the request
app.patch("/update-expense/:id", async function (request, response) {
  try {
    await Expense.findByIdAndUpdate(request.params.id, {
      amount: request.body.amount,
      category: request.body.category,
      date: request.body.date,
    });
    response.status(200).json({
      status: "success",
      message: "entry updated",
    });
  } catch (error) {
    response.status(500).json({
      status: "failure",
      message: "couldn't update entry",
      error: error,
    });
  }
});
