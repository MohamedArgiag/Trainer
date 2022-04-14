import React, { useEffect, useState } from "react"
import NavBar from "./Navbar"
import { db, auth } from "../firebase";
import './Log.css';
import firebase from 'firebase/app'

export default function Log() {
  const [postLists, setPostList] = useState([]);
  const user = db.collection("users");

  const like = async (frienduid) => {
    console.log(frienduid)
    const friendPosts = db.collection("users").doc(frienduid).collection("posts").get();
    await friendPosts.update({
      like: firebase.database.ServerValue.increment(1)
  })
  }
 

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
},[]);


  return (
    <>
      <NavBar/>
      {postLists.map((post) => {
        return (
          <div className="card">
            <h2 key="{post.email}">By {post.email}</h2>
            <h2>Exercise: {post.exercise}</h2>
            <strong>
              Reps: {post.leftarm || 0}
            </strong>
            <button class="btn btn-light" onClick={like(post.uid)}>💗 {post.like || 0}</button>
            
        </div>
        )
      })}
    </>
  )
}