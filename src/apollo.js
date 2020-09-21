import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      BtnlikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          },
        });
      },
    },
  },
  fetchOptions: {
    mode: "cors",
  },
});

export default client;
