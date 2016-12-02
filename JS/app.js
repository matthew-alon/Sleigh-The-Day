var main = $('#mainContainer');
var catcher = $('#catcher');
// var score = $('#score');
// var score2 = $('#score2');
var theTime = $('#timer');
var Min = 100;
var Max = 1075;
$('body').append(catcher);
catcher.html('<img src="./santa.png" class="santa">');
// $('.navbar').css($(window))

// generates random number between its min and max value
function genRandomNum(min, max) {
  return Math.round((Math.random() * (max-min)) + min);
}

// set timer on the following anonymous function...
setInterval(function() {
  // create a new div
  var $snowflake = $('<div>');
  // add a class to the new div
  $snowflake.addClass('snowflake');
  // add an img to the div
  $snowflake.html('<img src="./snowflake.png" class="snowflakeImg">');
  // give it a random left value
  $snowflake.css('left', '+=' + genRandomNum(100, 1500));
  // add it twice to the body
  $('body').prepend($snowflake);
  $('body').prepend($snowflake);
  // set timer on the following anonymous function...
  setInterval(function() {
    // if the divs top value is greater than the catchers top value,
    if($snowflake.offset().top > (catcher.position().top)) {
      // remove the div
      $snowflake.remove();
      // or else
    } else {
        // add a top value of 5 to the div
        $snowflake.css('top', '+=5');
      }
      // adds top value every 10 milliseconds???
    },10);
    //runs the whole function every second.
},1000);

function Clock() {
  var $newClock = $('<div>');
  $newClock.addClass('droppinClock');
  $newClock.css('left', '+=' + genRandomNum(400, 1200));
  $newClock.html('<img src="./clock.png" class="clock">');
  $('body').prepend($newClock);
  setInterval(function() {
    if ($newClock.offset().top > (catcher.position().top)) {
      if (collision(catcher, $newClock)) {
        game.time += 5;
      }
      $newClock.remove();
    } else {
      $newClock.css('top', '+=5');
    }
  },10);
}

function Coal() {
  var $newCoal = $('<div>');
  $newCoal.addClass('droppinCoal');
  $newCoal.css('left','+=' + genRandomNum(400, 1200));
  $newCoal.html('<img src="./coal.png" class="coal">');
  $('body').prepend($newCoal);
  setInterval(function() {
    if ($newCoal.offset().top > (catcher.position().top)) {
      if (collision(catcher, $newCoal)) {
        game.currentPlayer.score -= 3;
      }
    $newCoal.remove();
    } else {
    $newCoal.css('top', '+=5');
    }
    },10);
}

// creates divs that drop down
function Box() {
  // created a new div and stored it in var
  var $newDiv = $('<div>');
    // added class to the div
  $newDiv.addClass('droppinDiv');
  // gives the div a random left value between 575 and 1075
  $newDiv.css('left', '+=' + genRandomNum(400,1200));
  // sets the html of the div as a an img
  $newDiv.html('<img src="./present.png" class="present">');
  // adds div to the top of a random container
  $('body').prepend($newDiv);
  // puts a timer on the following anonymous function...
  setInterval(function() {
    // if the div's top value is greater than 725,
    if ($newDiv.offset().top > (catcher.position().top)) {
      // and if the collision function returns true,
      if(collision(catcher, $newDiv)){
        // adds +1 to score if $newDiv collides with catcher
        game.currentPlayer.score += 1;
      }
      // or else
      else {
        // minus 1 to score if they dont hit
        game.currentPlayer.score -= 1;
      }
      // sets score count
      game.currentPlayer.scoreboard.text(game.currentPlayer.score);
      // removes div when top value reaches 726+
      $newDiv.remove();
      }
    // and or else
      else {
      // increases divs top value by 5
      $newDiv.css('top', '+=5');
    }
    // runs it every 10 milliseconds???
  }, 10);
  return game.currentPlayer.score;
}

