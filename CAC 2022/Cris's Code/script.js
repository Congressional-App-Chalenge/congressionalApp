const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choiceText"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const finalScoreText = document.getElementById("endScore");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let qCounter=0;
let availiableQs = [];
let correct = 0;

let questions = [];

fetch("questions.json")
    .then(res => {
        return res.json();
    }).then(loadedQs => {
        questions = loadedQs;
        startQuiz();
    })
    .catch(err => {
        console.log(err);
    });

const CORRECTBONUS = 10;
const MAXQUESTIONS = 10;

startQuiz = () => {
    qCounter = 0;
    score =0;
    availiableQs = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availiableQs.length==0 || qCounter>=MAXQUESTIONS){
        //finalScoreText.innerText = "Congrats!! You got "+ correct + "out of " + MAXQUESTIONS + "questions correct!" ;
        localStorage.setItem('recentScore', score);
        localStorage.setItem('totalQs', MAXQUESTIONS);
        return window.location.assign("./end.html");
    }
    qCounter++;
    progressText.innerText = 'Question: '+qCounter+'/'+MAXQUESTIONS;
    progressBarFull.style.width = `${(qCounter/MAXQUESTIONS)*100}%` ;

    const questionIndex = Math.floor(Math.random()*availiableQs.length)
    currentQuestion =  availiableQs[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText=currentQuestion['choice' + number];
    })

    availiableQs.splice(questionIndex, 1);

    acceptingAnswers=true;

};

choices.forEach((choice) =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer){
            classToApply = 'correct';
        }

        if(classToApply == 'correct') {
            incrementScore(CORRECTBONUS);
            correct++;
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});

incrementScore = num => {
    score+=num;
    scoreText.innerText = score;
}

