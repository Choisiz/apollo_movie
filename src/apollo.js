import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  fetchOptions: {
    mode: "cors",
  },
});

export default client;
