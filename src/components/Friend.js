import NavBar from "./navbar/Navbar";
import { db, auth } from "../firebase";
import firebase from "firebase/app";
import toast, { Toaster } from "react-hot-toast";
import './Friend.css';

export default function Friend() {
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
      <NavBar />
      <Toaster />
      <h1 className="w-100 text-center mb-8">Add Friend </h1>
      <div className="addFriendContainer">
        <span>
          <input id="userEmail" type="email" placeholder="Search.." />
        </span>
        <button
          className="btn btn-primary btn-lg w-50 text-center mt-3"
          onClick={addFriend}
        >
          Add
        </button>
      </div>
    </>
  );
}
