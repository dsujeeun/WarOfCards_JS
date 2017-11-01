// player names and scores
var p1Name = "";
var p2Name = "";
var p1Score = 0;
var p2Score = 0;

// Get player information
var btnGetPlayerInfo = $("#btnGetPlayerInfo");
btnGetPlayerInfo.click(askForNumPlayers);

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
    $("#btnBack").click(function() {
        location.replace("index.html");
    });
}

function askforPlayerNames(numPlayers) {
    $("#gameBody").empty();
    $("#gameBody").append("<table id='tblPNames'></table>");
    $("#tblPNames").append("<tr id='rowP1'></tr>");
    $("#tblPNames").append("<tr id='rowP2'></tr>");
    $("#rowP1").append("<td>Player 1: </td>");
    $("#rowP1").append("<td><input type='text' id='txtP1Name'" +
        "required='required'> </td>");
    $("#rowP2").append("<td>Player 2: </td>");
    $("#rowP2").append("<td id='cellP2'></td>");
    if (numPlayers == 1) {
        p2Name = "Computer";
        $("#cellP2").html("Computer");
    } else {
        $("#cellP2").append("<input type='text' id='txtP2Name'" +
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
