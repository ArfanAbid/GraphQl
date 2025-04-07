
import { helloWord,
        newPost,
        getUsers,
        getUserById,
} from "@/controllers/graphql.js";



export const graphQLResolver = {
    Query: {
        hello: helloWord,
        users: getUsers,
        user:getUserById
    },
    User:{ //This is a nested resolver for User if you want to add any logic so if i access the User object under it company and then under name so i get the name in uppercase
        company:(parent:any)=>{
                // You receive the user object as `parent`.You can return any logic here
                return {
                    ...parent.company,
                    name: parent.company.name.toUpperCase(), // parent is actually the User so User.company
                };
        }
    },
    Mutation: {
        addPost:newPost,
    },
};




/*

Test Api on Apollo Client

query ExampleQuery($userId:ID!) {
  user(id: $userId) {
    email
    address {
      address
      city
      postalCode
    }
    company {
      name
      address {
        city
        postalCode
      }
    }
  }
  users {
    id
    email
    firstName
    lastName
  }

}

 */