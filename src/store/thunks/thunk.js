import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { create } from "json-server";
const URL = "http://localhost:3001/movies"
export const getMovies = createAsyncThunk(
    "movies/getMovies",
    async({page=1,limit=3},{getState})=>{
        try{

            const prevState = getState().movies
            const res = await axios.get(`${URL}?_page=${page}&_limit=${limit}`)
            // console.log("in thunk")
            return{
                list:[...prevState.movielist.list, ...res.data],
                page:page
            }
        }catch(err){
            throw err
        }
    }
)

export const getSingleMovie = createAsyncThunk(
    "movies/getSingleMovie",
    async(id)=>{
        try{
            const res = await axios.get(`${URL}/${id}`)
            return res.data
        }
        catch(err){
            throw err
        }
    }
)

export const getLength = createAsyncThunk(
    "movies/getLength",
    async()=>{
        try{
            const res = await axios.get(`${URL}`)
            return res.data.length
        }
        catch(err){
            throw err
        }
    }
)
export const showAllMovies = createAsyncThunk(
    "movies/showAllMovies",
    async()=>{
        try{
            const res = await axios.get(`${URL}`)
            // console.log(res.data)
            return res.data
        }catch(err){
            throw err
        }
    }
)

export const deleteMovie = createAsyncThunk(
    "movies/deleteMovie",
    async(id)=>{
        try{
            const res = await axios.delete(`${URL}/${id}`)
            console.log(res.status)
            return {status:res.status}
        }catch(err){

        }
    }
)

export const addMovie = createAsyncThunk(
    "movies/addMovie",
    async(movie)=>{
        try{
            const res = await axios.get(`${URL}?title=${movie.title}`)
            if(!res.data.length){
                const response = await axios({
                    method:"POST",
                    url:URL,
                    data:movie
                })
                return {status:response.status}
            }
            else{
                return {status:res.status}
                // console.log("Already added")
            }
        }catch(err){
            throw err
        }
    }
)

export const updateMovie = createAsyncThunk(
    "movies/updateMovie",
    async(values)=>{
        try{
            const res = await axios.put(`${URL}/${values.id}`,
            values)
            console.log(res.status)
            return {status:res.status}
        }
        catch(err){
            throw err
        }
    }
)