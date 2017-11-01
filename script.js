$(document).ready(loadIntro);

// load intro (first) page for game
function loadIntro() {
    $("#gameBody").empty();
    $("#gameBody").append("<h4>Game Rules</h4>");
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

// player names and scores
var p1Name = "";
var p2Name = "";
var p1Score = 0;
var p2Score = 0;

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
    $("#gameBody").append("<button id='btnStartGame'>Start Game!</button>");
    $("#btnStartGame").click(function() {
        p1Name = $("#txtP1Name").val();
        if (p2Name == "") {
            p2Name = $("#txtP2Name").val();
        }
        // simple test to make sure everything is working fine
        $("#gameBody").append("<p> Player 1:" + p1Name + "</p>");
        $("#gameBody").append("<p> Player 2:" + p2Name + "</p>");
    });
    $("#gameBody").append("<button id='btnBack'>Back</button>");
    $("#btnBack").click(function() {
        p2Name = "";
        askForNumPlayers();
    });
}
