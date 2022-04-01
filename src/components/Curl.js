import { React } from 'react'
import Sketch from 'react-p5'
import * as ml5 from 'ml5'
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Curl() {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let leftStage;
  let rightStage;
  let leftCounter=0;
  let rightCounter=0;

  const postsCollectionRef = db.collection("users").doc(auth.currentUser.uid).collection("posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await postsCollectionRef.add ({
      exercise: "Curl",
      leftArm: leftCounter,
      RightArm: rightCounter,
      like: 0,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      time: Date(),
    });
    navigate("/log");
  };
 

  const setup = (p5, canvasParentRef) => {
    var canvas = p5.createCanvas(640, 480);
    canvas.position(130, 210);
    video = p5.createCapture(p5.VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  
  }

  
  const draw = p5 => {
    p5.push();
    p5.translate(video.width, 0);
    p5.scale(-1, 1);
    p5.image(video, 0, 0, video.width, video.height);

    if (pose) {
      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        p5.strokeWeight(2);
        p5.stroke(0);

        p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        p5.fill(0);
        p5.stroke(255);
        p5.ellipse(x, y, 16, 16);
      }
    }
    p5.pop();

   
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textSize(25);
    p5.text("Left arm: ", 50, 30);
    p5.text(leftCounter, 180, 30);


    p5.text("right arm: ", 50, 70);
    p5.text(rightCounter, 180, 70);
  
  }

  const calculate_angle = (a,b,c) =>{

    let radians = Math.atan2(c[1]-b[1], c[0]-b[0]) - Math.atan2(a[1]-b[1], a[0]-b[0])
    let angle = Math.abs(radians*180.0/Math.PI)

    if (angle > 180.0){
      angle = 360-angle;
    }
    return angle
  }



  const gotPoses = (poses) => {
    let leftShoulder, leftElbow, leftWrist = []
    let rightShoulder, rightElbow, rightWrist = []
    

    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;


      leftShoulder = [pose.leftShoulder.x , pose.leftShoulder.y]
      leftElbow = [pose.leftElbow.x , pose.leftElbow.y]
      leftWrist = [pose.leftWrist.x , pose.leftWrist.y]

      let LeftAngle = calculate_angle(leftShoulder, leftElbow, leftWrist)
      
      if (LeftAngle > 160){
        leftStage = "down"
      }  
      if (LeftAngle < 30 && leftStage === "down"){
        leftStage = "up"
        leftIncrease()
      }




      rightShoulder = [pose.rightShoulder.x , pose.rightShoulder.y]
      rightElbow = [pose.rightElbow.x , pose.rightElbow.y]
      rightWrist = [pose.rightWrist.x , pose.rightWrist.y]

      let rightAngle = calculate_angle(rightShoulder, rightElbow, rightWrist)
      
      if (rightAngle > 160){
        rightStage = "down"
      }  
      if (rightAngle < 30 && rightStage === "down"){
        rightStage = "up"
        rightIncrease()
      }
    }
  }

  const modelLoaded = () => {
    console.log('poseNet ready');
  }

  const leftIncrease = () => {
    leftCounter ++;
      console.log(leftCounter);
  };

  const rightIncrease = () => {
    rightCounter ++;
    console.log(rightCounter);
    
};

  return (
    <>
    <Sketch setup={setup} draw={draw} />


    <div class="container text-right">
        <button class="btn btn-primary btn-lg w-100 " onClick={createPost}> End Exercise</button>
        
    </div>
    
    </>
    
  ) 
}

export default Curl