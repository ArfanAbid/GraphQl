import fetch from "node-fetch";
    
    export const helloWord = () =>{
        return "Hello, World to GraphQL!";
    }
    
    // Fetch all users
    export const getUsers =async () => {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        return data.users;
    }

    // Fetch single user
    export const getUserById=async (_:unknown, { id }: { id: string }) => {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();
        return data;
    }





    type Post = {
        title: string;
        content: string;
    };
    export const newPost = (_:unknown, { title, content }:Post) => {
        return { title, content };
    }
    