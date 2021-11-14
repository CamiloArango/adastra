const questions = [
    {
        question: "Which is the planet nearest to the sun?",
        optionA: "Earth",
        optionB: "Mars",
        optionC: "Mercury",
        optionD: "Saturn",
        correctOption: "optionC"
    },

    {
        question: "Which is the planet farthest from the sun?",
        optionA: "Uranus",
        optionB: "Jupiter",
        optionC: "Mercury",
        optionD: "Neptune",
        correctOption: "optionD"
    },

    {
        question: "______ is the largest planet in our solar system.",
        optionA: "Saturn",
        optionB: "Uranus",
        optionC: "Mars",
        optionD: "Jupiter",
        correctOption: "optionD"
    },

    {
        question: "Neptune has ____ moons.",
        optionA: "12",
        optionB: "14",
        optionC: "27",
        optionD: "31",
        correctOption: "optionB"
    },

    {
        question: "Which is the smallest planet in our solar system?",
        optionA: "Mercury",
        optionB: "Uranus",
        optionC: "Saturn",
        optionD: "Mars",
        correctOption: "optionA"
    },

    {
        question: "Which of these is the coldest planet in our solar system?",
        optionA: "Uranus",
        optionB: "Neptune",
        optionC: "Saturn",
        optionD: "Jupiter",
        correctOption: "optionB"
    },

    {
        question: "The planet(s) with rings around is/are:",
        optionA: "Saturn",
        optionB: "Jupiter",
        optionC: "Uranus",
        optionD: "All of the mentioned",
        correctOption: "optionD"
    },

    {
        question: "______ is called the “Red Planet” in our solar system.",
        optionA: "Mercury",
        optionB: "Venus",
        optionC: "Earth",
        optionD: "Mars",
        correctOption: "optionD"
    },

    {
        question: "______ is the third planet from the sun.",
        optionA: "Mars",
        optionB: "Earth",
        optionC: "Jupiter",
        optionD: "Saturn",
        correctOption: "optionB"
    },

    {
        question: "A celestial body in space that orbits around a larger body is called a",
        optionA: "Star",
        optionB: "Constellation",
        optionC: "Natural Satellite",
        optionD: "Asteroid",
        correctOption: "optionC"
    },

    {
        question: "The moon is the Earth’s _______.",
        optionA: "Natural satellite",
        optionB: "Star",
        optionC: "Planet",
        optionD: "None of the above",
        correctOption: "optionA"
    },

    {
        question: "The planet with the highest number of moons is",
        optionA: "Saturn",
        optionB: "Jupiter",
        optionC: "Neptune",
        optionD: "Uranus",
        correctOption: "optionA"
    },


    {
        question: "The planet(s) with no moons is/are",
        optionA: "Venus and Mars",
        optionB: "Mars and Neptune",
        optionC: "Mercury and Mars",
        optionD: "Mercury and Venus",
        correctOption: "optionD"
    },

    {
        question: "The planet with two moons is",
        optionA: "Mercury",
        optionB: "Earth",
        optionC: "Venus",
        optionD: "Mars",
        correctOption: "optionD"
    }
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}