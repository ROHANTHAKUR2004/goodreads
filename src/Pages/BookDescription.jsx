import Layout from "Layouts/Layout";
import { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import img from '../Assets/bookshelfs.png';

export default function BookDescription() {

    const {state} = useLocation();

    useEffect(() =>{
         console.log(state);
    });

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



                     </div>
                </div>

            )
        }
    </Layout>
  );
}
