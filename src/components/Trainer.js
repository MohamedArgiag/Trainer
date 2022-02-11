import React from 'react'
import Sketch from 'react-p5'
import * as ml5 from 'ml5'
import { Link } from "react-router-dom"

function Trainer() {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let stage;
  let counter=0;

  let brain;
  let poseLabel = "";
  let prevLabel = "";
  let pushCounter = 0;

  const setup = (p5, canvasParentRef) => {
    var canvas = p5.createCanvas(640, 480);
    canvas.position(130, 210);
    video = p5.createCapture(p5.VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  
    let options = {
      inputs: 34,
      outputs: 4,
      task: 'classification',
      debug: true
    }
    brain = ml5.neuralNetwork(options);
    const modelInfo = {
      model: 'model/model.json',
      metadata: 'model/model_meta.json',
      weights: 'model/model.weights.bin',
    };
    brain.load(modelInfo, brainLoaded);
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

    if(poseLabel === "U" && prevLabel ==="D"){
      pushCounter += 1;
      console.log("Push up")
    }

    prevLabel = poseLabel;

    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textSize(250);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(pushCounter, p5.width / 2, p5.height / 2);
  }

  const brainLoaded = () => {
    console.log('pose classification ready!');
    classifyPose();
  }

  const classifyPose = () => {
    if (pose) {
      let inputs = [];
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      brain.classify(inputs, gotResult);
    } else {
      setTimeout(classifyPose, 100);
    }
  }

  const gotResult = (error, results) => {
    if (results[0].confidence > 0.75) {
      poseLabel = results[0].label.toUpperCase();
    }
    classifyPose();
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
    let shoulder = []
    let elbow = [] 
    let wrist = []
    

    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;


      shoulder = [pose.leftShoulder.x , pose.leftShoulder.y]
      elbow = [pose.leftElbow.x , pose.leftElbow.y]
      wrist = [pose.leftWrist.x , pose.leftWrist.y]

      let angle = calculate_angle(shoulder, elbow, wrist)
      
      if (angle > 150){
        stage = "down"
      }  
      if (angle < 30 && stage === "down"){
        stage = "up"
        counter ++
        console.log(counter)
      }
     

    }
  }


 

  const modelLoaded = () => {
    console.log('poseNet ready');
  }




  
  return (
    <>
    <Sketch setup={setup} draw={draw} />
    
    <Link to="/" class="btn btn-primary btn-lg ml-auto">End Exercise</Link>
    
    </>
    
  ) 
}

export default Trainer