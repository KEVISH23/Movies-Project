import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, showAllMovies } from "../store/thunks/thunk";
import { Link } from "react-router-dom";
import { ShowToast } from "./ShowToast";
import { clearShowAll } from "../store/moviesSlice";
import { RotatingSquare } from "react-loader-spinner";
const ShowAll = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.movies.loading);
  const allmovie = useSelector((state) => state.movies.allmovie);
  useEffect(() => {
    dispatch(showAllMovies());
  }, []);
  useEffect(() => {
    return () => {
      dispatch(clearShowAll());
    };
  }, []);

  const deleteAMovie = (id) => {
    dispatch(deleteMovie(id))
      .unwrap()
      .then((response) => {
        if (response.status === 200) {
          ShowToast("success", "😃 Deleted Succesfully");
          dispatch(showAllMovies());
        }
      });
  };
  return (
    <Container>
      <Row className="text-center">
        {loading ? (
          <RotatingSquare
            height="100"
            width="100"
            color="black"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : null}
        {allmovie
          ? allmovie.map((value, index) => {
              const { id, title, director, Rating, image, description } = value;
              return (
                <Col md={4} className="mt-4 mb-4" key={index}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img style={{height:"400px"}} variant="top" src={image} />
                    <Card.Body className="text-center">
                      <Card.Title>{title}</Card.Title>
                      <Button as={Link} to={`/showsingle/${id}`} variant="dark">
                        Read More
                      </Button>
                      <br />
                      <div className="mt-3 d-flex justify-content-around">
                        <Button
                          as={Link}
                          to={`/updatemovie/${id}`}
                          variant="primary"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => deleteAMovie(id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default ShowAll;
