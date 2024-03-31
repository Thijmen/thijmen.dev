import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    resultCaching: false,
  }),
})
