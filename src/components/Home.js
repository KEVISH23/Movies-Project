import React, { useEffect } from "react";
import { getMovies, getLength } from "../store/thunks/thunk";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearHome } from "../store/moviesSlice";
import { Dna, RevolvingDot } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movies.movielist.list);
  const page = useSelector((state) => state.movies.movielist.page);
  const length = useSelector((state) => state.movies.dlength);
  const loading = useSelector((state) => state.movies.loading);
  useEffect(() => {
    if (data.length <= 0) {
      dispatch(getLength());
      dispatch(getMovies({ page: 1, limit: 3 }));
    }
  }, []);
  useEffect(() => {
    return () => {
      dispatch(clearHome());
    };
  }, []);

  const LoadMore = () => {
    dispatch(getMovies({ page: page + 1, limit: 3 }));
  };
  return (
    <Container>
      <Row>
        {data.map((value, index) => {
          const { id, title, director, Rating, image, description } = value;
          return (
            <Col md={4} className="mt-4 mb-4" key={index}>
              <Card style={{ width: "18rem" }}>
                <Card.Img style={{height:"400px"}} variant="top" src={image} />
                <Card.Body className="text-center">
                  <Card.Title>{title}</Card.Title>
                  <Button as={Link} to={`/showsingle/${id}`} mvariant="dark">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
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
        <Button
          variant="dark"
          disabled={data.length === length ? true : false}
          hidden={data.length < length ? false : true}
          className="btn mt-4 mb-4 p-2"
          onClick={LoadMore}
        >
          Load More
        </Button>
      </Row>
    </Container>
  );
};

export default Home;
