<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import NavBar from "./navbar/Navbar";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import "./Dashboard.scss";

export default function Dashboard() {
  const [postLists, setPostList] = useState([]);
  const posts = db
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");

  const disPosts = async () => {
    const res2 = await posts.where("uid", "==", auth.currentUser.uid).get();
    const exercise = res2.docs.map((doc) => doc.data());
    setPostList(exercise);
  };

  useEffect(() => {
    disPosts();
  }, []);

  return (
    <>
      <NavBar />

      <div
        onClick={disPosts}
        className="btn btn-primary btn-lg w-100 text-center mt-3"
      >
        Refresh
      </div>

      {postLists.map((post) => {
        return (
          <div className="workoutLogContainer">
            <div className="workoutLogFirst">
              <div className="workoutLogSecond">
                <h2>{post.email}</h2>
                <h3 className={post.exercise.toLowerCase()}>{post.exercise}</h3>
                <h5>{post.time}</h5>
              </div>
              <div className="workoutCount">{post.leftArm || 0}</div>
            </div>
            <div className="likeContainer">
            <label className="likeButton" class="like">
              <input type="checkbox"/>
              <div class="hearth" />
              </label>
              <h3 class="p-0 m-0">{post.like || 0}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
}
=======
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
>>>>>>> 347e8eb9f612538c0fca1e6a11e27530125fe1fd
