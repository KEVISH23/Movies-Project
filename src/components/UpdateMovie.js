import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Alert, Button, Container } from "react-bootstrap";
import { getSingleMovie, updateMovie } from "../store/thunks/thunk";
import { ShowToast } from "./ShowToast";
import { clearSingleItem } from "../store/moviesSlice";

const UpdateMovie = () => {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  // const singleData = useSelector((state)=>state.movies.movielist.singlemovie)
  const [data, setdata] = useState({});
  useEffect(() => {
    dispatch(getSingleMovie(param.id))
      .unwrap()
      .then((res) => {
        setdata(res);
        formik.setValues(res);
        //   formik.values=res.data
        // console.log(formik.values)
      })
      .catch((err) => navigate("/404"));
  }, []);
useEffect(() => {

  return () => {
    dispatch(clearSingleItem())
  }
}, [])

  // console.log(singleData)
  // console.log(data)
  // const handleChange = (e)=>{
  //   let name = e.target.name
  //   let value = e.target.value
  //   setdata({...data,title:value})
  // }

  const formik = useFormik({
    initialValues: {
      title: "",
      director: "",
      image: "",
      Rating: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Sorry!! Title is required").max(30,"30 characters only...").uppercase(),
      director: Yup.string().required("Sorry!! this field is required"),
      image: Yup.string().required("Sorry!!  this field is required"),
      Rating: Yup.number()
        .required("Sorry!!  this field is required")
        .max(5, "number must be between 1 to 5")
        .min(1, "number must be between 1 to 5"),
      description: Yup.string().max(500,"500 characters only...").required("Sorry!!  this field is required"),
    }).strict(),
    onSubmit: (values, { resetForm }) => {
      if (data === values) {
        ShowToast("error", "😢 Kindly change the field");
      } else {
        dispatch(updateMovie(values))
          .unwrap()
          .then((res) => {
            if (res.status === 200) {
              ShowToast("success", "😎 Updated successfully");
              navigate("/showall");
            }
            if (res.status === 404) {
              ShowToast("error", "😢 Something went wrong");
            }
          });
      }
      //  resetForm()
    },
  });

  //   const modifyData = ()=>{
  // setdata(singleData?singleData:{})

  //   }

  return (
    <>
      <Container className="text-center">
        {/* {modifyData} */}
        <h3>Update Movie..</h3>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label className="mt-2 mb-1">Title : </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-control"
              // value={data.title}
              // onChange={handleChange}
              {...formik.getFieldProps("title")}
            />
            {formik.errors.title && formik.touched.title ? (
              <Alert variant="danger">{formik.errors.title}</Alert>
            ) : null}
            <label className="mt-2 mb-2">Director : </label>
            <input
              type="text"
              name="director"
              placeholder="Director"
              className="form-control"
              {...formik.getFieldProps("director")}
            />
            {formik.errors.director && formik.touched.director ? (
              <Alert variant="danger">{formik.errors.director}</Alert>
            ) : null}
            <label className="mt-2 mb-2">Image URL : </label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="form-control"
              {...formik.getFieldProps("image")}
            />
            {formik.errors.image && formik.touched.image ? (
              <Alert variant="danger">{formik.errors.image}</Alert>
            ) : null}
            <label className="mt-2 mb-2">Rating : </label>
            <input
              type="number"
              name="Rating"
              placeholder="Rating"
              className="form-control"
              {...formik.getFieldProps("Rating")}
            />
            {formik.errors.Rating && formik.touched.Rating ? (
              <Alert variant="danger">{formik.errors.Rating}</Alert>
            ) : null}
            <label className="mt-2 mb-2">Description : </label>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              className="form-control"
              {...formik.getFieldProps("description")}
            />
            {formik.errors.description && formik.touched.description ? (
              <Alert variant="danger">{formik.errors.description}</Alert>
            ) : null}
            <Button type="submit" className="mt-2 mb-2 p-3 btn btn-dark">
              Update
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default UpdateMovie;
