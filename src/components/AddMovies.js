import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Alert, Button, Container } from 'react-bootstrap'
import {addMovie} from "../store/thunks/thunk"
import { ShowToast } from './ShowToast'
const AddMovies = () => {
  const dispatch = useDispatch();
      const formik = useFormik({
        initialValues:{title:"",director:"",image:"",Rating:"",description:""},
        validationSchema:Yup.object({
          title:Yup.string()
          .required("Sorry!! Title is required")
          .uppercase(),
          director:Yup.string()
          .required("Sorry!! this field is required"),
          image:Yup.string()
          .required("Sorry!!  this field is required"),
          Rating:Yup.number()
          .required("Sorry!!  this field is required")
          .max(5,"number must be between 1 to 5")
          .min(1,"number must be between 1 to 5"),
          description:Yup.string()
          .required("Sorry!!  this field is required"),
        }).strict(),
        onSubmit:(values,{resetForm})=>{
          dispatch(addMovie(values))
          .unwrap()
          .then((response)=>{
            if(response.status === 201){
              ShowToast("success","😎 Added Sucessfully")
            }
            if(response.status === 200){
              ShowToast("error","🤷‍♀️ Already Added")
            }
          })
         resetForm()
        }
      })
  return (
    <>
       <Container className='text-center'>
        <h3>Add Movies..</h3>
        <form className='mt-3' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <label className='mt-2 mb-1'>Title : </label>
              <input type="text" 
                  name="title"
                  placeholder='Title'
                  className='form-control'
                  {...formik.getFieldProps('title')}
                />
                {formik.errors.title && formik.touched.title ? <Alert  variant="danger">
                  {formik.errors.title}
                </Alert> :null}
              <label className='mt-2 mb-2'>Director : </label>
              <input type="text" 
                  name="director"
                  placeholder='Director'
                  className='form-control'
                  {...formik.getFieldProps('director')}
                />
                 {formik.errors.director && formik.touched.director ? <Alert  variant="danger">
                  {formik.errors.director}
                </Alert> :null}
              <label className='mt-2 mb-2'>Image URL : </label>
              <input type="text" 
                  name="image"
                  placeholder='Image URL'
                  className='form-control'
                  {...formik.getFieldProps('image')}
                />
                 {formik.errors.image && formik.touched.image ? <Alert  variant="danger">
                  {formik.errors.image}
                </Alert> :null}
              <label className='mt-2 mb-2'>Rating : </label>
              <input type="number" 
                  name="Rating"
                  placeholder='Rating'
                  className='form-control'
                  {...formik.getFieldProps('Rating')}
                />
                  {formik.errors.Rating && formik.touched.Rating ? <Alert  variant="danger">
                  {formik.errors.Rating}
                </Alert> :null}
              <label className='mt-2 mb-2'>Description : </label>
              <textarea type="text" 
                  name="description"
                  placeholder='Description'
                  className='form-control'
                  {...formik.getFieldProps('description')}
                />
                 {formik.errors.description && formik.touched.description ? <Alert  variant="danger">
                  {formik.errors.description}
                </Alert> :null}
                <Button type="submit" className='mt-2 mb-2 p-3 btn btn-dark'>Submit</Button>
            </div>
        </form>
       </Container>
    </>
  )
}

export default AddMovies