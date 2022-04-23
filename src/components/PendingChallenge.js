import React, { useEffect, useState } from "react"
import NavBar from "./navbar/Navbar";
import { db, auth } from "../firebase";
import "./Challenge.css"
import firebase from "firebase/app";
import toast, { Toaster } from "react-hot-toast";
import { faCheck, faCancel  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PendingChallenge() {
  const [challengeInvites, setChallengeInvites] = useState([]);
  const user = db.collection("users");
  const challenges = db.collection("challenges");
  const [currentUser, setCurrentUser] = useState()
  const [pendingChallenges, setPendingChallenges] = useState([])
  const [currentChallenges, setCurrentChallenges] = useState([])

  const updatePendingInvites = (challengeId) => {
    db.collection("users").doc(auth.currentUser.uid).update({
      pendingChallenges: pendingChallenges.filter((p) => p !== challengeId),
      currentChallenges:firebase.firestore.FieldValue.arrayUnion(challengeId)
    })

    setPendingChallenges(pendingChallenges.filter((p) => p !== challengeId))
    toast.success("SUCCESSFULLY ADDED CHALLENGE.");
  }

  const rejectPendingInvites = (challengeId) => {
    db.collection("users").doc(auth.currentUser.uid).update({
      pendingChallenges: pendingChallenges.filter((p) => p !== challengeId),
    })

    setPendingChallenges(pendingChallenges.filter((p) => p !== challengeId))
    toast.error("CHALLENGE REJECTED");
  }
  
  const getPendingChallenges = async () => {
    const currentUserTmp = await user.where("email", "==", auth.currentUser.email).get();
    setCurrentUser(currentUserTmp)
    const pendingChallengesTmp = currentUserTmp.docs.map(doc => doc.data())[0].pendingChallenges;
    const currentChallengesTmp = currentUserTmp.docs.map(doc => doc.data())[0].currentChallenges;

    setPendingChallenges((p) => pendingChallengesTmp);
    setCurrentChallenges((c) => currentChallengesTmp);


  }

  const getChallengeData = async () => {
    const feed = [];
    for(let i = 0; i < pendingChallenges.length; i++){
      const challenge = await challenges.where("challengeId", "==", pendingChallenges[i]).get();
      //const friendExercise = friendPosts.docs.map(doc => doc.data());
      const challengData = challenge.docs.map((doc) => {
        return { doc: doc, docData: doc.data() };
      });
      feed.push(...challengData);

    }
    setChallengeInvites(feed.sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate)));
  }
  
  useEffect(() => {
    getChallengeData();
  },[pendingChallenges])


  useEffect(() => {
    getPendingChallenges();
},[]);

    if (challengeInvites.length === 0) {
        console.log(challengeInvites.length)
        return (
            <>
            <NavBar />
            <h1 className="w-100 text-center mb-5 mt-5">No pending challenges</h1>
            </>
        );
        }
    


  return (
    <>
      <NavBar />
      <Toaster />
     
        
      {challengeInvites.map((challengeInvite, id) => {
        console.log(challengeInvite);
        return <ChallengeInvites key={challengeInvite.challengName} updatePendingInvites={updatePendingInvites} challengeInvite={challengeInvite} rejectPendingInvites={rejectPendingInvites}/> ;
      })}


    </>
  );
}

const ChallengeInvites = ({ rejectPendingInvites, updatePendingInvites, challengeInvite }) => {
  

  const updateChallenge = (challengeInviteRef,challengeInviteData) => {
    // Add friend to challengers list
    challengeInviteRef.update({
      challengeMembers:  firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
    })

    // Remove from pending invites
    updatePendingInvites(challengeInviteData.challengeId);

  }

  return (
    <div className="workoutLogContainer">
      <div className="workoutLogFirst">
        <div className="workoutLogSecond">
          <h2>{challengeInvite.docData.challengeName}</h2>
          <h3 className={challengeInvite.docData.exerciseType.toLowerCase()}>
            {challengeInvite.docData.exerciseType}
          </h3>
          <h3>Challenger: <strong>{challengeInvite.docData.challenger}</strong></h3>
        </div>
      </div>
      <div className="acceptContainer">
      <h3>Do you want to accept this challenge?</h3>
        <label>
          <button onClick={(val) => updateChallenge(challengeInvite.doc.ref, challengeInvite.docData)}
          className="acceptbutton"
          type="checkbox"
            >
            <FontAwesomeIcon  icon={ faCheck } color="green" size="3x"  ></FontAwesomeIcon>
          </button>
        </label>
        <label>
          <button onClick={(val) => rejectPendingInvites(challengeInvite.docData.challengeId)}
          className="rejectbutton"
          type="checkbox"
            >
            <FontAwesomeIcon  icon={ faCancel } color="red" size="3x"  ></FontAwesomeIcon>
          </button>
        </label>
      </div>
    </div>
  );
};
