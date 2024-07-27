import { useDispatch, useSelector } from "react-redux";
import { Link,  } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";


export default function Navbar() {

  const authstate = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  function onlogout(){
    dispatch(logout()) ;
   
  }


  return (
    <div className="navbar bg-gray-800 px-20">
            <div className="flex-1">
                <Link to="/dashboard"
                  className="btn btn-success-content normal-case text-xl">BookShelf</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {authstate.isloggedin && <li><Link>Shelfs</Link></li> }
                    {authstate.isloggedin && <li><Link>{authstate.username}</Link></li> }
                     <li>
                      <details>
                        <summary>
                          Options
                        </summary>
                        <ul className="p-2 bg-base-100">
                          {authstate.isloggedin && <li><Link to='/signin' onClick={onlogout}>Logout</Link></li>}
                          {!authstate.isloggedin && <li><Link to='/signup'>Signup</Link></li>}
                          {!authstate.isloggedin && <li><Link to='/signin'>signIn</Link></li>}

</ul>
                      </details>
                     </li>

                </ul>
                   
                
                 
            </div>
        </div>
  );
}
