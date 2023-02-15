const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
    id: ID!
    username: String!
    email: String!
    password: String!
}


  type Employee {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    loginUser: [User]
    getEmployees: [Employee]
    getEmployeeByID(id: ID!): Employee
  }

  type Mutation {

    signUpUser(
        username: String!
        email: String!
        password: String!
    ): User

    addEmployee(
      firstname: String!
      lastname: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee

    updateEmployee(
      id: String!
      firstname: String!
      lastname: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee

    deleteEmployee(id: String!): Employee
  }
`;
module.exports = typeDefs;
