<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import NavBar from "./navbar/Navbar";
import "./CreateChallenge.css";
import { useNavigate } from "react-router-dom";
import { db, auth, getUserWithUsername } from "../firebase";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";



export default function CreateChallenge() {
  const challengesCollection = db
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("challenges");
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [startDate, changeStartDate] = useState(new Date());
  const [endDate, changeEndDate] = useState(new Date());

  const createChal = async () => {
    const name = document.getElementById("challengeName").value;
    const type = document.getElementById("typeExer").value;
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    await challengesCollection.add({
      challengeName: name,
      TypeExercise: type,
      startDate: start,
      endDate: end,
      challengemembers: [auth.currentUser.uid],
    });
  };

  return (
    <>
      <NavBar />
      <div class="testbox">
        {/* <form action="/">
=======
import NavBar from "./Navbar";
import './CreateChallenge.css';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";


export default function CreateChallenge() {
    const challengesCollection = db.collection("users").doc(auth.currentUser.uid).collection("challenges");
    let navigate = useNavigate();
    

    const createChal = async () => {
        const name = document.getElementById("challengeName").value;
        const type = document.getElementById("typeExer").value;
        const start = document.getElementById("startDate").value;
        const end = document.getElementById("endDate").value;

        await challengesCollection.add ({
          challengeName: name,
          TypeExercise: type,
          startDate: start,
          endDate: end,
          challengemembers: [auth.currentUser.uid, ]
        });
      };

    return (
        <>
        <NavBar/>
        <div class="testbox">
        <form action="/">
>>>>>>> 347e8eb9f612538c0fca1e6a11e27530125fe1fd
            <h1>Exercise Challenge</h1>

            <h4>Challenge Name<span>*</span></h4>
            <input id="challengeName" type="text" name="name" />

            <h4>Type of Exercise<span>*</span></h4>
            <select id="typeExer">
            <option value=""> </option>
            <option value="pushups">Push Ups</option>
            <option value="squats">Squats</option>
            <option value="curls">Curls</option>
            </select>

            
            <h4>Start Date</h4>
            <input id="startDate" type="date" name="name" required/>
            <i class="fas fa-calendar-alt"></i>
<<<<<<< HEAD
            <DatePicker onChange={changeStartDate} value={startDate} />
            <h4>End Date</h4>
            <input id="endDate" type="date" name="name" required/>
            <i class="fas fa-calendar-alt"></i>
            <DatePicker onChange={changeEndDate} value={endDate} />
            <div class="btn-block">
            <button className="btn btn-primary btn-lg w-100 text-center mt-3" type="submit" onClick={createChal}>Create Challenge</button>
            </div>
        </form> */}

        <form className="formContainer" onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <span>
            Challenge Name: 
          </span>
          <input {...register("name")} placeholder="" />
          <span>
            Challenge Description: 
          </span>
          <input {...register("description")} placeholder="" />
          <span>
            Workout Type: 
          </span>
          <select {...register("workoutType")}>
            <option value="Curk">Curl</option>
            <option value="Squat">Squat</option>
            <option value="Pushup">Pushup</option>
          </select>
          <span>
            Start Date:
          </span>
          <DatePicker onChange={changeStartDate} value={startDate} />
          <span>
            End Date:
          </span>
          <DatePicker onChange={changeEndDate} value={endDate} />
          <FriendList/>
          <p>{data}</p>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}


const FriendList = () => {

  const [friends, setFriends] = useState([])

  useEffect(() => {
    getFriendsList();
  },[])

  const getFriendsList = async () => {
    console.log(auth.currentUser.uid)

    const user = db.collection("users");
    const res = await user.where("email", "==", auth.currentUser.email).get();
    const friendList = res.docs.map(doc => doc.data())[0].friends;
    console.log(friendList)


    // Fetching Friends
    friendList.map(async (friend) => {
      const friendData = await user.where("uid", "==", friend).get();
      const parsedData = friendData.docs.map(doc => doc.data())[0]
      console.log(friendData.docs.map(doc => doc.data())[0])

      setFriends([...friends, parsedData])
    })
     
     
    }
  

  
  return (
    <>
    <div>Challengers: </div>
      <button>Add Challengers</button>
      {
        friends.length>0 ? friends.map((f) => <div key={f.uid}>{f.email}</div>) : null
      }
    </>
  )
}

=======

            <h4>End Date</h4>
            <input id="endDate" type="date" name="name" required/>
            <i class="fas fa-calendar-alt"></i>
            
            <div class="btn-block">
            <button className="btn btn-primary btn-lg w-100 text-center mt-3" type="submit" onClick={createChal}>Create Challenge</button>
            </div>
        </form>
        </div>
        
    
        </>

        

    )



}
>>>>>>> 347e8eb9f612538c0fca1e6a11e27530125fe1fd
