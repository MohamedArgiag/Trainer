import React, { useEffect, useState } from "react";
import NavBar from "./navbar/Navbar";
import "./CreateChallenge.css";
import { useNavigate } from "react-router-dom";
import { db, auth, getUserWithUsername } from "../firebase";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";


export default function CreateChallenge() {
  const { register, handleSubmit } = useForm();
  const [startDate, changeStartDate] = useState(new Date());
  const [endDate, changeEndDate] = useState(new Date());
  const [friends, setFriends] = useState([]);
  const [challengers, setChallengers] = useState([]);

  const createChallengeForUser = async (data) => {
    console.log(data);
    // Create Challenge
    console.log({
      challengeName: data.challengeName,
      exerciseType: data.exerciseType,
      startDate: startDate,
      endDate: endDate,
      challengeMembers: [auth.currentUser.uid],
    });

    const createdChallenge = await db.collection("challenges").add({
      challengeName: data.challengeName,
      exerciseType: data.exerciseType,
      startDate: startDate,
      endDate: endDate,
      challengeMembers: [auth.currentUser.uid],
    });

    console.log(createdChallenge);

    // Send to Invite to Challengers
    challengers.map(async (challenger) => {

      await db
        .collection("users")
        .doc(challenger.uid)
        .update({
          pendingChallenges: firebase.firestore.FieldValue.arrayUnion(createdChallenge.id),
        });
    });
  };

  return (
    <>
      <NavBar />
      <div class="testbox">
        <form
          className="formContainer"
          onSubmit={handleSubmit((data) => {
            createChallengeForUser(data);
          })}
        >
          <span>Challenge Name:</span>
          <input {...register("challengeName")} placeholder="" />
          <span>Challenge Description:</span>
          <input {...register("description")} placeholder="" />
          <span>Workout Type:</span>
          <select {...register("exerciseType")}>
            <option value="Curl">Curl</option>
            <option value="Squat">Squat</option>
            <option value="Pushup">Pushup</option>
          </select>
          <span>Start Date:</span>
          <DatePicker onChange={changeStartDate} value={startDate} />
          <span>End Date:</span>
          <DatePicker onChange={changeEndDate} value={endDate} />
          <FriendList
            friends={friends}
            setFriends={setFriends}
            challengers={challengers}
            setChallengers={setChallengers}
          />
          <div className="FormButton">
            <input className="createButton" type="submit" />
          </div>
          
        </form>
      </div>
    </>
  );
}

const FriendList = ({ friends, setFriends, challengers, setChallengers }) => {
  useEffect(() => {
    getFriendsList();
  }, []);

  const getFriendsList = async () => {
    console.log(auth.currentUser.uid);

    const user = db.collection("users");
    const res = await user.where("email", "==", auth.currentUser.email).get();
    const friendList = res.docs.map((doc) => doc.data())[0].friends;
    console.log(friendList);

    // Fetching Friends
    const tmp = [];
    friendList.map(async (friend) => {
      const friendData = await user.where("uid", "==", friend).get();
      const parsedData = friendData.docs.map((doc) => doc.data())[0];
      console.log(parsedData);
      tmp.push(parsedData);
      setFriends((f) => [...f, parsedData]);
    });
  };

  const addToChallenge = (newF) => {
    setFriends((fr) => fr.filter((f) => f.uid !== newF.uid));
    setChallengers((cl) => [...cl, newF]);
  };

  const removeFromChallenge = (newF) => {
    setChallengers((cl) => cl.filter((c) => c.uid !== newF.uid));
    setFriends((fr) => [...fr, newF]);
  };

  return (
    <>
      <div className="friendsList">
        <span>Friends List:</span>
        <h4>(Click to add)</h4>
        {friends.length > 0
          ? friends.map((f) => (
              <div onClick={() => addToChallenge(f)} key={f.uid}>
                {f.email}
              </div>
            ))
          : null}
      </div>

      <div className="challengersList">
        <span>Challengers:</span>
        <h4>(Click to Remove)</h4>
        {challengers.length > 0
          ? challengers.map((cl, ind) => (
              <div onClick={() => removeFromChallenge(cl)} key={ind}>
                {cl.email}
              </div>
            ))
          : null}
      </div>
    </>
  );
};
