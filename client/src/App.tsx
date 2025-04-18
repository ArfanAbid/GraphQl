import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { addPost, GET_USERS } from "./graphql/query/query";
import { useState } from "react";
const App = () => {

// const {data}=useQuery(gql(`#graphql
//   query{
//     users{
//       email
//       address {
//         address
//         city
//         postalCode
//       }
//       company {
//         name
//         address {
//           city
//           postalCode
//         }
//       }
//     }
//   }
// `));


// const { loading,data,error}=useQuery(GET_USERS); // useQuery hook is like a useEffect
// console.log(data);

const [getUser,{loading,data,error}]=useLazyQuery(GET_USERS);


const [addUserPost,{data:postData}]= useMutation(addPost);


const [title,setTitle]=useState("");
const [body,setBody]=useState("");
const [views,setViews]=useState(0);


const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  addUserPost({variables:{title,body,views}})
}

console.log(postData);

if(error) return <h1>Something went wrong</h1>

return loading ? (
<h1>Loading...</h1> 
): (
  <div>
    <h1>Users</h1>
    <ul>
      <button onClick={()=>getUser()}>get users</button>

      {data?.users?.map((user:any)=><li key={user.id}>{user.email}</li>)}
    </ul>
    <div>
      <form action="" onSubmit={submitHandler}>
        <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />
        <input type="number" placeholder="views" value={views} onChange={(e)=>setViews(Number(e.target.value))} />

      <button type="submit" >Add Post</button>
      </form>
    </div>
  </div>
)


  return (
    <div>App</div>
  )
}

export default App