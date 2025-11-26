const inputBlock = $("#inputBlock");
const gameBlock = $("#gameBlock");
const inputWord = $("#inputWord");
const letterButton = $(".letterButton");
const toGameButton = $("#toGameBlock");
const modal = $("#gameOverModal");
let needWord;
let viewWord = [];
let error = 0;

gameBlock.hide();
modal.hide();

function toGameBlock(){
    needWord = inputWord.val().replace(/[^а-яА-ЯёЁ]/g, "").toUpperCase();
    viewWord = Array(needWord.length);

    for(let i = 0; i < viewWord.length; ++i){
        viewWord[i] = "_";
    }

    gameBlock.append(`<p id="viewWord">${viewWord.join(" ")}<p>`);
    inputBlock.hide();
    gameBlock.show();
}

function pressLetter(){
    let letter = $(this).text()
    let found = false;
    for(let i = 0; i < needWord.length; ++i){
        if(needWord[i] === letter){
            viewWord[i] = letter;
            found = true;
            $(this).prop("disabled", true);
        }
    }

    $("#viewWord").text(viewWord.join(" "));

    if(found === false){
        error += 1;
    }

    isGameOver();
}

function isGameOver(){
    if(error >= 10){
        modal.show();
    }
}

toGameButton.on("click", toGameBlock);
letterButton.on("click", pressLetter);