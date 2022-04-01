import NavBar from "./Navbar";
import './CreateChallenge.css';


export default function CreateChallenge() {


    return (
        <>
        <NavBar/>
        <div class="testbox">
        <form action="/">
            <h1>Exercise Challenge</h1>

            <h4>Challenge Name<span>*</span></h4>
            <input type="text" name="name" />

            <h4>Type of Exercise<span>*</span></h4>
            <select>
            <option value=""></option>
            <option value="pushups">Push Ups</option>
            <option value="squats">Squats</option>
            <option value="curls">Curls</option>
            </select>

            
            <h4>Start Date</h4>
            <input type="date" name="name" required/>
            <i class="fas fa-calendar-alt"></i>

            <h4>End Date</h4>
            <input type="date" name="name" required/>
            <i class="fas fa-calendar-alt"></i>
            
            <div class="btn-block">
            <button className="btn btn-primary btn-lg w-100 text-center mt-3" type="submit" href="/challenge">Create Challenge</button>
            </div>
        </form>
        </div>
        
    
        </>

        

    )



}