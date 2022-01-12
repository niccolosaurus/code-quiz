  // variables
  document.getElementById('start').addEventListener('click', function () {
    //timer needs to start
    var count = 60, timer = setInterval(function () {
        count--
        document.getElementById('timer').innerHTML = count
        if (count === 0) {
            clearInterval(timer)
            // stop the game
            // show the final-container
            // hide everything else 
            // show score?
        }
    }, 1000);
  document.getElementById('initial-container').style.display = 'none'
  document.getElementById('quiz-container').style.display = 'block'
  document.getElementById('button-container').style.display = 'block'
})
  // Functions for quiz
  function buildQuiz(){
    var output = [];

    // operation for each question
        for (var i = 0; i < myQuestions.length; i++) {
          var currentQuestion = myQuestions[i]
          var questionNumber = i

        // variable to store the list of possible answers
        var answers = [];

        // and for each available answer...
        for(var letter in currentQuestion.answers){
          // ...add a radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults() {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    var numCorrect = 0;

    // for each question...
     for (var i = 0; i < myQuestions.length; i++) {
          var currentQuestion = myQuestions[i]
          var questionNumber = i

      // find selected answer
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'darkgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'darkred';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
        question: 'Is this color red?',
        answers: {
            a: 'red',
            b: 'blue',
            c: 'yellow'
        },
        correctAnswer: 'a'
    },

    {
        question: 'Is this a cat?',
        answers: {
            a: 'dog',
            b: 'cat',
            c: 'bird'
        },
        correctAnswer: 'b'
    },

    {
        question: 'What is 1+1?',
        answers: {
            a: '0',
            b: '1',
            c: '2'
        },
        correctAnswer: 'c'
    },

    {
        question: 'Which direction is the sky?',
        answers: {
            a: 'up',
            b: 'down',
            c: 'where'
        },
        correctAnswer: 'a'
    },

]

  // starts quiz
  buildQuiz();

  // goes to previous or next question
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
