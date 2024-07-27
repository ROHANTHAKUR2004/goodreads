import Signin from 'Pages/Auth/Signin';
import Signup from 'Pages/Auth/Signup';
import Dashboard from 'Pages/Dashboard';
import Home from 'Pages/Home';
import Notfound from 'Pages/Notfound';
import { Route, Routes } from 'react-router-dom';

export default function MainRoutes() {
  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="*" element={<Notfound/>}/>
    <Route  path='/signup' element={<Signup/>}/>
    <Route path='/signin'  element={<Signin/>}/>
    <Route path='/dashboard'  element={<Dashboard/>}/>
   </Routes>
  );
}
