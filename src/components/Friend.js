import React, { useEffect, useState } from "react"
import NavBar from "./navbar/Navbar";
import { db, auth } from "../firebase";
import Modal from "./FriendModal";
import './Friend.css';

export default function Friend() {
  const [friendLists, setFriendList] = useState([]);
  const users = db.collection("users");
  const [modalOpen, setModalOpen] = useState(false);

  const disPosts = async () => {
    const res = await users.where("email", "==", auth.currentUser.email).get();
    const friendList = res.docs.map(doc => doc.data())[0].friends;
    const feed = [];

    for(let i = 0; i < friendList.length; i++){
      const friendinfo = await users.where("uid", "==", friendList[i]).get();   
      const friendName = friendinfo.docs.map(doc => doc.data())[0].email;
      console.log(friendName)
      feed.push(friendName);

    }
    setFriendList(feed);

  }

  useEffect(() => {
    disPosts();
},[]);

  return (
    <>
      <NavBar />

      <div className="modalButton">
        <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          ADD FRIEND
        </button>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}

      </div>
      


      <h1 className="w-100 text-center mb-5">Friends List </h1>

      {friendLists.map((friend) => {
        return (
          <div className="friendName">
            <h2 className="friend">{friend}</h2>
          </div>
        )
      })}
    </>
  );
}