(function () {
    let Yokaimystere; // global variable to hold the mystery Yokai(will be set later)
    let yokaiList = []; //will be loaded from yokailist.json
    let tryCount = 0;
    const maxTry = 3;


    // Function to load the yokai list from the JSON file


    async function loadYokaiList() {
        const response = await fetch('yokailist.json');
        if (!response.ok) {
            throw new Error('Failed to load yokailist.json');
        }
        const data = await response.json();
        return data;
    }

    // Load the yokai list when the script is first run
    loadYokaiList().then(list => {
        yokaiList = list;
        SetYokai();
        populateYokaiNames();   // Call the function to populate the datalist
        // Add event listener to the input field to filter names as the user types
        const guessInput = document.getElementById("guessInput");
        if (guessInput) {
            guessInput.addEventListener("input", (e) => {
                populateYokaiNames(e.target.value);
            });
        }


    }).catch(error => {
        console.error(error);
    });


    // Function to populate the datalist with Yokai names, filtered by user input
    function populateYokaiNames(filter = "") {
        const datalist = document.getElementById("yokai-names");
        datalist.innerHTML = "";
        yokaiList.forEach(yokai => {
            if (yokai.name.toLowerCase().startsWith(filter.toLowerCase())) {
                const option = document.createElement("option");
                option.value = yokai.name;
                datalist.appendChild(option);
            }
        });
    }
    //function to set a random yokai as the mystery yokai

    function SetYokai() {
        Yokaimystere = yokaiList[Math.floor(Math.random() * yokaiList.length)]
        const yokai_shadow = document.getElementById("yokai_image")
        yokai_shadow.src = Yokaimystere.image;
        yokai_shadow.alt = Yokaimystere.alt;
        tryCount = 0;
        clearHints()

    }


    function displayHint() {
        
        

        const hintElement = document.getElementById("hint-container");

        // Display different hints based on try count
        switch (tryCount) {
            case 3:
                hintElement.innerHTML = `
                    <h3 class="font-bold mb-2">💡 Indice (Essai ${tryCount}):</h3>
                    <p><strong>Tribu:</strong> ${Yokaimystere.tribu}</p>
                `;
                break;
            case 4:
                hintElement.innerHTML = `
                    <h3 class="font-bold mb-2">💡 Indice (Essai ${tryCount}):</h3>
                    <p><strong>Tribu:</strong> ${Yokaimystere.tribu}</p>
                    <p><strong>Élément:</strong> ${Yokaimystere.element}</p>
                `;
                break;
            case 5:
                hintElement.innerHTML = `
                    <h3 class="font-bold mb-2">💡 Indice (Essai ${tryCount}):</h3>
                    <p><strong>Tribu:</strong> ${Yokaimystere.tribu}</p>
                    <p><strong>Élément:</strong> ${Yokaimystere.element}</p>
                    <p><strong>Rôle:</strong> ${Yokaimystere.role}</p>
                `;
                break;
            case 6:
                hintElement.innerHTML = `
                    <h3 class="font-bold mb-2">💡 Indice (Essai ${tryCount}):</h3>
                    <p><strong>Tribu:</strong> ${Yokaimystere.tribu}</p>
                    <p><strong>Élément:</strong> ${Yokaimystere.element}</p>
                    <p><strong>Rôle:</strong> ${Yokaimystere.role}</p>
                    <p><strong>Nourriture préférée:</strong> ${Yokaimystere.nourriture}</p>
                `;
                break;
            default:
                if (tryCount > 6) {
                    hintElement.innerHTML = `
                        <h3 class="font-bold mb-2">💡 Tous les indices:</h3>
                        <p><strong>Tribu:</strong> ${Yokaimystere.tribu}</p>
                        <p><strong>Élément:</strong> ${Yokaimystere.element}</p>
                        <p><strong>Rôle:</strong> ${Yokaimystere.role}</p>
                        <p><strong>Nourriture:</strong> ${Yokaimystere.nourriture}</p>
                        <p><strong>Rareté:</strong> ${Yokaimystere.rarity}</p>
                        <p><strong>Rang:</strong> ${Yokaimystere.rank}</p>
                    `;
                }
        }

    }

    function clearHints() {
        const hintContainer = document.getElementById("hint-container");
        if (hintContainer) {
            hintContainer.innerHTML = ''
        }
    }


    function addDiv(guessYokai) {
        const container = document.getElementById("guess-container")
        const div = document.createElement("div")
        div.className = "flex item-center justify-center w-full"
        function getColor(category) {
            return String(guessYokai[category]).trim().toLowerCase() === String(Yokaimystere[category]).trim().toLowerCase()
                ? "bg-green-600"
                : "bg-red-600";
        }
        div.innerHTML = `
        <div class="${getColor('name')} aspect-square h-24 w-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 flex justify-center items-center overflow-hidden">${guessYokai.name}</div>
    `
        container.prepend(div)
    }









    // Function to check the user's guess against the mystery Yokai
    function checkGuess() {

        // Get the user's guess from the input field
        const guessInput = document.getElementById("guessInput")
        const guess = guessInput.value.trim()

        // Find the guessed Yokai in the list
        const guessYokai = yokaiList.find(y => y.name.toLowerCase() === guess.toLowerCase())
        // If the input is empty, do nothing
        // If the guessed Yokai is not found, do nothing

        if (!guess || !guessYokai) return


        tryCount++

        if (tryCount >= maxTry) {
            displayHint();
        }





        addDiv(guessYokai)
        guessInput.value = ""

        guessInput.blur()
        populateYokaiNames("")



        // Create a new div to display the guess
        if (guessYokai.name === Yokaimystere.name) {
            // case if the guess is correct
            document.getElementById("result").classList.remove("hidden")
            document.getElementById("result").classList.add("flex")
            document.getElementById("yokai_image").classList.remove("brightness-0")
            return

        } else {

        }


    }
    window.checkGuess = checkGuess;

})();