
export const graphQLSchema = `#graphql

type Query {
    hello: String
    users: [User]
    user(id: ID!): User
}

type Mutation {
    addPost(title: String!, content: String!): Post
}







type User { 
  id: ID!
  firstName: String
  lastName: String
  email: String
  address: Address
  company: Company
}
type Address {
  address: String
  city: String
  postalCode: String
  state: String
}
type Company {
    department: String
    name: String
    title: String
    address: Address
}





type Post {
    title: String
    content: String
}
`;




/*
Query ---->	For fetching data (like hello)
Mutation ---->	For modifying/creating data (like addPost)

rest are the custom types we define for our schema
*/