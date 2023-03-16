import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../store/thunks/thunk";
import StarsRating from "stars-rating";
import { Dna } from "react-loader-spinner";
import { clearSingleItem } from "../store/moviesSlice";
const ShowSingle = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const singleitem = useSelector((state) => state.movies.movielist.singlemovie);
  const loading = useSelector((state) => state.movies.loading);
  useEffect(() => {
    dispatch(getSingleMovie(param.id))
      .unwrap()
      .then(() => {})
      .catch((err) => navigate("/404"));
  }, []);
useEffect(() => {
  return () => {
    dispatch(clearSingleItem())
  }
}, [])

  return (
    <Container>
      {loading ? (
        <div className="text-center">
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : null}
      {singleitem ? (
        <Row>
          <Col className=" text-center mt-4" md={5}>
            <img
              style={{ heigh: "50%", width: "70%" }}
              src={singleitem.image}
            />
          </Col>
          <Col className="text-center mt-4" md={7}>
            <h1>Title - {singleitem.title}</h1>
            <h4 className="mt-4">Director - {singleitem.director}</h4>
            <p className="mt-4">
              <b>About Movie -</b> {singleitem.description}
            </p>
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Rating -
              <StarsRating
                count={5}
                value={singleitem.Rating}
                size={24}
                color2={"#ffd700"}
                edit={false}
              />
            </div>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default ShowSingle;