var $droppedDiv = $('.droppinDiv');
// var player1 = {name: "p1", score: 0,};
// var player2 = {name: "p2", score: 0};
var game = {
  player1: {
    name: "p1",
    score: 0,
    scoreboard: $('#score1'),
    timer: $('#timer1')
  },
  player2: {
    name: "p2",
    score: 0,
    scoreboard: $('#score2'),
    timer: $('#timer2')
  }
};
game.timeLimit = 15;
game.turnLimit = 2;
game.turns = 0;
game.time = game.timeLimit;
// game.players = [player1, player2];
game.currentPlayer = game.player1;
// switches the turns of the players.
game.switchPlayer = function() {
  // if current player is player 1,
  if (game.currentPlayer == game.player2) {
    // then change it to player 2,
    game.currentPlayer = game.player1;
    // or else,
  } else {
    // the current player is player 1.
    game.currentPlayer = game.player2;
  }
};

// when the start button is clicked, run the following anonymous function...
$('.start').on('click', function() {
  // removes the start button
  this.remove();
  // puts a timer on another anonymous function...
  scoreTimer = setInterval(function() {
    // if the Time is greater than 0,
    if (game.time > 0) {
      // decrease it by 1
      game.time = game.time - 1;
      // and change the text of the time to the current time.
      game.currentPlayer.timer.text(game.time);
    }
    // or else
    else {
      // end the Round
      alert("End Round!");
      $('.droppinDiv').remove();
      $('.clock').remove();
      catcher.css('left', '50%');
      // if the time is 0, run the switch player function
      game.switchPlayer();
      // put the time back to 30
      game.time = game.timeLimit;
      // increase the turn count by 1
      game.turns += 1;
      // and if number of turns is greater than or equal to the limit,
      if (game.turns >= game.turnLimit) {
        clearInterval(boxTimer);
        $('.droppinDiv').remove();
        clearInterval(scoreTimer);
        // alert that the game is over,
        alert("Game Over!");
        // and run the show winner function.
        showWinner();
      }
    }
    // decreases the Time every 1 second.
  },1000);

    setInterval(function() {
      new Coal();
    },5000);

    setInterval(function() {
      new Clock();
    },10000);
  // puts a timer on the following anonymous function...
  boxTimer = setInterval(function() {
    // runs the Box function
    new Box();
    // runs it every second.
  },1000);

});

// adds event listener for key presses.
$('body').on('keypress', function(evt) {
  // prevents default action of the event
  evt.preventDefault();
  // if the key that is pressed is a,
  if (evt.key == "a") {
    if (catcher.offset().left >= 400) {
      // move the catcher to the left by 150px
      catcher.animate({left: "-=150"});
    }
    // else if the key that is pressed is d,
  } else if (evt.key == "d") {
    if (catcher.offset().left <= 1200)
    // move the catcher to the right by 150px
    catcher.animate({left: "+=150"});
  }
});

// detects if the catcher and the div collide
function collision(catcher, $droppedDiv) {
  var x1 = catcher.offset().left;
  var y1 = catcher.offset().top;
  var h1 = catcher.outerHeight(true);
  var w1 = catcher.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $droppedDiv.offset().left;
  var y2 = $droppedDiv.offset().top;
  var h2 = $droppedDiv.outerHeight(true);
  var w2 = $droppedDiv.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  // returns a truthy or falsey value
  return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2);
}

// shows who the winner is
function showWinner() {
  // if player 1's score is greater than player 2's score,
  if (game.player1.score > game.player2.score) {
    // input text of "Player 1 wins" to the empty h1
    $('#winner').text("Player 1 wins!");
    // else if player 2's score is greater than player 1's score,
  } else if (game.player2.score > game.player1.score) {
    // input text of "Player 2 wins" to the empty h1
    $('#winner').text("Player 2 wins!");
    // or else,
  } else {
    // input text of "Tie" to the empty h1
    $('#winner').text("Tie!");
  }
}
