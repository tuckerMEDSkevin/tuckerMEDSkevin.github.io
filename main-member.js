//Set of questions and answers -DONE
//Give each answer an identifier -DONE
//Each identifier will increment through each question
//St the end the identifier with the highest number is the winner 
//Display the answer and rest the quiz

//pass results frm previous question to the next page usig localcache

//Randomise the background of the quiz for each questiion

//Possible - Personality Traits
// 15 -21- You Need Help
// 10 - 15 - Good Soul
// 5- 10 - Meh 
// 5 - Are You Even Real


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');
const option6 = document.querySelector('.option6');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    const option5Total = questions[index].answer5Total;
    const option6Total = questions[index].answer6Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option5.setAttribute('data-total', `${option5Total}`);
    option6.setAttribute('data-total', `${option6Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
    option5.innerHTML = `${question.answer5}`
    option6.innerHTML = `${question.answer6}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
	const answerScore = selectedOption.nextElementSibling.getAttribute('data-total').split(',');

    ////Add the answer score to the score array
	
	score.push(answerScore);

    selectedAnswersData.push()
    
	// [1,20]     [[1,0,0],[0,0,20]]
	
	var totalScore0 = 0;
	score.forEach((element) => totalScore0 += parseInt(element[0]));
	var totalScore1 = 0;
	score.forEach((element) => totalScore1 += parseInt(element[1]));
	var totalScore2 = 0;
	score.forEach((element) => totalScore2 += parseInt(element[2]));
	var totalScore3 = 0;
	score.forEach((element) => totalScore3 += parseInt(element[3]));
	var totalScore4 = 0;
	score.forEach((element) => totalScore4 += parseInt(element[4]));
	var totalScore5 = 0;
	score.forEach((element) => totalScore5 += parseInt(element[5]));

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
	const allScores = [totalScore0, totalScore1, totalScore2, totalScore3, totalScore4, totalScore5];
	const yourKD = kdmember[indexOfMax(allScores)];
	const yourKDPix = kdmemberPix[indexOfMax(allScores)];
	const yourKDLink = kdmemberLinks[indexOfMax(allScores)];
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
		result.style.display = 'flex';
        result.innerHTML =
         `<h1 class="final-score">You are: ${yourKD}</h1>
         <div class="summary">
            <p><img src=${yourKDPix}></p>
			
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
		//<p><h2><a href="${yourKDLink}">${yourKDLink}</a></h2></p>
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
	if (currentQuestion > 0)
	{
		currentQuestion--;
		//remove last array value;
		score.pop();
		//Generate the question
		generateQuestions(currentQuestion);
		if(currentQuestion != totalQuestions - 1) {
			nextButton.textContent = 'Next';
		}
	}
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);


