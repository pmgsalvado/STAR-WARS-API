import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    //uri: 'https://flyby-router-demo.herokuapp.com/',
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/graphql',
    cache: new InMemoryCache(),
})

export default client;