let Yokaimystere; // global variable to hold the mystery Yokai(will be set later)
let yokaiList = []; //will be loaded from yokailist.json

// Function to load the yokai list from the JSON file


async function loadYokaiList() {
    const response = await fetch('yokailist.json');
    if (!response.ok) {
        throw new Error('Failed to load yokailist.json');
    }
    const data = await response.json();
    return data;
}

// Load the yokai list when the script is first run(the test will be removed later)
loadYokaiList().then(list => {
    yokaiList = list;
    SetYokai();
    console.log(yokaiList, "here the yokai list");
}).catch(error => {
    console.error(error);
});


//function to set a random yokai as the mystery yokai

function SetYokai(){
    Yokaimystere = yokaiList[Math.floor(Math.random() * yokaiList.length)]
    console.log(Yokaimystere)
}

// Function to check the user's guess against the mystery Yokai

function checkGuess(){

    // Get the user's guess from the input field
    const guessInput = document.getElementById("guessInput")
    const guess = guessInput.value.trim()

    // If the input is empty, do nothing

    if (!guess) return

    // Find the guessed Yokai in the list
    const guessYokai = yokaiList.find(y => y.name.toLowerCase() === guess.toLowerCase())
    // If the guessed Yokai is not found, do nothing
    if (!guessYokai){
        console.log("existe pas")
        return
    }

    // Create a new div to display the guess
    if (guessYokai.name === Yokaimystere.name){
        // case if the guess is correct
        document.getElementById("result").classList.remove("hidden")
        document.getElementById("result").classList.add("flex")
        return

    }
    if (guessYokai.rank === Yokaimystere.rank){
        document.getElementById("rang").querySelector("p").classList.remove("hidden")
        document.getElementById("rang").querySelector("p").textContent = guessYokai.rank
        document.getElementById("rang").classList.remove("bg-red-600")
        document.getElementById("rang").classList.add("bg-green-600")
        //case if the rank is correct
    } else{
        
        document.getElementById("rang").querySelector("p").textContent = guessYokai.rank
        document.getElementById("rang").querySelector("p").classList.remove("hidden")
        document.getElementById("rang").classList.remove("bg-green-600")
        document.getElementById("rang").classList.add("bg-red-600")
        //case if the rank is incorrect
    }
    if (guessYokai.element === Yokaimystere.element){
        document.getElementById("element").querySelector("p").classList.remove("hidden")
        document.getElementById("element").querySelector("p").textContent = guessYokai.element
        document.getElementById("element").classList.remove("bg-red-600")
        document.getElementById("element").classList.add("bg-green-600")
        //case if the element is correct
    } else{
        document.getElementById("element").querySelector("p").textContent = guessYokai.element
        document.getElementById("element").querySelector("p").classList.remove("hidden")
        document.getElementById("element").classList.remove("bg-green-600")
        document.getElementById("element").classList.add("bg-red-600")
        //case if the element is incorrect
    }
    if (guessYokai.tribu === Yokaimystere.tribu){
        document.getElementById("tribu").querySelector("p").classList.remove("hidden")
        document.getElementById("tribu").querySelector("p").textContent = guessYokai.tribu
        document.getElementById("tribu").classList.remove("bg-red-600")
        document.getElementById("tribu").classList.add("bg-green-600")
        //case if the tribe is correct
    } else{
        document.getElementById("tribu").querySelector("p").textContent = guessYokai.tribu
        document.getElementById("tribu").querySelector("p").classList.remove("hidden")
        document.getElementById("tribu").classList.remove("bg-green-600")
        document.getElementById("tribu").classList.add("bg-red-600")
        //case if the tribe is incorrect
    }
    if (guessYokai.role === Yokaimystere.role){
        document.getElementById("role").querySelector("p").classList.remove("hidden")
        document.getElementById("role").querySelector("p").textContent = guessYokai.role
        document.getElementById("role").classList.remove("bg-red-600")
        document.getElementById("role").classList.add("bg-green-600")
        //case if the role is correct
    } else{
        document.getElementById("role").querySelector("p").textContent = guessYokai.role
        document.getElementById("role").querySelector("p").classList.remove("hidden")
        document.getElementById("role").classList.remove("bg-green-600")
        document.getElementById("role").classList.add("bg-red-600")
        //case if the role is incorrect
    }
    if (guessYokai.nourriture === Yokaimystere.nourriture){
        document.getElementById("nourriture").querySelector("p").classList.remove("hidden")
        document.getElementById("nourriture").querySelector("p").textContent = guessYokai.nourriture
        document.getElementById("nourriture").classList.remove("bg-red-600")
        document.getElementById("nourriture").classList.add("bg-green-600")
        //case if the favourite food is correct
    }else{
        document.getElementById("nourriture").querySelector("p").textContent = guessYokai.nourriture
        document.getElementById("nourriture").querySelector("p").classList.remove("hidden")
        document.getElementById("nourriture").classList.remove("bg-green-600")
        document.getElementById("nourriture").classList.add("bg-red-600")
        //case if the favourite food is incorrect
    }
    if (guessYokai.couleur === Yokaimystere.couleur){
        document.getElementById("couleur").querySelector("p").classList.remove("hidden")
        document.getElementById("couleur").querySelector("p").textContent = guessYokai.couleur
        document.getElementById("couleur").classList.remove("bg-red-600")
        document.getElementById("couleur").classList.add("bg-green-600")
        //case if the color is correct
    }else{
        document.getElementById("couleur").querySelector("p").textContent = guessYokai.couleur
        document.getElementById("couleur").querySelector("p").classList.remove("hidden")
        document.getElementById("couleur").classList.remove("bg-green-600")
        document.getElementById("couleur").classList.add("bg-red-600")
        //case if the color is incorrect
    }

}

