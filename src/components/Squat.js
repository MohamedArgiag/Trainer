import { React } from 'react'
import Sketch from 'react-p5'
import * as ml5 from 'ml5'
import { Link } from "react-router-dom"

function Squat() {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  
  let Stage;
  let Counter=0;


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
    p5.text(Counter, 180, 30);

  
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
    let leftHip, leftKnee, leftAnkle = []
    let rightHip, rightKnee, rightAnkle = []
    

    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;


      leftHip = [pose.leftHip.x , pose.leftHip.y]
      leftKnee = [pose.leftKnee.x , pose.leftKnee.y]
      leftAnkle = [pose.leftAnkle.x , pose.leftAnkle.y]

      let LeftAngle = calculate_angle(leftHip, leftKnee, leftAnkle)


      rightHip = [pose.rightHip.x , pose.rightHip.y]
      rightKnee = [pose.rightKnee.x , pose.rightKnee.y]
      rightAnkle = [pose.rightAnkle.x , pose.rightAnkle.y]

      let rightAngle = calculate_angle(rightHip, rightKnee, rightAnkle)


      
      if (LeftAngle > 150 && rightAngle > 150){
        Stage = "standing";
        console.log(Stage)

      }  
      if (LeftAngle < 40 && rightAngle < 40 && Stage === "standing"){
        Stage = "down"
        Increase()
      }

    }
  }

  const modelLoaded = () => {
    console.log('poseNet ready');
  }

  const Increase = () => {
    Counter ++;
      console.log(Counter);
  };




  return (
    <>
    <Sketch setup={setup} draw={draw} />


    <div class="container text-right">
        <Link to="/" class="btn btn-primary btn-lg w-100 ">End Exercise</Link>
    </div>
    
    </>
    
  ) 
}

export default Squat