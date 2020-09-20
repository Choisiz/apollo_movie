import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { TypeNameMetaFieldDef } from "graphql";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      title_long
      runtime
      language
      medium_cover_image
      description_intro
      rating
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-color: #141414;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;
const Poseter = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  width: 25%;
  height: 70%;
  background-color: transparent;
`;
const Title = styled.h1`
  font-size: 50px;
`;
const SubTitle = styled.h4`
  font-size: 30px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 24px;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  return (
    <Container>
      <Column>
        <Title>
          {loading ? "Loading..." : "제목: " + data.movie.title_long}
        </Title>
        {!loading && data.movie && (
          <>
            <SubTitle>
              평점: {data.movie.rating}점 런닝타임: {data.movie.runtime}분
            </SubTitle>
            <Description>상세정보 : {data.movie.description_intro}</Description>
          </>
        )}
      </Column>
      <Poseter
        bg={data && data.movie ? data.movie.medium_cover_image : ""}
      ></Poseter>
    </Container>
  );
};
