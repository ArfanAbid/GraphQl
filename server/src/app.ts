
import express from "express"
import helmet from "helmet"
import { connectGraphQL } from "@/graphql/graphql.js"
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors'
import { errorMiddleware } from "@/middlewares/error.js"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "@/lib/db.js"
import { startStandaloneServer } from '@apollo/server/standalone';

  dotenv.config({path: './.env',});
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 4000;
  
// const mongoURI = process.env.MONGO_URI! || 'mongodb://localhost:27017';
// connectDB(mongoURI);
    
  const app = express();
    


  const graphqlServer = connectGraphQL();
  // await graphqlServer.start(); // uing with Express





  // Without using Express we can use this instead. For API testing Apollo server
  const { url }=await startStandaloneServer(graphqlServer,{ 
    listen:{port:4000}
  });
  console.log(`🚀 Apollo Server running at ${url}`);


     /*                             
    const servre=new ApolloServer({
      typeDefs:` type Query {
        hello: String
      }`,
      resolvers: {
        Query: {
          hello: () => "Hello, World!",
        },
      },
    })
    startStandaloneServer(server,{
      listen:{
        port
      }
    })
    .then (({url})=>console.log(`🚀 Server ready at ${url}`));

    */
  


app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
    
app.use(express.json());// uing with Express
app.use(express.urlencoded({extended: true}));
app.use(cors({origin:' * ',credentials:true}));
app.use(morgan('dev'))


// app.use("/graphql", expressMiddleware(graphqlServer));    // uing with Express see endpoint /graphql 

/*

// Also we can use  Middleware for Authorization
const isAuth = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const user="admin";
  if(user!=="admin"){
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  next();
}
app.use("/graphql", isAuth, expressMiddleware(graphqlServer));   

*/

  app.get("/", (req, res) => {
    res.send("Server is working!");
  });

  // your routes here
  
  app.use(errorMiddleware);
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  