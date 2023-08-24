const express = require('express');
const path = require('path');
// const { graphqlHTTP } = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');
const {loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema');

// this will look for .graphql file in the dir or any subdir
const typesArray = loadFilesSync('**/*', { extensions: ['graphql'] });
// **/-> any sub dir && *.resolver.js any file with extension resolver.js
const resolverArray =loadFilesSync(path.join(__dirname, '**/*.resolver.js'));

async function startApolloServer() {
    const app = express();
    
const schema = makeExecutableSchema({
    //typeDefs -> schema in graphql term
    typeDefs: typesArray,
    //contains object with all of our resolver funcs
    // resolvers: {
    //     Query: {
    //         // parents-> get data
    //         // args -> filter our data based on some conditions
    //         // context -> data shared across all of our different resolvers exp- auth data
    //         // info -> contain some informations about the current state of our operation
    //         products: (parent) => {
    //             // console.log('getting the products...');
    //             return Promise.resolve(parent.products) ;
    //          },
    //         orders: (parent) => {
    //             return parent.orders;

    //         }
    //     }
    // }
    resolvers: resolverArray,
})
// this schema contains basically a collection of types that we define for each of the object (for each of  type of the data) that our api supports
// we always start with this special query type -> this root query type (type Query {}) defines the entry point of every graphql query
// ! -> must have , others are optional
    
    
// const root = {
//     products: require('./products/products.model'),
//     orders: require('./orders/order.model')
// }
    
    const server = new ApolloServer({
        // schema: schema
        schema
    })

    // apollo server ready
    await server.start();
    // connect graphql middleware with our express server
    server.applyMiddleware({ app, path: '/graphql' });


    
app.listen(3000, () => {
    console.log(`Running GraphQl Server on port: 3000`);
})
}

startApolloServer();






// graphalHTTP is a function that takes some argus which configure how graphql responds 
// app.use('/graphql',graphqlHTTP({
//     // schema tell our server which type we support
//     schema: schema,
//     // to make our api useful ->  determines which values that will be used in the res to our query
//     // rootValue: root,
//     // graphql tool
//     graphiql: true

// }))
