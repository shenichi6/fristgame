// ==========================
// CHARACTER DATA
// ==========================

const characters = {
    "Fire Knight": {
        hp: 120,
        armor: 6,
        mana: 10,
        attack: 12,
        deck: [
            { name: "Slash", cost: 0, type: "damage", power: 1 },
            { name: "Flame Strike", cost: 5, type: "damage", power: 2 }
        ]
    },

    "Ice Mage": {
        hp: 80,
        armor: 2,
        mana: 18,
        attack: 8,
        deck: [
            { name: "Ice Bolt", cost: 0, type: "damage", power: 1 },
            { name: "Freeze", cost: 6, type: "stun", power: 0 }
        ]
    }
};

// ==========================
// LOAD PLAYER
// ==========================

let playerCharacter =
    localStorage.getItem("playerCharacter") || "Fire Knight";

let enemyCharacter = "Ice Mage";

// ==========================
// STATS
// ==========================

let playerHP = characters[playerCharacter].hp;
let playerMana = characters[playerCharacter].mana;
let playerAttack = characters[playerCharacter].attack;
let playerArmor = characters[playerCharacter].armor;

let enemyHP = characters[enemyCharacter].hp;
let enemyMana = characters[enemyCharacter].mana;
let enemyAttack = characters[enemyCharacter].attack;
let enemyArmor = characters[enemyCharacter].armor;

// ==========================
// DECK SYSTEM
// ==========================

let playerDeck = characters[playerCharacter].deck;
let hand = [];

let playerTurn = true;

// ==========================
// ELEMENTS (SAFE)
// ==========================

const result = document.getElementById("result");
const handDiv = document.getElementById("hand");

// ==========================
// UI UPDATE
// ==========================

function updateUI(){

    document.getElementById("player-hp").textContent = playerHP;
    document.getElementById("player-mana").textContent = playerMana;

    document.getElementById("enemy-hp").textContent = enemyHP;
    document.getElementById("enemy-mana").textContent = enemyMana;

    renderHand();
}

// ==========================
// DRAW CARDS
// ==========================

function drawCard(){
    let card = playerDeck[Math.floor(Math.random() * playerDeck.length)];
    hand.push(card);
}

function drawHand(){
    hand = [];
    for(let i = 0; i < 3; i++){
        drawCard();
    }
}

// ==========================
// RENDER HAND
// ==========================

function renderHand(){

    handDiv.innerHTML = "";

    hand.forEach((card, index) => {

        let btn = document.createElement("button");

        btn.innerText = `${card.name} (${card.cost})`;

        btn.onclick = () => useCard(index);

        handDiv.appendChild(btn);
    });
}

// ==========================
// DAMAGE FUNCTION (DEBUG SAFE)
// ==========================

function dealDamage(target, dmg){

    if(dmg < 0) dmg = 0;

    target.hp -= dmg;

    console.log("Damage dealt:", dmg);
}

// ==========================
// USE CARD
// ==========================

function useCard(index){

    if(!playerTurn) return;

    let card = hand[index];

    if(playerMana < card.cost){
        result.textContent = "Not enough mana!";
        return;
    }

    playerMana -= card.cost;

    if(card.type === "damage"){

        let dmg = (playerAttack * card.power) - enemyArmor;

        dealDamage({hp: enemyHP}, dmg);
        enemyHP -= dmg;

        result.textContent = `You used ${card.name} → ${dmg} damage`;
    }

    if(card.type === "stun"){
        enemyMana -= 2;
        result.textContent = "Enemy stunned!";
    }

    hand.splice(index, 1);

    updateUI();
    checkWin();

    endTurn();
}

// ==========================
// ENEMY TURN
// ==========================

function enemyTurn(){

    enemyMana += 2;

    let dmg = enemyAttack - playerArmor;
    dealDamage({hp: playerHP}, dmg);
    playerHP -= dmg;

    result.textContent = `Enemy attacks → ${dmg}`;

    updateUI();
    checkWin();

    startTurn();
}

// ==========================
// TURN SYSTEM
// ==========================

function endTurn(){
    playerTurn = false;
    setTimeout(enemyTurn, 800);
}

function startTurn(){
    playerTurn = true;
    playerMana += 2;
    drawHand();
}

// ==========================
// WIN CHECK
// ==========================

function checkWin(){

    if(enemyHP <= 0){
        result.textContent = "YOU WIN!";
        disableAll();
    }

    if(playerHP <= 0){
        result.textContent = "YOU LOSE!";
        disableAll();
    }
}

function disableAll(){
    document.querySelectorAll("button").forEach(b => b.disabled = true);
}

// ==========================
// START GAME
// ==========================

drawHand();
updateUI();
startTurn();