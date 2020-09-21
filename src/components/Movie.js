import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const Container = styled.div`
  height: 380px;
  width: 100%;
  overflow: hidden;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 95%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 15px;
`;

const LIKE_MOVIE = gql`
  mutation BtnlikeMovie($id: Int!, $isLiked: Boolean!) {
    BtnlikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

export default ({ id, bg, isLiked }) => {
  const [BtnlikeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg}></Poster>
      </Link>
      <button onClick={BtnlikeMovie}>{isLiked ? "Unlike" : "Like"}</button>
    </Container>
  );
};
