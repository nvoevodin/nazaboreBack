import express from "express";
import mongoose from "mongoose";
import {ApolloServer, gql} from "apollo-server-express";
import {resolvers} from "./resolver"
import {typeDefs} from "./typeDefs"
const bodyParser = require('body-parser');


const server = async () => {

    const app = express();

    app.use(bodyParser.json());


    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
          return res.sendStatus(200);
        }
        next();
      });



    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.applyMiddleware({app})

    await mongoose.connect("mongodb://stalin:Nv0ev0din!@cluster0-shard-00-00-ifpix.mongodb.net:27017,cluster0-shard-00-01-ifpix.mongodb.net:27017,cluster0-shard-00-02-ifpix.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser:true})

    app.get('/', (req,res)=> res.send('hello'))
    app.listen({port:4001}, ()=>{
        console.log('connected')
    })

}

server()