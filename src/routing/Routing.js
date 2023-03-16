import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import AddMovies from '../components/AddMovies'
import Error404 from '../components/Error404'
import Home from '../components/Home'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import ShowAll from '../components/ShowAll'
import ShowSingle from '../components/ShowSingle'
import UpdateMovie from '../components/UpdateMovie'
const Routing = () => {
  return (
    <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/showall" element={<ShowAll/>}/>
            <Route path="/showsingle/:id" element={<ShowSingle/>}/>
            <Route path="/updatemovie/:id" element={<UpdateMovie/>}/>
            <Route path="/addmovies" element={<AddMovies/>}/>
            <Route path="*" element={<Error404/>}/>
            <Route path="/404" element={<Error404/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing