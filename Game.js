// CodeWithQueen 

//Getting HTML elements 
let container = document.querySelector(".container");
let weaponBox = container.querySelector(".weapon-box");
let playerChoiceBox = container.querySelector(".player-choices");
let weapons = weaponBox.querySelectorAll(".weapons div");
let player = playerChoiceBox.querySelector(".player-choice img");
let computer = playerChoiceBox.querySelector(".computer-choice img");
let resultBox = container.querySelector(".result-box");
let resultTxt = resultBox.querySelector("h3");
let playAgainBtn = resultBox.querySelector("button");
let wonValueTxt = document.querySelector(".score-box .won h3 span");
let lostValueTxt = document.querySelector(".score-box .lost h3 span");
let drawValueTxt = document.querySelector(".score-box .draw h3 span");

//Initial scores
let won = 0, lost = 0, draw = 0;

//Defines the computer possible choices
let computerChoices = ["Rock", "Paper", "Scissors"];

//Possible outcomes of the game
let outcomes = {
    RockRock: "Draw",
    RockPaper: "Computer",
    RockScissors: "You",
    PaperPaper: "Draw",
    PaperRock: "You",
    PaperScissors: "Computer",
    ScissorsScissors: "Draw",
    ScissorsRock: "Computer",
    ScissorsPaper: "You"
}

//Add event listener to the weapon choices
for(let i = 0; i < weapons.length; i++){
    weapons[i].addEventListener("click", (e) =>{

        player.src = "images/Rock.png";
        computer.src = `images/Rock.png`;

        //Hide the weapon box and show the player choices
        weaponBox.style.display = "none";
        playerChoiceBox.style.display = "block";

        //Add a delay before showing the player choices
        setTimeout(() =>{
            playerChoiceBox.classList.add("active");
        }, 1000);

        setTimeout(() =>{
            let playerChoices = playerChoiceBox.querySelectorAll("div");
            for(let i = 0; i < playerChoices.length; i++){
                playerChoices[i].style.animationPlayState = "paused";
            }  
            
            // Set the player choice to the weapon
            player.src = e.target.src;

            //Generates a random computer choice
            let randomChoice = computerChoices[Math.floor(Math.random()*
            computerChoices.length)];
            computer.src = `images/${randomChoice}.png`;

            let userChoice = e.target.parentElement.className;
            let outcomeValue = outcomes[userChoice + randomChoice];

            //Show the results
            showResult(outcomeValue);
        }, 3000);
    });
}

//Show results of the game
let showResult = (result) =>{

    container.style.height = "440px";
    resultBox.style.display = "block";

    if(result === "You"){
        resultTxt.innerHTML = "Congrats, You Won! &#x1F389;";
        won++;
        wonValueTxt.innerHTML = won;
    }
    else if(result === "Computer"){
        resultTxt.innerHTML = "You Lost!";
        lost++;
        lostValueTxt.innerHTML = lost;
    }
    else{
        resultTxt.innerHTML = "Match Draw!";
        draw++;
        drawValueTxt.innerHTML = draw;
    }
}

playAgainBtn.addEventListener("click", () =>{
    //Reset the game state
    playerChoiceBox.classList.remove("active");
    container.style.height = "380px";
    resultBox.style.display = "none";
    weaponBox.style.display = "block";
    playerChoiceBox.style.display = "none";

    //Resume the animation on the revealing hands when player choose his weapon
    let playerChoices = playerChoiceBox.querySelectorAll("div");
    for(let i = 0; i < playerChoices.length; i++){
        playerChoices[i].style.animationPlayState = "running";
    }  
    
})
