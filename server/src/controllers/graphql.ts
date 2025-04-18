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



export const addPost = async (_: unknown, { title, body, views }: { title: string, body: string, views:number }) => {
    const newPost = {
      id: Math.floor(Math.random() * 1000), // fake ID
      title,
      body,
      views: Number(views),
    };
  
    return newPost;
  };
  

    