import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://graphql.kontent.ai/d57c521d-34c6-0017-dffa-95a0093fde5b",
  cache: new InMemoryCache(),
})

export default client;