import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "Redux/Slices/AuthSlice";


export default function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [signupdetails, setsignupdetails] = useState({
    username : '',
    email : '',
    password : '',
});


function handleformchange(e){
  const {name, value} = e.target;
  setsignupdetails({
   ...signupdetails,
   [name]: value
  });
}

function resetform(){
  setsignupdetails({
    username : '',
    email : '',
    password : '',
});
}

 async function onFormSubmit(e){
 e.preventDefault();
 const response = await dispatch(signup(signupdetails));
 if(response?.payload?.data){
  navigate('/signin');
 }
 resetform();
}


  return (

    <div className="h-[100vh] flex flex-col items-center justify-center">
      <div>
        <h1 className="text-white text-5xl">Create a new account</h1>
      </div>
      <div className="mt-4">
        <p className="text-white">
            Already have an account ? 
            <Link to="/signin" >
            <button className="btn btn-success rounded-md px-2 mx-5 hover:bg-green-400">
               SignIn
            </button>
            </Link>
        </p>
    
      </div>

      {/*  */}

      <div className="w-full">
            <form
            onSubmit={onFormSubmit}
             className="flex flex-col justify-center mx-auto w-3/4 items-center" autoComplete="off">
               <div className="my-5 w-1/3 text-black">
                <input 
                autoComplete="off"
                   type="text"
                   placeholder="Username.."
                   className="px-8 py-3 w-full bg-white"
                   name="username"
                   onChange={handleformchange}
                   value={signupdetails.username}
                />
               </div>

               {/* */}
               <div className="my-5 w-1/3 text-black">
                <input 
                   autoComplete="off"
                   type="email"
                   placeholder="Email.."
                   className="px-8 py-3 w-full bg-white"
                   name="email"
                   onChange={handleformchange}
                   value={signupdetails.email}
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
                   value={signupdetails.password}
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
  );
}
