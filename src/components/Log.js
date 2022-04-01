import React, { useEffect, useState } from "react"
import NavBar from "./Navbar"
import { db, auth } from "../firebase";
import './Log.css';

export default function Log() {
  const [postLists, setPostList] = useState([]);
  const user = db.collection("users");

 

  useEffect(() => {
    const disPosts = async () => {
      const res = await user.where("email", "==", auth.currentUser.email).get();
      const friendList = res.docs.map(doc => doc.data())[0].friends;
      const feed = [];

      for(let i = 0; i < friendList.length; i++){
        const friendPosts = await db.collection("users").doc(friendList[i]).collection("posts").get();
        const friendExercise = friendPosts.docs.map(doc => doc.data());
        feed.push(...friendExercise);

      }
      setPostList(feed.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)));
    }
    disPosts();
},[user]);


  return (
    <>
      <NavBar/>
      {postLists.map((post) => {
        return (
          <div className="card">
            <h2>By {post.email}</h2>
            <h2>Exercise: {post.exercise}</h2>
            <strong>
              Reps: {post.leftarm || 0}
            </strong>
            <button>💗 {post.like || 0}</button>
            
        </div>
        )
      })}
    </>
  )
}