import Layout from "Layouts/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addbooktoshelfs } from "Redux/Slices/ShelfSlice";
import { getallbookshelfs } from "Redux/Slices/ShelfSlice";

import img from '../Assets/bookshelfs.png';

export default function BookDescription() {

    const {state} = useLocation();
    const shelfstate = useSelector((state) => state.shelf); 
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getallbookshelfs());
    },[]);

  return (
    <Layout>
        {
            state._id && (

                <div className="flex my-5 items-start justify-center gap-3">
                     <div className="basis-2/3">
                        <img
                         className="w-full"
                         src={img} alt="mobnie" />
                     </div>

                     <div className="flex flex-col items-center justify-center gap-5">
                           <div className="text-orange-300 text-4xl">
                              {state.title}
                           </div>

                           <div className="flex justify-center gap-5 text-yellow-400 text-2xl">

                              Author - {state.author.name}
                           </div>

                           <div className="text-white text-xl w-3/4">
                              {state.description}
                           </div>

                          <div className="tabs tabs-boxed flex justify-start items-center flex-wrap gap-3 ">
                                   {state.genres.map((genre) =>{
                                         return <div 
                                         key={genre._id} 
                                         className="tab tab-active px-2 py-1 text-xl">
                                          {genre.name}
                                          </div>;
                                   })}
                          </div>

                          <div className="text-xl">
                                Pages : 
                                <span className="text-yellow-400 m-2">
                                  {state.pages}
                                </span>
                          </div>

                          <div className="text-xl">
                                PublishDate : 
                                <span className="text-yellow-400 m-2">
                                  {state.publishDate}
                                </span>
                          </div>


                          {/* dropdown */}
                          <div>
                          <details className="dropdown">
                                  <summary className="btn m-1">Add to shelf</summary>
                                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    {shelfstate.shelflist.length > 0 && shelfstate.shelflist.map((shelf)=>{
                                       return <li 
                                       onClick={ async () => 
                                        {
                                          await  dispatch(addbooktoshelfs({shelfName : shelf.name, bookId : state._id}));
                                           await dispatch(getallbookshelfs());
                                        }}
                                         className="text-white "
                                        key={shelf._id}>
                                        <a>{shelf.name}</a>
                                        </li>;     
                                    })}
                                    
                                   
                                  </ul>
                                        </details>

                          </div>


                     </div>
                </div>

            )
        }
    </Layout>
  );
}
