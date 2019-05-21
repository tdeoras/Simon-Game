$("h1").css("color","red");

userClickedPattern = [];

counter = 0;

buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];

level = 0;

start = false;

$(document).on("keydown",function(){

if (start == false){

nextSequence();
start = true;
$("h1").text("Level " + level);

}


});

$(".btn").on("click",function(){

userChosenColour = this.id;
userClickedPattern.push(userChosenColour);
console.log(userClickedPattern);
playSound(this.id);
animatePress(this.id);
checkAnswer(counter);
console.log(counter);

});



function nextSequence(){

   randomNumber = Math.floor(Math.random() * 3) + 1;

   randomChosenColour = buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);

   console.log(gamePattern);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);

   level = level + 1;

   $("h1").text("Level " + level);

}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel){

console.log(currentLevel);
console.log(gamePattern[gamePattern.length - 1]);
if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){

  counter = counter + 1;



console.log("true");
console.log(userClickedPattern);
console.log(gamePattern);
if(arraysEqual(userClickedPattern, gamePattern)){

  console.log("rtrue");
  setTimeout(nextSequence , 1000);
  userClickedPattern = [];
  counter = 0;

}

}else{

playSound("wrong");
$("body").addClass("game-over");

setTimeout(function(){

$("body").removeClass("game-over");

} , 200);

counter = 0;

$("h1").text("Game Over, Press Any Key to Restart");

startOver();

}

}


function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function startOver(){

level = 0;
gamePattern = [];
start = false;
userClickedPattern = [];

}
