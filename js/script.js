var images = [];
var qBox = [];
var color = "#FFFF00";
var level = 1;

//get random number for every new level
getRandomColor();

//get random number to indicate memory color
getRandomNumber()

//main function to initialize game
initiateGame(getRandomBoxNumber([9, 12, 15]));

//timer to start game after 5 sec
startTimerMemoryHide();

var guess = [];

// next button to go to next level
$(".nextgame").click(function () {
  if (qBox.length <= guess.length) {
    $('.nextgame').text('Go to Next Level');
    document.getElementById("msg").innerHTML = "";
    document.getElementById("level").innerText = "Level " + level;
    getRandomColor()
    getRandomNumber()
    initiateGame(getRandomBoxNumber([9, 12, 15]));
    startTimerMemoryHide();
    guess = []
    $(".box").on('click');
  }
});

//get random number for every new level
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
}

//get random number to indicate memory color
function getRandomNumber() {
  qBox = []
  for (var i = 0; i < 5; i++) {
    var randNumber = Math.floor(Math.random() * 9);
    if (qBox.includes(randNumber)) {
    } else {
      qBox.push(randNumber);
    }
  }
}

//retrun result of game after entering answer
function checkResult() {
  $(".box").off('click');
  let msg = "";
  // const array2Sorted = guess.slice().sort();
  // qBox.length === guess.length && qBox.slice().sort().every(function (value, index) {

  if (_.isEqual(qBox.sort(), guess.sort())) {
    msg = "You have won the game."
    document.getElementById("msg").style.color = "green";
    level++;
  } else {
    msg = "Oops you lost!"
    level = 1;
    document.getElementById("msg").style.color = "red";
    $('.nextgame').text('Restart Game');
  }

  // });
  document.getElementById("msg").innerText = msg;
}

//retun random number within given array
function getRandomBoxNumber(numbers) {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

//main function to initialize game
function initiateGame(boxCount) {

  // output images then hide them
  var output = "<ol>";
  for (var i = 0; i < boxCount; i++) {
    if (qBox.includes(i)) {
      output += "<li class='box' style='background: " + color + ";'>";
    } else {
      output += "<li class='box'>";
    }
    output += "</li>";
  }
  output += "</ol>";
  document.getElementById("container").innerHTML = output;

  $(".box").click(function () {
    if (qBox.length > 0) {
      var index = $(this).index();
      guess.push(index);
      $(this).css("backgroundColor", color);
      if (qBox.length <= guess.length) {
        checkResult();
      }
    }
  });
}

//remove memory color from boxes
function removeColorFromGame() {
  var x = document.querySelectorAll("li");
  for (let i = 0; i < x.length; i++) {
    // x[i].style.backgroundColor = "white";
    x[i].removeAttribute('style');
  }
}

//timer to start game after 5 sec
function startTimerMemoryHide() {
  // $(".box").off('click');
  $(".box").css("pointer-events", "none");
  const element = document.getElementById("hidesecond");
  const elementbox = document.getElementsByClassName("box");
  let timer = 5;
  var timerId = setInterval(function () {
    if (timer <= 0) {
      removeColorFromGame();
      clearInterval(timerId);
      element.innerText = "Hints will be hide in " + timer + " sec";
      $(".box").css("pointer-events", "inherit");

    } else {
      element.innerText = "Hints will be hide in " + timer + " sec"
    }
    timer--;

  }, 1000);
}