import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Suggestions from "../components/Suggestions";

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
    suggestions(id: $id) {
      id
      title_long
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #141414;
  width: 100%;
  color: white;
`;

const ColumnAndPoster = styled.div`
  height: 100vh;
  background-color: background-color: #141414;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top:50px;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 40%;
`;
const Poseter = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  width: 25%;
  height: 800px;
  margin-top: 50px;
  background-color: transparent;
`;

const SuggestionAndPoster = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
  background-color: #141414;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0px;
  width: 70%;
  position: relative;
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

const Recommend = styled.h4`
  text-decoration: underline;
  font-size: 30px;
  margin-top: 80px;
`;

const Hr = styled.hr`
  width: 80%;
  margin-top: 80px;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  console.log(data);
  return (
    <Container>
      <ColumnAndPoster>
        <Column>
          <Title>
            {loading ? "Loading..." : "제목: " + data.movie.title_long}
          </Title>
          {!loading && data.movie && (
            <>
              <SubTitle>
                평점: {data.movie.rating}점 런닝타임: {data.movie.runtime}분
              </SubTitle>
              <Description>
                상세정보 : {data.movie.description_intro}
              </Description>
            </>
          )}
        </Column>
        <Poseter
          bg={data && data.movie ? data.movie.medium_cover_image : ""}
        ></Poseter>
      </ColumnAndPoster>
      {data && data.suggestions && (
        <>
          <Hr></Hr>
          <Recommend>추천영화</Recommend>
          <SuggestionAndPoster>
            {data.suggestions.map((s) => (
              <Suggestions key={s.id} id={s.id} bg={s.medium_cover_image} />
            ))}
          </SuggestionAndPoster>
        </>
      )}
    </Container>
  );
};
