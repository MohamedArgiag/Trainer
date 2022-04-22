import NavBar from "./navbar/Navbar"
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import moment from "moment";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";

export default function Friend(){
    const [postLists, setPostList] = useState([]);
    const posts = db
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");

    const disPosts = async () => {
        let days = [];
        let today = moment();
        const results = [];
        for (var i = 0; i < 6; i++){
            let day = today;
            
            const res2 = await posts.where("date", "==", day.format("DD/MM/yyyy")).get();
            const exercise = res2.docs.map(doc => doc.data())[0];
            days.push(day.format('dddd'));
            if (exercise === undefined){
                results.push(0)
            }else{
                results.push(exercise.leftArm)
            }
            day = today.subtract(1, 'days');
        }
        setPostList(results);
        days.reverse();
        results.reverse();
        console.log(results);
        console.log(days);
      };

    useEffect(() => {
        disPosts();
    }, []);


    return(
        <>
        <NavBar/>

        <h1>Chart</h1>

        <div>
            <Line
                data={{
                    labels: [],
                    datasets: [{
                        label: 'Number of Reps',
                        data: [12, 19, 3, 5, 2, 26, 0],
                        backgroudColor: 'purple',
                        borderColor: 'purple'
                        
                    }]
                }}
                height={300}
                width={600}
                options={{
                    maintainAspectRatio: false,
                }}

            
            />

        </div>
        
        
        </>


    );

}