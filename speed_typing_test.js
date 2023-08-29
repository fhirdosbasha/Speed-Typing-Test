let timeElem = document.getElementById("time");
let quotationDisplayElem = document.getElementById("quoteDisplay");
let resultElem = document.getElementById("result");
let quoteInputElem = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinnerElem = document.getElementById("spinner");
let userInput;
let quote;
let time;
let intervalId;


function generateAndDisplayQuote(){
    spinnerElem.classList.remove("d-none");
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    fetch(url, options)
    .then(function(response){
        return response.json();
    }).then(function(jsonData){
        quote = jsonData.content;
        spinnerElem.classList.add("d-none");
        quotationDisplayElem.textContent = quote;
    });
}
generateAndDisplayQuote();
startTimer();

quoteInputElem.addEventListener("change", function(event){
    userInput = event.target.value;
});

function startTimer(){
    time = 0;
    intervalId = setInterval(function(){
        time = time + 1;
        timeElem.textContent = time;
    },1000);
}
function verifyQuote(){
    if(userInput === quote){
        clearInterval(intervalId);
        resultElem.textContent = "You typed in " + time + " seconds";
    } else {
        resultElem.textContent = "You typed incorrect sentence";
    }
}

resetBtn.addEventListener("click", function(){
    generateAndDisplayQuote();
    quoteInputElem.value = "";
    resultElem.textContent = "";
    clearInterval(intervalId);
    startTimer();
});

submitBtn.addEventListener("click", verifyQuote);