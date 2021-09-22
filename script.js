$(function() {startGame()});
function greeting(turnCount, answerArray) {
    $("#displayStatus").append( "\"Виселица\" –  игра на угадывание слов. В нашем варианте " +
    "компьютер будет загадывать слово, а вы отгадывать его. <br>У Вас будет " + turnCount + " попыток.<br>" +
    "Загаданое компьютером слово:<br>" + answerArray.join(" ") + "<br>Нажмите Далее, чтобы начать.");  // полностью описать правила
}

function pickWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function setupAnswerArray(word) {
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    return answerArray;
}

function openLettersAndNotify(guess, word, answerArray, remainingLetters) {
    var correctLetter = false;
    alreadyUsedLetters.push(guess);
    for (var j = 0; j < word.length; j++) {
        if (word[j] === guess && answerArray[j] == "_") {
            answerArray[j] = guess;
            remainingLetters--;
            correctLetter = true;
        }
    }
    if (remainingLetters == 0) {
        showAnswerAndRatePlayer(turnCount, word);
    } else if (remainingLetters > 0) {
        if (turnCount == 1) {
            if (correctLetter == true) {
                    showAnswerAndRatePlayer(turnCount, word);
            } else {
                turnCount--;
                showAnswerAndRatePlayer(turnCount, word);
            }
        } else {
            if (correctLetter == false) {
                
                turnCount--;
                document.getElementById("displayStatus").innerHTML = "К сожалению, данной буквы в слове нет:<br>"+answerArray.join(" ")
                 + "<br>У Вас осталось попыток: " + turnCount;
                document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');;
                if (turnCount == 9) {
                    $("#line-1").css({display: "block"});
                    $("#line-2").css({display: "none"});
                    $("#line-3").css({display: "none"});
                    $("#line-4").css({display: "none"});
                    $("#line-5").css({display: "none"});
                    $("#line-6").css({display: "none"});
                    $("#line-7").css({display: "none"});
                    $("#line-8").css({display: "none"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                else if (turnCount == 8) {
                    $("#line-2").css({display: "block"});
                    $("#line-3").css({display: "none"});
                    $("#line-4").css({display: "none"});
                    $("#line-5").css({display: "none"});
                    $("#line-6").css({display: "none"});
                    $("#line-7").css({display: "none"});
                    $("#line-8").css({display: "none"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                  else if (turnCount == 7) {
                    $("#line-3").css({display: "block"});
                    $("#line-4").css({display: "none"});
                    $("#line-5").css({display: "none"});
                    $("#line-6").css({display: "none"});
                    $("#line-7").css({display: "none"});
                    $("#line-8").css({display: "none"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                  else if (turnCount == 6) {
                    $("#line-4").css({display: "block"});
                    $("#line-5").css({display: "none"});
                    $("#line-6").css({display: "none"});
                    $("#line-7").css({display: "none"});
                    $("#line-8").css({display: "none"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                  else if (turnCount == 5) {
                    $("#line-5").css({display: "block"});
                    $("#line-6").css({display: "none"});
                    $("#line-7").css({display: "none"});
                    $("#line-8").css({display: "none"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                  else if (turnCount == 4) {
                    $("#line-6").css({display: "block"});
                    $("#line-7").css({display: "none"});
                    $("#line-8").css({display: "none"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                  else if (turnCount == 3) {
                    $("#line-7").css({display: "block"});
                    $("#line-8").css({display: "none"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                  else if (turnCount == 2) {
                    $("#line-8").css({display: "block"});
                    $("#line-9").css({display: "none"});
                    $("#tubaret").css({display: "none"});
                }
                  else if (turnCount == 1) {
                    $("#line-9").css({display: "block"});
                    $("#tubaret").css({display: "none"});
                }

            } else {
                document.getElementById("displayStatus").innerHTML = "Введённая Вами буква верна:<br>" + answerArray.join(" ")
                 +  "<br>У Вас осталось попыток: " + turnCount;
                 document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');;
        }
        }
    }
    return newGameState = {
        newRemainingLetters: remainingLetters,
        newTurnCount: turnCount,
    };

}

function showAnswerAndRatePlayer(turnCount, word) {
    if (turnCount == 0) {
        document.getElementById("displayStatus").innerHTML = "К сожалению, попытки кончились! Было загадано слово: \""
         + word + "\".";
        $("#tubaret").css({display: "block"});
    } else {
        document.getElementById("displayStatus").innerHTML = "Победа! Было загадано слово: \"" + word + "\".";
    }
    $("#guessOfPlayer").css({display: "none"});
    $("#interactWithPlayer").css({display: "none"});
    $("#confirmActions").css({display: "none"});
    $("#exitButton").css({display: "none"});
    $("#restartGame").css({visibility: "visible"});
}

function confirmActions(word, answerArray) {
    if (counterOfConfirmActions % 2 == 0) {
        document.getElementById("displayStatus").innerHTML = "Введите букву, которая по-вашему мнению есть в слове: ";
        document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        counterOfConfirmActions += 1;
    } else {
        var guess = document.getElementById("guessOfPlayer").value.toLowerCase();
        if (guess == "" || guess == " " ) {
            document.getElementById("displayStatus").innerHTML = "Введите только <b>одну букву</b>: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        } else if (alreadyUsedLetters.includes(guess)) {
            document.getElementById("displayStatus").innerHTML = "Вы <b>уже использовали</b> эту букву. Введите новую: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        } else {
            openLettersAndNotify(guess, word, answerArray, remainingLetters, turnCount);
            remainingLetters = newGameState.newRemainingLetters;
            turnCount = newGameState.newTurnCount;
            counterOfConfirmActions += 1;
        }
    }
}

function confirmWord(word, answerArray) {
    var guessWord = document.getElementById("guessedWord").value.toLowerCase();
    if(guessWord != word){
        document.getElementById("displayStatus").innerHTML = "К сожалению, вы проиграли! Было загадано слово: \""
         + word + "\".";
        $("#line-1").css({display: "block"});
        $("#line-2").css({display: "block"});
        $("#line-3").css({display: "block"});
        $("#line-4").css({display: "block"});
        $("#line-5").css({display: "block"});
        $("#line-6").css({display: "block"});
        $("#line-7").css({display: "block"});
        $("#line-8").css({display: "block"});
        $("#line-9").css({display: "block"});
        $("#tubaret").css({display: "block"});
    }
    else{
        document.getElementById("displayStatus").innerHTML = "Победа! Было загадано слово: \"" + word + "\".";

    }

    $("#guessOfPlayer").css({display: "none"});
    $("#interactWithPlayer").css({display: "none"});
    $("#confirmActions").css({display: "none"});
    $("#exitButton").css({display: "none"});
    $("#restartGame").css({visibility: "visible"});
}

var turnCount = 10;
var counterOfConfirmActions = 0;
var words = ["мистер", "танк", "профессионал", "майнкрафт", "слово", "ноутбук", "мышь", "школа", "друзья", "телефон", "адаптер", "тетрадь", "ручка", "калач", "книга", "черчение", "дневник", "часы", "наушники", "провод", "ластик", "линейка", "циркуль", "учебник", "пират", "учительница", "команда", "автобус", "подарок", "радуга", "стадион", "щенок", "луна", "сокровище", "заяц", "торт", "фломастер", "рыбак", "парк", "ромашка", "путешествие", "бумага", "аист", "щука", "писатель", "математика", "счёт", "меню", "успех", "стол", "велосипед", "пирамида", "число"];
var alreadyUsedLetters = [];
var word = pickWord(words);
var remainingLetters = word.length;
var answerArray = setupAnswerArray(word);

function startGame(turnCount, answerArray) {
    greeting(turnCount, answerArray);
}

function exitGame(word) {
    document.getElementById("displayStatus").innerHTML = "Очень жаль, что вы завершили игру. Было загадано слово: " + word + ".";
    $("#guessOfPlayer").css({display: "none"});
    $("#interactWithPlayer").css({display: "none"});
    $("#confirmActions").css({display: "none"});
    $("#exitButton").css({display: "none"});
    $("#restartGame").css({visibility: "visible"});
}

console.log(word);