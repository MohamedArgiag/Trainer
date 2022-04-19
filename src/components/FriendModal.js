import React from "react";
import "./FriendModal.css";
import firebase from "firebase/app";
import toast, { Toaster } from "react-hot-toast";
import { db, auth } from "../firebase";

function Modal({ setOpenModal }) {
    const users = db.collection("users");

    const addFriend = async () => {
        const email = document.getElementById("userEmail").value;
        const res = await users.where("email", "==", email).get();
        const usertoAdd = res.docs.map((doc) => doc.data())[0];
    
        if (!usertoAdd) {
          toast.error("USER DOES NOT EXIST!!!!");
          return;
        }
    
        if (auth.currentUser.uid === usertoAdd.uid) {
          toast.error("CANNOT ADD YOURSELF!!!!");
          return;
        }
    
        await users.doc(auth.currentUser.uid).update({
          friends: firebase.firestore.FieldValue.arrayUnion(usertoAdd.uid),
        });
    
        // alert("✅ ACCOUNT FOLLOWED SUCCESSFULLY.")
        toast.success("ACCOUNT FOLLOWED SUCCESSFULLY.");
      };



  return (
      
    <>
    <Toaster />
    <div className="modalBackground">
          <div className="modalContainer">
              <div className="titleCloseBtn">
                  <button
                      onClick={() => {
                          setOpenModal(false);
                      } }
                  >
                      X
                  </button>
              </div>
              <div className="title">
                  <h2>Add Friend?</h2>
              </div>
              <div className="body">
                  <span>
                      <input id="userEmail" type="email" placeholder="Search.." />
                  </span>
              </div>
              <div className="footer">
                  <button
                      onClick={() => {
                          setOpenModal(false);
                      } }
                      id="cancelBtn"
                  >
                      Cancel
                  </button>
                  <button onClick={addFriend}>add Friend</button>
              </div>
          </div>
      </div>
    </>
  );
}

export default Modal;