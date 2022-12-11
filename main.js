song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreleftWrist = 0;
scorerightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet('video', modelLoaded);
    poseNet.on('poses', gotPoses);
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        scoreleftWrist = results[0].pose.keypoints[9].score;
}
}
function modelLoaded(){
    console.log("The Model has been loaded");
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    
    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "The Avengers song is playing.";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "The Harry Potter Theme song is playing.";
        }
    }
}
