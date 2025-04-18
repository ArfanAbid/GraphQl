import { gql } from "@apollo/client"

export const GET_USERS = gql(`
query Query {
    users{
        email
    } 
}
`)

export const addPost = gql(`
mutation Mutation($title: String!, $body: String!, $views: Int!) {
  addPost(title: $title, body: $body, views: $views) {
    title
    body
    views
  }
}
`)
