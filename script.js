// player names and scores
var p1Name = "";
var p2Name = "";
var p1Score = 0;
var p2Score = 0;

var deck = [];
var cardImages = [];
var roundsRemaining = 26;

$(document).ready( function() {
    loadIntro();
    // preload images
    var img;
    var card;
    var suits = ["C", "D", "S", "H"];
    for (var i = 1; i <= 13; ++i) {
        for (var j = 0; j < suits.length; ++j) {
            card = i + "_" + suits[j];
            deck.push(card);
            img = new Image(209, 303);
            img.src = "images/" + card + ".png";
            // store reference so browser does not get rid of images
            cardImages.push(img);
        }
    }
});

// load intro (first) page for game
function loadIntro() {
    $("#gameBody").empty();
    $("#gameBody").append("<h4 id='rulesHeading'>Game Rules</h4>");
    $("#gameBody").append("<ol id='rulesList'></ol>");
    $("#rulesList").append("<li>You can play against the computer or" +
        " another person.</li>");
    $("#rulesList").append("<li>The game is played with a standard 52-card" +
        " deck. There are 26 rounds in total. In each round, both players" +
        " are dealt a card. The player holding the card with the higher" +
        " rank wins 2 points, and the other player gains 0 points." +
        " If both players hold two cards having the same rank, then" +
        " both players are awarded 1 point.</li>");
    $("#rulesList").append("<li>At the end of the game, the player with the" +
        " higher score wins. Of course, a tie is also a possibility.</li>");
    $("#rulesList").append("<li><code>ACE</code> is considered the lowest ranked" +
        " card in the game, while <code>KING</code> is the highest.</li>");
    $("#gameBody").append("<button id='btnGetPlayerInfo'>Let's Play!</button>");
    var btnGetPlayerInfo = $("#btnGetPlayerInfo");
    btnGetPlayerInfo.click(askForNumPlayers);
}

function askForNumPlayers() {
    $("#gameBody").empty();
    $("#gameBody").append("<button id='btnSingleP'>Single Player</button>");
    $("#btnSingleP").click(function() {
        askforPlayerNames(1);
    });
    $("#gameBody").append("<button id='btnMultiP'>Multi Player</button>");
    $("#btnMultiP").click(function() {
        askforPlayerNames(2);
    });
    $("#gameBody").append("<button id='btnBack'>Back</button>");
    $("#btnBack").click(loadIntro);
}

function askforPlayerNames(numPlayers) {
    $("#gameBody").empty();
    $("#gameBody").append("<table id='tblPNames'></table>");
    $("#tblPNames").append("<tr id='rowP1'></tr>");
    $("#tblPNames").append("<tr id='rowP2'></tr>");
    $("#rowP1").append("<td>Player 1: </td>");
    $("#rowP1").append("<td><input type='text' id='txtP1Name' " +
        "required='required'> </td>");
    $("#rowP2").append("<td>Player 2: </td>");
    $("#rowP2").append("<td id='cellP2'></td>");
    if (numPlayers == 1) {
        p2Name = "Computer";
        $("#cellP2").html("Computer");
    } else {
        $("#cellP2").append("<input type='text' id='txtP2Name' " +
            "required='required'>");
    }
    $("#gameBody").append("<p id='blankNames'>Player names cannot be blank.</p>");
    $("#blankNames").attr("style", "display: none");
    $("#gameBody").append("<button id='btnStartGame'>Start Game!</button>");
    $("#btnStartGame").click(function() {
        p1Name = $("#txtP1Name").val();
        if (p2Name == "") {
            p2Name = $("#txtP2Name").val();
        }
        if (p1Name == "" || p2Name == "") {
            $("#blankNames").attr("style", "display: block");
        } else {
            startGame();
        }
    });
    $("#gameBody").append("<button id='btnBack'>Back</button>");
    $("#btnBack").click(function() {
        resetNames();
        askForNumPlayers();
    });
}

