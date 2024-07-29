import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallbookshelfs } from "Redux/Slices/ShelfSlice";

import img from '../Assets/bookshelfs.png';


export default function Shelfs() {


   const shelfstate = useSelector((state) => state.shelf); 
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [activeshelf , setactiveshelf] = useState(null);
   const [books , setbooks] = useState([]);

 async function loadshelfs(){
     if(shelfstate.shelflist.length == 0){
        const response = await dispatch(getallbookshelfs());
        if (response?.payload?.data?.data?.length > 0) {
            setbooks(response?.payload?.data?.data[0].books);
            setactiveshelf(response?.payload?.data?.data[0]._id);
         
        }
     else if (shelfstate.shelflist.length > 0) {
        setbooks(shelfstate.shelflist[0].books);
       setactiveshelf(shelfstate.shelflist[0]._id);
 }
     
     
 }
}


 function  changeactiveshelf(id){
    setactiveshelf(id);
    shelfstate.shelflist.forEach(shelf =>{
        if(shelf._id == id){
           
            setbooks(shelf.books);
        }
    });
 }




 useEffect(()=>{
      loadshelfs();
 },[]);
  

  return (
    <Layout>
            <div className='flex justify-start items-start gap-32'>
                <div className='flex flex-col justify-start items-start'>
                    {shelfstate.shelflist.length > 0 && shelfstate.shelflist.map((shelf) => {
                        return (
                            <div onClick={() => changeactiveshelf(shelf._id)} key={shelf._id} className='mt-3 mb-3  w-full'>
                                <button className={`${activeshelf == shelf._id ? 'bg-yellow-500' : 'bg-blue-600'} text-white py-1 text-2xl rounded-md px-2 w-full`}>{shelf.name}</button>
                            </div>
                        );
                    })}
                    <div>
                        {/* <input
                            className='p-4 bg-white rounded-sm mb-4 text-black'
                            placeholder='shelf name'
                            onChange={(e) => {
                                setShelfInput(e.target.value);
                            }}
                            value={shelfInput}
                        />
                        <button
                            onClick={async () => {
                                if (shelfInput.length == 0) return;
                                await dispatch(createShelf({ shelfName: shelfInput }));
                                await dispatch(getAllBookShelves());
                                setShelfInput('');
                            }}
                            className='block bg-amber-100 px-4 py-2 rounded-md'>
                            Create New Shelf
                        </button> */}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {books.length > 0 && (
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Rating</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {books.length > 0 && books.map(book => {
                                    return (
                                        <tr className='hover:bg-slate-700' key={book._id} onClick={() => {
                                            navigate("/book/description", { state: { ...book } });
                                        }}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={img} alt="Book Image" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-xl" >{book.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>5</td>
                                            <th>
                                                <button className="btn btn-ghost btn-xs text-l hover:bg-primary">details</button>
                                            </th>
                                        </tr>
                                    );
                                })}

                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th>Title</th>
                                    <th>Rating</th>
                                    <th></th>
                                </tr>
                            </tfoot>

                        </table>
                    )}

                </div>
            </div>
            
        </Layout>
    );
}