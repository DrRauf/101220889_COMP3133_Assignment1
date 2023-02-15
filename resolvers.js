const { query } = require("express");
const Employee = require("./models/Employee");
const User = require("./models/User");

const resolvers = {
  Query: {
    loginUser: async (parent, args) => {
      return User.find({});
    },
    getEmployees: async (parent, args) => {
      return await Employee.find({});
    },
    getEmployeeByID: async (parent, args) => {
      return await Employee.findById(args.id);
    },
  },

  Mutation: {
    signUpUser: async (parent, args) => {
      console.log(args);
      let newUser = new User({
        username: args.username,
        email: args.email,
        password: args.password,
      });
      return await newUser.save();
    },
    addEmployee: async (parent, args) => {
      console.log(args);

      let newEmp = new Employee({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        gender: args.gender,
        salary: args.salary,
      });

      return await newEmp.save();
    },
    updateEmployee: async (parent, args) => {
      console.log(args);
      if (!args.id) {
        return;
      }

      const employee = await Employee.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          $set: {
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            gender: args.gender,
            salary: args.salary,
          },
        },
        { new: true },
        (err, employee) => {
          if (err) {
            console.log("Something went wrong when updating the employee");
          } else {
            return employee;
          }
        }
      );
      return employee
    },
    deleteEmployee: async (parent, args) => {
      console.log(args);
      if (!args.id) {
        return JSON.stringify({ status: false, message: "No ID found" });
      }
      return await Employee.findByIdAndDelete(args.id);
    },
  },
};

module.exports = resolvers;
