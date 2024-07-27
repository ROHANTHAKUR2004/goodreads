import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "Redux/Slices/AuthSlice";


export default function Signin() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);


  const [signindetails, setsignindetails] = useState({
         email : '',
         password : '',
  });


  function handleformchange(e){
       const {name, value} = e.target;
       setsignindetails({
        ...signindetails,
        [name]: value
       });
  }

  function resetform(){
    setsignindetails({
      username : '',
      password : '',
  });
  }



  async function onFormSubmit(e){
      e.preventDefault();
      const response = await dispatch(signin(signindetails));
      if(response?.payload?.data){
         navigate("/dashboard");
      }
      resetform();
  }


  useEffect(()=>{
    if(state.isloggedin)
     navigate('/dashboard');
 },[]);

  return (
    <Layout>
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <div>
        <h1 className="text-white text-5xl">Login to ur account</h1>
      </div>
      <div className="mt-4">
        <p className="text-white">
            Donot have an account ? 
            <Link to="/signup" >
            <button className="btn btn-success rounded-md px-2 mx-5 hover:bg-green-400">
                SignUp
            </button>
            </Link>
        </p>
    
      </div>

      {/*  */}

      <div className="w-full">
            <form onSubmit={onFormSubmit}
            className="flex flex-col justify-center mx-auto w-3/4 items-center" autoComplete="off">
            
               {/* */}
               <div className="my-5 w-1/3 text-black">
                <input 
                autoComplete="off"
                   type="email"
                   placeholder="Email.."
                   className="px-8 py-3 w-full bg-white"
                   name="email"
                   onChange={handleformchange}
                   value={signindetails.email}
                />
               </div>


               {/*  */}

               <div className="my-5 w-1/3 text-black">
                <input 
                autoComplete="off"
                   type="password"
                   placeholder="Password.."
                   className="px-8 py-3 w-full bg-white"
                   name="password"
                   onChange={handleformchange}
                   value={signindetails.password}
                />
               </div>


               <div className="my-5 w-1/3 text-black">
               <button
               className="btn btn-success rounded-md w-full px-2 py-1 hover:bg-green-400"
                type="submit">
                   Submit
               </button>
               </div>

               
            </form>
      </div>






    </div>
    </Layout>
  );
}
