const diceTimes = document.querySelector("#times")
const diceSides = document.querySelector("#sides") 
const diceResult = document.querySelector("#result")
const resultButton = document.querySelector("button")

rolledNum = []

function diceRoller () {
    const times = Number(diceTimes.value)
    const sides = Number(diceSides.value)
    sum = 0
    for (let i = 1; i <= times; i++){
        rolled = 1 + Math.random() * (sides - 1)
        rolled = Math.round(rolled)
        rolledNum.push([`${i}: ${rolled}`])
        sum = sum + rolled
    }
    diceResult.textContent = sum
}

resultButton.addEventListener("click", () => diceRoller(diceTimes, diceSides))