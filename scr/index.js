
import express from "express";
import mongoose from "mongoose";
import {ApolloServer, gql} from "apollo-server-express";
import {resolvers} from "./resolver"
import {typeDefs} from "./typeDefs"
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');

// Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/data-frontiers.info/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/data-frontiers.info/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/data-frontiers.info/chain.pem', 'utf8');

// const credentials = {
//         key: privateKey,
//         cert: certificate,
//         ca: ca
// };


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

    await mongoose.connect("mongodb+srv://stalin:Nv0ev0din!@cluster0-ifpix.mongodb.net/plagueDB?retryWrites=true&w=majority",{useNewUrlParser:true})


// Starting both http & https servers
const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);



    httpServer.listen(4001, () => {
        console.log('HTTP Server running on port 80');
});

// httpsServer.listen(4001, () => {
//         console.log('HTTPS Server running on port 443');
// });

}

server()

