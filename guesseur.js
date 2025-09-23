(function () {
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

    }


    function addGuessDiv(guessYokai) {
        const container = document.getElementById("guess-container")
        const div = document.createElement("div")
        div.className = "flex item-center justify-center gap-4 w-full md:shrink-0"
        function getColor(category) {
            return String(guessYokai[category]).trim().toLowerCase() === String(Yokaimystere[category]).trim().toLowerCase()
                ? "bg-green-600"
                : "bg-red-600";
        }
        div.innerHTML = `
        <div class="${getColor('name')} aspect-square h-24 w-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 flex justify-center items-center overflow-hidden">
    <img src="${guessYokai.image}" alt="${guessYokai.name}" class="w-full h-full object-contain">
</div>
        <div class="${getColor('rank')} aspect-square w-24 h-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 flex justify-center items-center text-base max-md:text-sm text-center break-words whitespace-normal overflow-hidden max-sm:text-[0.625rem]">
        <img src="${guessYokai.rankimage}" alt="${guessYokai.rank}" class="w-12 h-12 object-contain"></div>
        <div class="${getColor('tribu')} aspect-square w-24 h-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 flex justify-center items-center text-base max-md:text-sm text-center break-words whitespace-normal overflow-hidden max-sm:text-[0.625rem]">
        <img src="${guessYokai.tribuimage}" alt="${guessYokai.tribu}" class="w-full h-full object-contain"></div>
        <div class="${getColor('element')} aspect-square w-24 h-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 flex justify-center items-center text-base max-md:text-sm text-center break-words whitespace-normal overflow-hidden max-sm:text-[0.625rem]">${guessYokai.element}</div>
        <div class="${getColor('role')} aspect-square w-24 flex h-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 justify-center items-center text-base max-md:text-sm text-center break-words whitespace-normal overflow-hidden max-sm:text-[0.625rem]">${guessYokai.role}</div>
        <div class="${getColor('nourriture')} aspect-square w-24 h-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 flex justify-center items-center text-base max-md:text-sm text-center break-words whitespace-normal overflow-hidden max-sm:text-[0.625rem]">${guessYokai.nourriture}</div>
        <div class="${getColor('rarity')} aspect-square w-24 flex h-24 max-md:h-16 max-md:w-16 max-sm:w-10 max-sm:h-10 justify-center items-center text-base max-md:text-sm text-center break-words whitespace-normal overflow-hidden max-sm:text-[0.625rem]">${guessYokai.rarity}</div>
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





        addGuessDiv(guessYokai)
        guessInput.value = ""

        guessInput.blur()
        populateYokaiNames("")


        // Create a new div to display the guess
        if (guessYokai.name === Yokaimystere.name) {
            // case if the guess is correct
            document.getElementById("result").classList.remove("hidden")
            document.getElementById("result").classList.add("flex")
            return

        }
        if (guessYokai.rank === Yokaimystere.rank) {
            document.getElementById("rang").querySelector("p").classList.remove("hidden")
            document.getElementById("rang").querySelector("p").textContent = guessYokai.rank
            document.getElementById("rang").classList.remove("bg-red-600")
            document.getElementById("rang").classList.add("bg-green-600")
            //case if the rank is correct
        } else {

            document.getElementById("rang").querySelector("p").textContent = guessYokai.rank
            document.getElementById("rang").querySelector("p").classList.remove("hidden")
            document.getElementById("rang").classList.remove("bg-green-600")
            document.getElementById("rang").classList.add("bg-red-600")
            //case if the rank is incorrect
        }
        if (guessYokai.element === Yokaimystere.element) {
            document.getElementById("element").querySelector("p").classList.remove("hidden")
            document.getElementById("element").querySelector("p").textContent = guessYokai.element
            document.getElementById("element").classList.remove("bg-red-600")
            document.getElementById("element").classList.add("bg-green-600")
            //case if the element is correct
        } else {
            document.getElementById("element").querySelector("p").textContent = guessYokai.element
            document.getElementById("element").querySelector("p").classList.remove("hidden")
            document.getElementById("element").classList.remove("bg-green-600")
            document.getElementById("element").classList.add("bg-red-600")
            //case if the element is incorrect
        }
        if (guessYokai.tribu === Yokaimystere.tribu) {
            document.getElementById("tribu").querySelector("p").classList.remove("hidden")
            document.getElementById("tribu").querySelector("p").textContent = guessYokai.tribu
            document.getElementById("tribu").classList.remove("bg-red-600")
            document.getElementById("tribu").classList.add("bg-green-600")
            //case if the tribe is correct
        } else {
            document.getElementById("tribu").querySelector("p").textContent = guessYokai.tribu
            document.getElementById("tribu").querySelector("p").classList.remove("hidden")
            document.getElementById("tribu").classList.remove("bg-green-600")
            document.getElementById("tribu").classList.add("bg-red-600")
            //case if the tribe is incorrect
        }
        if (guessYokai.role === Yokaimystere.role) {
            document.getElementById("role").querySelector("p").classList.remove("hidden")
            document.getElementById("role").querySelector("p").textContent = guessYokai.role
            document.getElementById("role").classList.remove("bg-red-600")
            document.getElementById("role").classList.add("bg-green-600")
            //case if the role is correct
        } else {
            document.getElementById("role").querySelector("p").textContent = guessYokai.role
            document.getElementById("role").querySelector("p").classList.remove("hidden")
            document.getElementById("role").classList.remove("bg-green-600")
            document.getElementById("role").classList.add("bg-red-600")
            //case if the role is incorrect
        }
        if (guessYokai.nourriture === Yokaimystere.nourriture) {
            document.getElementById("nourriture").querySelector("p").classList.remove("hidden")
            document.getElementById("nourriture").querySelector("p").textContent = guessYokai.nourriture
            document.getElementById("nourriture").classList.remove("bg-red-600")
            document.getElementById("nourriture").classList.add("bg-green-600")
            //case if the favourite food is correct
        } else {
            document.getElementById("nourriture").querySelector("p").textContent = guessYokai.nourriture
            document.getElementById("nourriture").querySelector("p").classList.remove("hidden")
            document.getElementById("nourriture").classList.remove("bg-green-600")
            document.getElementById("nourriture").classList.add("bg-red-600")
            //case if the favourite food is incorrect
        }
        if (guessYokai.rarity === Yokaimystere.rarity) {
            document.getElementById("rarity").querySelector("p").classList.remove("hidden")
            document.getElementById("rarity").querySelector("p").textContent = guessYokai.rarity
            document.getElementById("rarity").classList.remove("bg-red-600")
            document.getElementById("rarity").classList.add("bg-green-600")
            //case if the rarity is correct
        } else {
            document.getElementById("rarity").querySelector("p").textContent = guessYokai.rarity
            document.getElementById("rarity").querySelector("p").classList.remove("hidden")
            document.getElementById("rarity").classList.remove("bg-green-600")
            document.getElementById("rarity").classList.add("bg-red-600")
            //case if the rarity is incorrect
        }

    }
    window.checkGuess = checkGuess;

})();