function startGame() {
    shuffleDeck();
    $("#gameBody").empty();
    $("#gameBody").append("<p id='roundsRemaining'>Rounds left: " +
        roundsRemaining +"</p>");
    $("#gameBody").append("<table id='tblGame'></table>");
    $("#tblGame").append("<tr id='rowNames'></tr>");
    $("#rowNames").append("<td>" + p1Name + "</td>");
    $("#rowNames").append("<td>" + p2Name + "</td>");
    $("#tblGame").append("<tr id='rowScores'></tr>");
    $("#rowScores").append("<td id='p1Score'>" + p1Score + "</td>");
    $("#rowScores").append("<td id='p2Score'>" + p2Score + "</td>");
    $("#tblGame").append("<tr id='rowCards'></tr>");
    $("#rowCards").append("<td id='p1Card'></td>");
    $("#rowCards").append("<td id='p2Card'></td>");
    $("#gameBody").append("<p id='gameComments'></p>");
    $("#gameBody").append("<button id='btnNextRound'>Next Round</button>");
    $("#btnNextRound").click(playOneRound);
    $("#gameBody").append("<button id='btnRestart'>Restart Game</button>");
    $("#btnRestart").click(restartGame);
    $("#gameBody").append("<button id='btnMainMenu'>Main Menu</button>");
    $("#btnMainMenu").click(function() {
        resetGameInfo();
        loadIntro();
    });
    // for first round only, because user clicked on 'Start Game' button
    playOneRound();
}

function shuffleDeck() {
    var j;
    var tempCard;
    var tempCardImg;
    for (var i = 0; i < 52; ++i) {
        j = Math.floor((Math.random() * 52));
        tempCard = deck[j];
        tempCardImg = cardImages[j];
        deck[j] = deck[i];
        cardImages[j] = cardImages[i];
        deck[i] = tempCard;
        cardImages[i] = tempCardImg;
    }
}

function playOneRound() {
    var p1CardIndex = (26 - roundsRemaining) * 2;
    var p2CardIndex = p1CardIndex + 1;
    updateCards(cardImages[p1CardIndex], cardImages[p2CardIndex]);
    var roundWinner = updateScores(deck[p1CardIndex], deck[p2CardIndex]);
    // if last round
    if (roundsRemaining == 1) {
        var message;
        if (p1Score > p2Score) {
            message = p1Name + " wins!";
        } else if (p1Score < p2Score) {
            message = p2Name + " wins!";
        } else {
            message = "It's a tie!"
        }
        $("#btnNextRound").remove();
        $("#gameComments").html("Game over! " + message);
        $("#btnRestart").html("Play again!");
    } else {
        if (roundWinner == 1) {
            message = p1Name + " wins this round!";
        } else if (roundWinner == 2) {
            message = p2Name + " wins this round!";
        } else {
            message = "This round is a tie!";
        }
        $("#gameComments").html(message);
    }
    --roundsRemaining;
    $("#roundsRemaining").html("Rounds left: " + roundsRemaining);
}

function updateCards(p1CardImg, p2CardImg) {
    $("#p1Card").empty();
    $("#p2Card").empty();
    $("#p1Card").append(p1CardImg);
    $("#p2Card").append(p2CardImg);
}

function updateScores(p1Card, p2Card) {
    var roundWinner;
    var p1Rank = parseInt(p1Card.substring(0, p1Card.indexOf("_")));
    var p2Rank = parseInt(p2Card.substring(0, p2Card.indexOf("_")));
    if (p1Rank > p2Rank) {
        p1Score += 2;
        roundWinner = 1;
    } else if (p1Rank < p2Rank) {
        p2Score += 2;
        roundWinner = 2;
    } else {
        p1Score += 1;
        p2Score += 1;
        roundWinner = 3;
    }
    $("#p1Score").html(p1Score);
    $("#p2Score").html(p2Score);

    return roundWinner;
}

function resetNames() {
    p1Name = "";
    p2Name = "";
}

function resetScores() {
    p1Score = 0;
    p2Score = 0;
}

function resetRoundsRemaining() {
    roundsRemaining = 26;
}

function resetGameInfo() {
    resetNames();
    resetScores();
    resetRoundsRemaining();
}

function restartGame() {
    resetScores();
    resetRoundsRemaining();
    startGame();
}
