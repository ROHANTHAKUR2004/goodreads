import Home from 'Pages/Home';
import Notfound from 'Pages/Notfound';
import { Route, Routes } from 'react-router-dom';

export default function MainRoutes() {
  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="*" element={<Notfound/>}/>

   </Routes>
  );
}
