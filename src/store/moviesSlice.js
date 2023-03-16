import { createSlice } from "@reduxjs/toolkit";
import { getMovies,deleteMovie, getSingleMovie,getLength,showAllMovies } from "./thunks/thunk";
export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    dlength:0,
    loading: false,
    allmovie:[],
    movielist: {
      list: [],
    },
  },
  reducers: {
    clearHome:(state)=>{
      state.dlength = 0
      state.movielist.list=[]
    },
    clearShowAll:(state)=>{
      state.allmovie = []
    },
    clearSingleItem:(state)=>{
      state.movielist.singlemovie = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movielist = action.payload;
      })
      .addCase(getSingleMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movielist.singlemovie = action.payload;
      })
      .addCase(getLength.fulfilled,(state,action)=>{
        state.dlength = action.payload
      })
      .addCase(showAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(showAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.allmovie = action.payload;
      })
    
  },
});
export const {clearHome,clearShowAll,clearSingleItem} = moviesSlice.actions
export default moviesSlice.reducer;
