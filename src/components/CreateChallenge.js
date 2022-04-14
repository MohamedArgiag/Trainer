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