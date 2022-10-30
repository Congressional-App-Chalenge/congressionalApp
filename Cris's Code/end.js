const recentScore = localStorage.getItem("recentScore");
const totalQs = localStorage.getItem("totalQs");
const endScore = document.getElementById("endScore");
endScore.innerText = "Congrats you got " + (recentScore/10)+"/"+(totalQs)+" questions correct!";

saveHighScore = () => {
    console.log("it did the thing");
    
}

saveHighScore();