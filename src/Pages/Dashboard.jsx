
import Bookcard from "Components/bookcard/Bookcard";
import Layout from "Layouts/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallbooks } from "Redux/Slices/BookSlice";

export default function Dashboard() {

  const dispatch = useDispatch();

  const bookstate = useSelector((state) => state.book);

  async function loadbooks(){
     if(bookstate.booklist.length == 0){
      const response = await dispatch(getallbooks());
     console.log( response);
    }
  }

  useEffect(() =>{

    loadbooks();

  },[]);


  return (
    <Layout>
        
          {bookstate.booklist.length > 0 
          && bookstate.booklist.map(book =>{
            return (
             <Bookcard
                key={book._id}
                data = {book}
              />
            );
          })}
       
    </Layout>
  );
}
