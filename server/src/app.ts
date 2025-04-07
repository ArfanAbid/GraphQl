
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
  const port = process.env.PORT || 3000;
  
// const mongoURI = process.env.MONGO_URI! || 'mongodb://localhost:27017';
// connectDB(mongoURI);
    
  const app = express();
    


  const graphqlServer = connectGraphQL();
  // await graphqlServer.start();

  const { url }=await startStandaloneServer(graphqlServer,{ // For API testing Apollo server
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
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/graphql", expressMiddleware(graphqlServer));
app.use(cors({origin:' * ',credentials:true}));
app.use(morgan('dev'))
    
  

  

  
  app.use(errorMiddleware);
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  