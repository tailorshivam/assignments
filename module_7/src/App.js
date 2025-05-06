import React, { Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Home from './Components/Pages/Home';

const FormPage = lazy(()=> import("./Components/Pages/FormPage"))
const About = lazy(()=> import("./Components/Pages/About"))

function App() {
  return (
    <Router>
      <NavBar/>
      <div className='container mt-4'>
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<FormPage />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
