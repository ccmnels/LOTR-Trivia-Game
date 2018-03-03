
var questions = [
  {
    question: 'In The Fellowship of the Ring, who asks Boromir to bring him The Ring?',
    answers: [
      { answer: 'A. Sauron', value: false },
      { answer: 'B. Aragorn', value: false },
      { answer: 'C. His father, Denethor', value: true },
      { answer: "D. Gandalf", value: false }
    ]
  },
  {
    question: 'In What Age of Middle Earth does the trilogy take place?',
    answers: [
      { answer: 'The Third Age', value: true },
      { answer: 'The Middle Age', value: false },
      { answer: 'The Dark Age', value: false },
      { answer: 'The Elven Age', value: false }
    ]
  },
  {
    question: 'By whose hand is Saruman slain?',
    answers: [
      { answer: 'Gandalf', value: false },
      { answer: 'Aragorn', value: false },
      { answer: 'Faramir', value: false },
      { answer: 'Grima Wormtongue', value: true }
    ]
  },
  {
    question: 'What kind of creature is Shelob?',
    answers: [
      { answer: 'A Wraith', value: false },
      { answer: 'A Dragon', value: false },
      { answer: 'An Ork', value: false },
      { answer: "A Spider", value: true }
    ]
  },
  {
    question: "Theoden rules which kingdom of Middle Earth?",
    answers: [
      { answer: 'Gondor', value: false },
      { answer: 'Rohan', value: true },
      { answer: 'Moria', value: false },
      { answer: 'Rhûn', value: false }
    ]
  },
  {
    question: 'What transpires at Amon Sûl, also known as Weathertop?',
    answers: [
      { answer: 'Boromir is killed by Uruk-hai', value: false },
      { answer: 'Shelob bites Frodo', value: false },
      { answer: 'Gandalf falls with the Balrog', value: false },
      { answer: 'Frodo is stabbed by a Morgul Blade', value: true }
    ]
  },
  {
    question: 'What species does Gandalf say Gollum/Smeagol was once like?',
    answers: [
      { answer: 'An elf', value: false },
      { answer: 'A man', value: false },
      { answer: 'A dwarf', value: false },
      { answer: 'A hobbit', value: true }
    ]
  }
];

// Global variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
  
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        //$('.first-answer').css('background-color', 'green');
        //$('.first-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});

function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}


function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showingAnswers);

  timerHolder();
}

function questionCounter() {
  if (counter < 6) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}


function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}


function finishGame() {
  var final = $('.main')
    .html("<p>Final Score<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}


function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  timerHolder();
}
