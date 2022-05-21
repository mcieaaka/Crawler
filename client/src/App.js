import React from 'react';
import Search from './Components/SearchTags/Search.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import BlogResults from './Components/BlogResults/Blog'
import Navbar from './Components/Navbar/Navbar'
import Saved from './Components/Saved/Saved'
import "./App.css"

const App = () => {
    return ( 
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={(
                        <Search />
                    )} />

                    <Route path="/view" element={(
                        <BlogResults/>
                    )}/>

                    <Route path="/saved" element={(
                        <Saved/>
                    )}
                    />
                </Routes>
            </BrowserRouter>
        </>
     );
}
 
export default App;