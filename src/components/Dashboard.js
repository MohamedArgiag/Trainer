import React, { useEffect, useState }  from "react";
import NavBar from "./Navbar";
import { Link } from "react-router-dom";
import { db, auth} from "../firebase";

export default function Dashboard() {
  const [postLists, setPostList] = useState([]);
  const posts = db.collection("users").doc(auth.currentUser.uid).collection("posts");

  useEffect(() => {
    const disPosts = async () => {
  
      const res2 = await posts.where("uid", "==", auth.currentUser.uid).get();
      const exercise = res2.docs.map(doc => doc.data());
      setPostList(exercise);
    }
    disPosts();
},[posts]);


  return (
    <>
    <NavBar/>

    <Link to="/option" className="btn btn-primary btn-lg w-100 text-center mt-3">Choose Exercise</Link>


    {postLists.map((post) => {
        return (
          <div className="card">
            <h2>By {post.email}</h2>
            <h2>Exercise: {post.exercise}</h2>
            <strong>
              Reps: {post.leftarm || 0}
            </strong>
            <button class="btn btn-light">💗 {post.like || 0}</button>
        </div>
        )
      })}
    </>
  )
}