import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 350px;
  width: 70%;
  margin-left: 70px;
`;

const Pp = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg }) => (
  <Container>
    <Link to={`/${id}`}>
      <Pp bg={bg}></Pp>
    </Link>
  </Container>
);
