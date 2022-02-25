import React, { useEffect, useState } from "react"
import NavBar from "./Navbar"
import { db } from "../firebase";
import './Log.css'

export default function Log() {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = db.collection("posts");

    useEffect(() => {
        const getPosts = async () => {
            postsCollectionRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setPostList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                })
            })
        };
        getPosts();
    });



  return (
    <>
    <NavBar/>


     <div className="logPage">
      {postLists.map((posts) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {posts.exercise}</h1>
              </div>
            </div>
            <div className="postTextContainer"> {posts.leftArm} </div>
            <div className="postTextContainer"> {posts.RightArm} </div>
           
          </div>
        );
      })}
    </div>

    </>
    );
}