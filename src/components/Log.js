import React, { useEffect, useState } from "react"
import { db, auth } from "../firebase";
import './Log.css';

export default function Log() {
  const [postLists, setPostList] = useState([]);
  const user = db.collection("users");

  const disPosts = async () => {
    const res = await user.where("email", "==", auth.currentUser.email).get();
    const friendList = res.docs.map(doc => doc.data())[0].friends;
    console.log(friendList)
    const feed = [];

    for(let i = 0; i < friendList.length; i++){
      const friendPosts = await db.collection("users").doc(friendList[i]).collection("posts").get();
      console.log(friendPosts)
      //const friendExercise = friendPosts.docs.map(doc => doc.data());
      const friendExercise = friendPosts.docs.map((doc) => {
        return { doc: doc, docData: doc.data() };
      });
      feed.push(...friendExercise);

    }
    setPostList(feed.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)));
  }
 

  useEffect(() => {
    disPosts();
},[]);


  return (
    <>
      {postLists.map((post) => {
        console.log(post);
        return <Post post={post} />;
      })}
    </>
  )
}

export const Post = ({ post }) => {
  const [liked, setLiked] = useState(
    post.docData.likedList.includes(auth.currentUser.uid)
  );

  const updatedLikedList = () => {
    post.docData.likedList = liked
      ? post.docData.likedList.filter((p) => p !== auth.currentUser.uid)
      : [...post.docData.likedList, auth.currentUser.uid];
    return post.docData.likedList;
  };

  
  const likePost = (postRef, prevCount) => {
    postRef.update({
      like: liked ? prevCount - 1 : prevCount + 1,
      likedList: updatedLikedList(),
    });

    liked
      ? (post.docData.like = post.docData.like - 1)
      : (post.docData.like = post.docData.like + 1);

    setLiked(!liked);
  };

  return (
    <div className="workoutLogContainer">
      <div className="workoutLogFirst">
        <div className="workoutLogSecond">
          <h2>{post.docData.email}</h2>
          <h3 className={post.docData.exercise.toLowerCase()}>
            {post.docData.exercise}
          </h3>
          <h5>{post.docData.time}</h5>
        </div>
        <div className="workoutCount">{post.docData.leftArm || 0}</div>
      </div>
      <div className="likeContainer">
        <label className="likeButton" class="like">
          <input
            onChange={(val) => likePost(post.doc.ref, post.docData.like)}
            className="heartInput"
            type="checkbox"
            checked={liked}
          />
          <div class="hearth" />
        </label>
        <h3 class="p-0 m-0">{post.docData.like || 0}</h3>
      </div>
    </div>
  );
};