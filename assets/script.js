let questions = [  

    {    
    question: "What does HTML stand for?",    
    choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "None of the above"],
    correct: 0
    },
    {
    question: "What is the correct HTML element for inserting a line break?",
    choices: ["<break>", "<br>", "<lb>", "<linebreak>"],
    correct: 1
    },
    {
    question: "Which HTML attribute is used to define inline styles?",
    choices: ["class", "style", "font", "id"],
    correct: 1
    },
    {
    question: "Which CSS property is used to change the background color of an element?",
    choices: ["bgcolor", "background-color", "color", "background"],
    correct: 1
    },
    {
    question: "Which HTML tag is used to link an external JavaScript file?",
    choices: ["<script>", "<js>", "<link>", "<href>"],
    correct: 0
    },
    {
    question: "What is the output of the following code: console.log(1 + +'2' + '2');",
    choices: ["122", "32", "14", "NaN"],
    correct: 1
    }
    ];
    
      
      let quizContainer = document.getElementById("container");
      let startButton = document.getElementById("start");
      let questionElement = document.getElementById("question");
      let choicesElement = document.getElementById("choices");
      let timerElement = document.getElementById("timer");
      let scoreForm = document.getElementById("score-form");
      let scoreElement = document.getElementById("score");
      let initialsElement = document.getElementById("initials");
      let submitButton = document.getElementById("submit");
      let result = document.getElementById("result");
      let hidden = document.getElementById("hide")
      
      
      let currentQuestion = -1;
      let score = 0;
      let timeLeft = 60;
      let intervalId;
      

      startButton.addEventListener("click", startQuiz);
      

      choicesElement.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
          checkAnswer(event.target.dataset.choice);
          showNextQuestion();
        }
      });
      
      function startQuiz() {
        startButton.style.display = "none";
        hidden.style.display="none";

        showNextQuestion();
        
        intervalId = setInterval(function() {
          timeLeft--;
          timerElement.textContent = "Time: " + timeLeft;
          if (timeLeft <= 0) {
            endQuiz();
          }
        }, 1000);
      }
      
      
      function showNextQuestion() {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
          endQuiz();
          return;
        }


        let question = questions[currentQuestion];


        questionElement.textContent = question.question;
        choicesElement.innerHTML = "";
        for (let i = 0; i < question.choices.length; i++) {
          
          
          let choice = question.choices[i];
          let button = document.createElement("button");
         
          button.textContent = choice;
          button.dataset.choice = i;


          
          if (i == question.correct) {
            button.classList.add("correct");
          }
          choicesElement.appendChild(button);
        }
      } 






      
      function checkAnswer(choice) {
        let question = questions[currentQuestion];
        
        if (choice == question.correct) {
          score+= 1;
          result.textContent = "Correct!";
          
        } else {
          timeLeft -= 7; 
          result.textContent = "Wrong!";
          
        }
      }
      
      function endQuiz() {
        clearInterval(intervalId);
      
        scoreElement.textContent = "Score: " + score;
        quizContainer.style.display = "none";
        scoreForm.style.display = "block";
        
      }

      submitButton.addEventListener("click", function(event) {
        localStorage.setItem("initials", initialsElement.value);
        localStorage.setItem("score", score.toString());
      });


     

      
