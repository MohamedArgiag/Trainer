import NavBar from "./navbar/Navbar";
import { db, auth } from "../firebase";
import React, { useEffect, useState } from "react";
export default function CurrentChallenge() {
    const challenges = db.collection("challenges");
    const [challengeLists, setChallengeList] = useState([]);

    const challengePosts = async () => {
        const response = await challenges.where("challengeMembers", "array-contains", auth.currentUser.uid).get();
        console.log(response);
        const exercise = response.docs.map((doc) => {
            console.log(doc);
            return { doc: doc, docData: doc.data() };
          });
        setChallengeList(exercise)
    }

    useEffect(() => {
        challengePosts();
      }, []);


    
    return(
        <>
        <NavBar/>

        {challengeLists.map((challenge) => {
        console.log(challenge.docData.challengeName);
        return(
            <>
                <div className="workoutLogContainer">
                <div className="workoutLogFirst">
                    <div className="workoutLogSecond">
                    <h2>{challenge.docData.challengeName}</h2>
                    <h3 className={challenge.docData.exerciseType.toLowerCase()}>
                        {challenge.docData.exerciseType}
                    </h3>
                    <h4>Challenger: {challenge.docData.challenger}</h4>
                    <h5>Start Date: {challenge.docData.startDate.toDate().toDateString()}</h5>
                    <h5>End Date: {challenge.docData.endDate.toDate().toDateString()}</h5>
                    </div>
                </div>
                </div>
            </>
        );
      })}
        </>
    );
}