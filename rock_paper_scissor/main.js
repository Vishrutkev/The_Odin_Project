var computerWin = 0;
var playerWin = 0;
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    const choices = ["rock", "paper", "scissor"];

    return choices[randomNumber];
}
function playRound(player, computer) {
    if(player === computer){
        return {computerWin, playerWin};
    }
    if(player === "rock" && computer === "paper"){
        ++computerWin;
        return {computerWin, playerWin};
    }else if(player === "paper" && computer === "scissor"){
        ++computerWin;
        return {computerWin, playerWin};
    }else if(player === "scissor" && computer === "rock"){
        ++computerWin;
        return {computerWin, playerWin};
    }else {
        ++playerWin;
        return {computerWin, playerWin};
    }
}

function game() {
    let max = 5;
    while (max > 0) {
        let player = prompt("Enter rock, paper, or scissor");
        let computer = getComputerChoice();
        let result = playRound(player, computer);
        console.log("player = " + player);
        console.log("computer = " + computer);
        max = max-1;
    }
    if(max == 0) {
        console.log("playerWin = " + playerWin);
        console.log("computerWin = " + computerWin);
        if(computerWin > playerWin){
            console.log("You Lose!!");
        }else if(playerWin > computerWin){
            console.log("You Win!!");
        }else {
            console.log("It's a Tie!")
        }
        computerWin = 0;
        playerWin = 0;
    }
}

//game();
