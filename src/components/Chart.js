import NavBar from "./navbar/Navbar"
import { Line, Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import moment from "moment";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { color } from "@mui/material/node_modules/@mui/system";

export default function Friend(){
    const [weekdays, setWeekDays] = useState([]);
    const [results, setResults] = useState([]);
    const posts = db
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");

    const weekChart = async () => {
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
        days.reverse();
        results.reverse();
        setWeekDays(days)
        setResults(results)
      };

    useEffect(() => {
        weekChart();
    }, []);


    return(
        <>
        <NavBar/>

        <h2 className="w-100 text-center mb-5 mt-5">Weekly Progress</h2>

        <div>
            <Line
                data={{
                    labels: weekdays,
                    datasets: [{
                        label: 'Number of Reps',
                        data: results,
                        backgroudColor: 'purple',
                        borderColor: 'purple',
                        
                        
                    }]
                }}
                height={300}
                width={600}
                options={{
                    maintainAspectRatio: false,
                }}

            
            />

        </div>


        <h2 className="w-100 text-center mb-5 mt-5">Today's Progress</h2>

        <div>
            <Bar
                data={{
                    labels: [ 'Friday'],
                    datasets: [{
                        label: 'Number of Reps',
                        data: [10],
                        backgroudColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        color:'red'
                        
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