const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choiceText"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let qCounter=0;
let availiableQs = [];

let questions = [
    {
        question: 'Question Number 1',
        choice1: 'CHOICE UNO',
        choice2: 'Choice 2',
        choice3: 'Choice 3',
        choice4: 'Choice 4',
        answer: 1,
    },
    {
        question: 'Question Number 2',
        choice1: 'Choice 1',
        choice2: 'Choice 2',
        choice3: 'Choice 3',
        choice4: 'OPTION FOUR',
        answer: 4,
    },
    {
        question: 'Question Number 3',
        choice1: 'Choice 1??',
        choice2: 'Choice 2???',
        choice3: 'THREEE??????',
        choice4: 'Choice 4???',
        answer: 3,
    },
];

const CORRECTBONUS = 10;
const MAXQUESTIONS = 3;

startQuiz = () => {
    qCounter = 0;
    score =0;
    availiableQs = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availiableQs.length==0 || qCounter>=MAXQUESTIONS){
        return window.location.assign("/end.html");
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

startQuiz();