let TEXT_SIZE = 20;

function setTextSize(TEXTSIZE){
    TEXT_SIZE = TEXTSIZE;
    renderNewText();

    const buttons = document.querySelectorAll('button');
    for(let i = 0; i < buttons.length;i++){
        if (TEXTSIZE != buttons[i].textContent){
            buttons[i].classList.remove('selected');
        }else {
            buttons[i].classList.add('selected');
        }
    }

}

const QUOTE_DISPLAY_ELEMENT = document.getElementById('quoteDisplay');
const QUOTE_INPUT_ELEMENT = document.getElementById('quoteInput');
const TIMER_ELEMENT = document.getElementById('timer');
const WORD_LIST = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
    "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
    "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
    "is", "are", "was", "were", "been", "being", "be", "am", "being", "have",
    "has", "had", "do", "does", "did", "doing", "will", "would", "shall", "should",
    "may", "might", "must", "can", "could", "ought", "ought", "need", "used", "used",
    "take", "takes", "taking", "took", "take", "go", "goes", "going", "went", "gone",
    "make", "makes", "making", "made", "make", "come", "comes", "coming", "came", "come",
    "see", "sees", "seeing", "saw", "seen", "give", "gives", "giving", "gave", "given",
    "put", "puts", "putting", "put", "put", "find", "finds", "finding", "found", "found",
    "say", "says", "saying", "said", "said", "think", "thinks", "thinking", "thought", "thought",
    "tell", "tells", "telling", "told", "told", "ask", "asks", "asking", "asked", "asked",
    "work", "works", "working", "worked", "worked", "seem", "seems", "seeming", "seemed", "seemed",
    "feel", "feels", "feeling", "felt", "felt", "try", "tries", "trying", "tried", "tried"
];

let MARCEL_MODE = false;
const BOOM_SOUND = new Audio('./sounds/boom.mp3')

let started = false;

QUOTE_INPUT_ELEMENT.addEventListener('input', function () {
    const arrayQuote = QUOTE_DISPLAY_ELEMENT.querySelectorAll('span');
    const arrayValue = QUOTE_INPUT_ELEMENT.value.split('');
    console.log("changed");

    if (!started){
        startTimer();
    }

    started = true;

   


    let finished = true;

    arrayQuote.forEach((characterSpan,index) =>{
        const character = arrayValue[index];
        if (character == null){
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
            finished = false;
        }else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');

        }else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            finished = false;
            console.log("wrong");
            if (MARCEL_MODE) BOOM_SOUND.play();
        }
    })

    if (finished){
        // ADD FINISHED FUNCTIONALITY HERE (SHOW WPM, ETC)
        console.log("Finished!");
        TIMER_ELEMENT.innerText= 'Finished! | WPM: ' + getStats().WPM;
        started = false;
        renderNewText();
    }

})

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    return WORD_LIST[randomIndex];
}

let startTime;

function renderNewText() {
    let quote ="";
    for (let i = 0; i < TEXT_SIZE; i++) {
        if (i > 0) {
            quote += " ";  // Add space before adding a word (except for the first word)
        }
        quote += getRandomWord();
    }
    QUOTE_DISPLAY_ELEMENT.textContent = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        QUOTE_DISPLAY_ELEMENT.appendChild(characterSpan);
    })
    QUOTE_INPUT_ELEMENT.value = null;
}



function startTimer() {
    TIMER_ELEMENT.innerText = 0;
    startTime = new Date();
    setInterval(function () {
        if (started) {TIMER_ELEMENT.innerText=getTimerTime();}
        
    }, 1000)
}

function getTimerTime() {
   return Math.floor((new Date() - startTime)/1000);
}

function getStats() {
    var quoteCharacterCount= QUOTE_DISPLAY_ELEMENT.querySelectorAll('span').length;

    let stats = {
        WPM: (((quoteCharacterCount/5)/Math.max(getTimerTime()/60))).toFixed(1),
        userCharacterCount: QUOTE_INPUT_ELEMENT.value.split('').length,
        accuracy: 100,
    }

    return stats;

}

function toggleVisibility(selector) {
    let element = document.querySelector(selector);
    element.classList.toggle('hidden');
}

renderNewText();