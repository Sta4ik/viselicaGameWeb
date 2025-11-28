const inputBlock = $("#inputBlock");
const gameBlock = $("#gameBlock");
const inputWord = $("#inputWord");
const letterButton = $(".letterButton");
const toGameButton = $("#toGameBlock");
const restartButton = $("#restartModal");
const modal = $("#gameOverModal");
const modalText = $("#modalContent p");
const modalH2 =$("#modalContent h2");
const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");
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
        }
    }

    $(this).prop("disabled", true);
    $("#viewWord").text(viewWord.join(" "));

    if(found === false){
        error += 1;
        drawViselica();
    }

    isGameOver();
}

function isGameOver(){
    if(error >= 10){
        modal.show();
        modalH2.text("Пупупу");
        modalText.text("Проиграл");
        letterButton.prop("disabled", true);
    } else if(needWord === viewWord.join("")){
        modal.show()
        modalH2.text("Урааа");
        modalText.text("Победа");
        letterButton.prop("disabled", true);
    }
}

function drawViselica(){ //Это я нагло украл с https://programmersforum.ru/showthread.php?t=313106 и переделал
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    switch(error){
        case 1:
            ctx.beginPath();
            ctx.moveTo(10, 240);
            ctx.lineTo(190, 240);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(40, 240);
            ctx.lineTo(40, 20);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(40, 20);
            ctx.lineTo(120, 20);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(120, 20);
            ctx.lineTo(120, 50);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.arc(120, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(120, 90);
            ctx.lineTo(120, 150);
            ctx.stroke();
            break;
        case 7:
            ctx.beginPath();
            ctx.moveTo(120, 100);
            ctx.lineTo(90, 130);
            ctx.stroke();
            break;
        case 8:
            ctx.beginPath();
            ctx.moveTo(120, 100);
            ctx.lineTo(150, 130);
            ctx.stroke();
            break;
        case 9:
            ctx.beginPath();
            ctx.moveTo(120, 150);
            ctx.lineTo(90, 190);
            ctx.stroke();
            break;
        case 10:
            ctx.beginPath();
            ctx.moveTo(120, 150);
            ctx.lineTo(150, 190);
            ctx.stroke();
            break;
    }
}

function restartGame(){
    error = 0;
    viewWord = [];
    needWord = "";
    $("#viewWord").remove();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    letterButton.prop("disabled", false);
    modal.hide();
    inputBlock.show();
    gameBlock.hide();
}

toGameButton.on("click", toGameBlock);
letterButton.on("click", pressLetter);
restartButton.on("click", restartGame);