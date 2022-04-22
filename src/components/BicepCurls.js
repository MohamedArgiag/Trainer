import React, { useRef, useEffect, useState } from "react";
import { Pose, POSE_CONNECTIONS, POSE_LANDMARKS_LEFT, POSE_LANDMARKS_RIGHT } from '@mediapipe/pose'
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import NavBar from "./navbar/Navbar";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// import './BicepCurl.css'

const Counter = ({rightAngle, leftAngle}) => {
  
  const [rightStage, setRightStage] = useState("down");
  const [leftStage, setLeftStage] = useState("down");

  const [rightCounter, setRightCounter] = useState(0);
  const [leftCounter, setLeftCounter] = useState(0);

  useEffect(() => {

    if (rightAngle > 160) {
      console.log(rightAngle)
      setRightStage("down")
    }  

    if (rightAngle < 40 && rightStage === "down") {
      setRightStage("up")
      setRightCounter(rightCounter+1)
      
    }

    if (leftAngle > 160){
      setLeftStage("down")

    }  
    if (leftAngle < 40 && leftStage === "down"){
      setLeftStage("up")
      setLeftCounter(leftCounter+1)

    }
  }, [rightAngle, leftAngle])
  
  const postsCollectionRef = db.collection("users").doc(auth.currentUser.uid).collection("posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await postsCollectionRef.add ({
      exercise: "Curl",
      leftArm: leftCounter,
      RightArm: rightCounter,
      like: 0,
      likedList: [], // TODO: add to others
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      time: Date(),
      date: moment().format("DD/MM/yyyy"),
    });
    navigate("/");
  };

  return (
    <>
     <div>Right Counter: {rightCounter}</div>
     <div>Right Stage: {rightStage}</div>
     <br />
     <div>Left  Counter: {leftCounter}</div>
      <div>Left Stage: {leftStage}</div>
      <button class="btn btn-primary btn-lg w-100 " onClick={createPost}> End Exercise</button>

    </>
  );
}

const BicepCurls = () => {
  
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const camera = useRef(null);



  const [rightAngle, setRightAngle] = useState(160);
  const [leftAngle, setLeftAngle] = useState(160);

  const calculateAngle = (a, b, c) => {
    // console.log(a, b, c)
    if(a === undefined) return 

    let radians = Math.atan2(c.y-b.y, c.x-b.x) - Math.atan2(a.y-b.y, a.x-b.x)
    let angle = Math.abs(radians*180.0/Math.PI)

    if (angle > 180.0){
      angle = 360-angle;
    }

    return angle
  }


  const calculatePoses = (poses) => {

    if (poses === undefined) return 

    let leftShoulder = poses[POSE_LANDMARKS_LEFT.LEFT_SHOULDER]
    let leftElbow = poses[POSE_LANDMARKS_LEFT.LEFT_ELBOW]
    let leftWrist = poses[POSE_LANDMARKS_LEFT.LEFT_WRIST]

    let rightShoulder = poses[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER]
    let rightElbow = poses[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW]
    let rightWrist = poses[POSE_LANDMARKS_RIGHT.RIGHT_WRIST]

    let leftAngle = calculateAngle(leftShoulder, leftElbow, leftWrist)
    let rightAngle = calculateAngle(rightShoulder, rightElbow, rightWrist)
 
    setLeftAngle(leftAngle);
    setRightAngle(rightAngle);

  }
  
  const onResults = (results) => {

    calculatePoses(results.poseLandmarks); 

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
  

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

      // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.globalCompositeOperation = 'source-over';
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                 {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
                {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
  }

  useEffect(() => {
    console.log("Rerendering Component")
    const pose = new Pose({locateFile:(file)=>{
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }});

    pose.setOptions({
      modelComplexity:1,
      smoothLandmarks:true,
      enableSegmentation:true,
      smoothSegmentation:true,
      minDetectionConfidence:0.5,
      minTrackingConfidence:0.5,
    })
    pose.onResults(onResults)

    if(webcamRef.current && webcamRef.current?.video){
      camera.current = new cam.Camera(webcamRef?.current?.video,{
        onFrame:async()=>{
          if(webcamRef.current?.video) await pose.send({image:webcamRef.current?.video})
        },
        width: 640,
        height: 480,
      })
      camera.current.start();
    }
  }, [])

 
  
  
  return (
    <>
    <NavBar/>
      <center>
        <Counter rightAngle={rightAngle} leftAngle={ leftAngle }/>
      <div className="App">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />{" "}
        <canvas
          ref={canvasRef}
          className="output_canvas"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        ></canvas>
       
      </div>
    </center>
    
    </>
  );
}

export default BicepCurls;