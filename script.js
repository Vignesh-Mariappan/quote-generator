const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const twitterBtn = document.querySelector('.twitter-button');
const newQuoteBtn = document.querySelector('.new-quote');
const load = document.querySelector('.loader');
const errorMsg = document.querySelector('.error-message');

let funcCallCount = 0;

function showLoadingSpinner() {
    load.hidden = false;
    errorMsg.hidden = true;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!load.hidden) {
        quoteContainer.hidden = false;
        errorMsg.hidden = true;
        load.hidden = true;
    }
}

function showingErrorMsg() {
    load.hidden = true;
    quoteContainer.hidden = true;
    errorMsg.hidden = false;
}

//Get quote from API
async function getQuote() {
    funcCallCount++;
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const getQuoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    try {
        const response = await fetch(proxyUrl + getQuoteUrl);
        const data = await response.json();
        data.quoteAuthor === '' ? quoteAuthor.innerText = 'unknown' : 
                                  quoteAuthor.innerText = data.quoteAuthor;
        data.quoteText.length > 120 ? quote.classList.add('long-quote') :
                                      quote.classList.remove('long-quote');
        quote.innerText = data.quoteText;
        removeLoadingSpinner();
        console.log(data);
    } catch (error) {
        if(funcCallCount >= 15) {
            showingErrorMsg();
            console.log('Count is five plus');
        } else {
            getQuote();
        } 
        
    }
}

//Tweet quote
function tweetQuote() {
    const quoteText = quote.innerText;
    const author = quoteAuthor.innerText;
    console.log(quoteText);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//Call the async function on load
getQuote();
