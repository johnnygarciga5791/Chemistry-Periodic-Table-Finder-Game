// -------------------- Element Class --------------------
class Element {
    constructor(atomicNumber, name, symbol, state, atomicMass, TypeMetal) {
        this.atomicNumber = atomicNumber;
        this.name = name;
        this.symbol = symbol;
        this.state = state;
        this.atomicMass = atomicMass;
        this.TypeMetal = TypeMetal;
    }
}

// -------------------- Periodic Table --------------------
const periodicTable = [
    new Element(1, "Hydrogen", "H", "Gas", 1.008, "Nonmetal"),
    new Element(2, "Helium", "He", "Gas", 4.0026, "Noble Gas"),
    new Element(3, "Lithium", "Li", "Solid", 7.0, "Alkali Metal"),
    new Element(4, "Beryllium", "Be", "Solid", 9.012, "Alkaline Earth Metal"),
    new Element(5, "Boron", "B", "Solid", 10.81, "Metalloid"),
    new Element(6, "Carbon", "C", "Solid", 12.011, "Nonmetal"),
    new Element(7, "Nitrogen", "N", "Gas", 14.007, "Nonmetal"),
    new Element(8, "Oxygen", "O", "Gas", 15.999, "Nonmetal"),
    new Element(9, "Fluorine", "F", "Gas", 18.998, "Halogen"),
    new Element(10, "Neon", "Ne", "Gas", 20.180, "Noble Gas"),

    new Element(11, "Sodium", "Na", "Solid", 22.990, "Alkali Metal"),
    new Element(12, "Magnesium", "Mg", "Solid", 24.305, "Alkaline Earth Metal"),
    new Element(13, "Aluminum", "Al", "Solid", 26.982, "Post‑transition Metal"),
    new Element(14, "Silicon", "Si", "Solid", 28.085, "Metalloid"),
    new Element(15, "Phosphorus", "P", "Solid", 30.974, "Nonmetal"),
    new Element(16, "Sulfur", "S", "Solid", 32.06, "Nonmetal"),
    new Element(17, "Chlorine", "Cl", "Gas", 35.45, "Halogen"),
    new Element(18, "Argon", "Ar", "Gas", 39.948, "Noble Gas"),

    new Element(19, "Potassium", "K", "Solid", 39.098, "Alkali Metal"),
    new Element(20, "Calcium", "Ca", "Solid", 40.078, "Alkaline Earth Metal"),

    new Element(24, "Chromium", "Cr", "Solid", 51.996, "Transition Metal"),
    new Element(25, "Manganese", "Mn", "Solid", 54.938, "Transition Metal"),
    new Element(26, "Iron", "Fe", "Solid", 55.845, "Transition Metal"),
    new Element(27, "Cobalt", "Co", "Solid", 58.933, "Transition Metal"),
    new Element(28, "Nickel", "Ni", "Solid", 58.693, "Transition Metal"),
    new Element(29, "Copper", "Cu", "Solid", 63.546, "Transition Metal"),
    new Element(30, "Zinc", "Zn", "Solid", 65.38, "Transition Metal"),

    new Element(35, "Bromine", "Br", "Liquid", 79.904, "Halogen"),
    new Element(36, "Krypton", "Kr", "Gas", 83.798, "Noble Gas"),

    new Element(47, "Silver", "Ag", "Solid", 107.868, "Transition Metal"),
    new Element(48, "Cadmium", "Cd", "Solid", 112.414, "Transition Metal"),
    new Element(49, "Indium", "In", "Solid", 114.818, "Post‑transition Metal"),
    new Element(50, "Tin", "Sn", "Solid", 118.710, "Post‑transition Metal"),
    new Element(51, "Antimony", "Sb", "Solid", 121.760, "Metalloid"),
    new Element(53, "Iodine", "I", "Solid", 126.904, "Halogen"),

    new Element(55, "Cesium", "Cs", "Solid", 132.905, "Alkali Metal"),
    new Element(56, "Barium", "Ba", "Solid", 137.327, "Alkaline Earth Metal"),

    new Element(74, "Tungsten", "W", "Solid", 183.84, "Transition Metal"),
    new Element(79, "Gold", "Au", "Solid", 196.966, "Transition Metal"),
    new Element(80, "Mercury", "Hg", "Liquid", 200.592, "Transition Metal"),
    new Element(82, "Lead", "Pb", "Solid", 207.2, "Post‑transition Metal"),
    new Element(92, "Uranium", "U", "Solid", 238.0289, "Actinide")
];

// -------------------- Button Helper --------------------
function disableAllButtons(disable) {
    document.getElementById("startQuizBtn").disabled = disable;
    document.getElementById("startMCBtn").disabled = disable;
    document.getElementById("searchBtn").disabled = disable;
    document.getElementById("showAllBtn").disabled = disable;
}

// -------------------- Search Function --------------------
function searchElement() {
    const input = document.getElementById("symbolInput").value.trim().toLowerCase();
    const output = document.getElementById("searchOutput");
    if (!input) { output.innerHTML = "<p>Please enter a search term!</p>"; return; }
    const el = periodicTable.find(e =>
        e.symbol.toLowerCase() === input ||
        e.name.toLowerCase() === input ||
        e.atomicNumber.toString() === input
    );
    if (el) {
        output.innerHTML = `<div class="element-box ${el.state.toLowerCase()} ${el.radioactive ? "element-radioactive" : ""}">
            <h3>${el.name} (${el.symbol})</h3>
            <p>Atomic Number: ${el.atomicNumber}</p>
            <p>Atomic Mass: ${el.atomicMass}</p>
            <p>State: ${el.state}</p>
            <p>Element Family: ${el.TypeMetal}</p>
        </div>`;
    } else output.innerHTML = "<p>Element not found!</p>";
    document.getElementById("symbolInput").value = "";
}

function hideExtras() {
    document.getElementById("allElementsOutput").style.display = "none";
    document.getElementById("showAllBtn").textContent = "Show All";
    document.getElementById("searchOutput").innerHTML = "";
}

// -------------------- Input Quiz --------------------
let quizIndex = 0, quizScore = 0, quizQuestions = [];

function startQuiz() {
    hideExtras(); // hide search + all elements
    const allowedTypes = [0, 1];

    quizIndex = 0; quizScore = 0; quizQuestions = [];
    for (let i = 0; i < 10; i++) {
        const element = periodicTable[Math.floor(Math.random() * periodicTable.length)];
        const type = Math.floor(Math.random() * allowedTypes.length);
        quizQuestions.push({ element, type });
    }
    document.getElementById("quizContainer").style.display = "block";
    disableAllButtons(true);
    showQuizQuestion();
}


function showQuizQuestion() {
    if (quizIndex >= quizQuestions.length) {
        document.getElementById("quizQuestion").textContent = "Quiz Over!";
        document.getElementById("quizFeedback").textContent = `Score: ${quizScore} / ${quizQuestions.length}`;
        document.getElementById("quizAnswer").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        disableAllButtons(false);
        return;
    }

    const { element, type } = quizQuestions[quizIndex];
    let questionText;

    if (type === 0) questionText = `Question ${quizIndex + 1} of ${quizQuestions.length}: Symbol of ${element.name}?`;
    //else if (type === 1) questionText = `Question ${quizIndex + 1} of ${quizQuestions.length}: Atomic number of ${element.name}?`;
    //else if (type === 2) questionText = `Question ${quizIndex + 1} of ${quizQuestions.length}: Atomic mass of ${element.name}?  (Round to nearest whole number or any decimal point)`;
    else if (type === 1) questionText = `Question ${quizIndex + 1} of ${quizQuestions.length}: Name of the element with symbol ${element.symbol}?`;


    document.getElementById("quizQuestion").textContent = questionText;
    document.getElementById("quizFeedback").textContent = "";

    const inputField = document.getElementById("quizAnswer");
    inputField.style.display = "inline";
    inputField.value = "";
    inputField.focus();

    document.getElementById("submitBtn").style.display = "inline-block";
    document.getElementById("nextBtn").style.display = "none";
}

function submitAnswer() {
    const answerField = document.getElementById("quizAnswer");
    const answer = answerField.value.trim();
    if (!answer) return;

    const { element, type } = quizQuestions[quizIndex];
    let correct = false;

    if (type === 0) correct = answer.toLowerCase() === element.symbol.toLowerCase();
    //else if (type === 1) correct = answer === element.atomicNumber.toString();
    //else if (type === 2) correct = Math.abs(parseFloat(answer) - element.atomicMass) < 0.01;
    else if (type === 1) correct = answer.toLowerCase() === element.name.toLowerCase();

    let correctAnswer;
    if (type === 0) correctAnswer = element.symbol;
    //else if (type === 1) correctAnswer = element.atomicNumber;
    //else if (type === 2) correctAnswer = element.atomicMass;
    else if (type === 1) correctAnswer = element.name;

    document.getElementById("quizFeedback").textContent = correct
        ? "Correct! ✅"
        : `Incorrect ❌ the correct answer is: ${correctAnswer}`;

    if (correct) quizScore++;

    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "inline-block";
}

function nextQuestion() {
    quizIndex++;
    showQuizQuestion();
}

// Enter key support
document.getElementById("quizAnswer").addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitAnswer();
});

function nextQuestion() {
    quizIndex++;
    showQuizQuestion();
}

// Enter key support
document.getElementById("quizAnswer").addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitAnswer();
});





// -------------------- Multiple Choice Quiz --------------------
let mcQuizIndex = 0, mcQuizScore = 0, mcQuizQuestions = [], selectedMCOption = null, currentCorrectAnswer = "", currentType = 0;

function startMultipleChoiceQuiz() {
    hideExtras(); // hide search + all elements

    const AllowesTypes = [0, 1];

    mcQuizIndex = 0; mcQuizScore = 0; mcQuizQuestions = [];
    for (let i = 0; i < 10; i++) {
        const element = periodicTable[Math.floor(Math.random() * periodicTable.length)];
        const type = AllowesTypes[Math.floor(Math.random() * AllowesTypes.length)]; // 0=symbol,1=number,2=mass,3=name
        mcQuizQuestions.push({ element, type });
    }

    document.getElementById("mcQuizContainer").style.display = "block";
    disableAllButtons(true);
    showMCQuestion();
}

function showMCQuestion() {
    if (mcQuizIndex >= mcQuizQuestions.length) {
        document.getElementById("mcQuizQuestion").textContent = "Quiz Over!";
        document.getElementById("mcQuizFeedback").textContent = `Score: ${mcQuizScore} / ${mcQuizQuestions.length}`;
        document.getElementById("mcOptions").innerHTML = "";
        document.getElementById("mcSubmitBtn").style.display = "none";
        document.getElementById("nextMCBtn").style.display = "none";
        disableAllButtons(false);
        return;
    }

    selectedMCOption = null;
    const { element, type } = mcQuizQuestions[mcQuizIndex];
    currentType = type;

    let questionText = "", correctAnswer = "";

    if (type === 0) {
        questionText = `Question ${mcQuizIndex + 1}: Symbol of ${element.name}?`;
        correctAnswer = element.symbol;
    } else {
        // type === 1
        questionText = `Question ${mcQuizIndex + 1}: Name of the element with symbol ${element.symbol}?`;
        correctAnswer = element.name;
    } // delete later

    /*switch (type) {
        case 0:
            questionText = `Question ${mcQuizIndex + 1}: Symbol of ${element.name}?`;
            correctAnswer = element.symbol;
            break;
         case 1:
             questionText = `Question ${mcQuizIndex + 1}: Atomic number of ${element.name}?`;
             correctAnswer = element.atomicNumber.toString();
             break;
         case 2:
             questionText = `Question ${mcQuizIndex + 1}: Atomic mass of ${element.name}?`;
             correctAnswer = element.atomicMass.toString();
             break;
             
        case 1:
            questionText = `Question ${mcQuizIndex + 1}: Name of the element with symbol ${element.symbol}?`;
            correctAnswer = element.name;
            break;
    }*/

    currentCorrectAnswer = correctAnswer;

    // Generate options
    let options = [correctAnswer];
    while (options.length < 4) {
        const randEl = periodicTable[Math.floor(Math.random() * periodicTable.length)];
        //let opt;
        let opt = type === 0 ? randEl.symbol : randEl.name;
        if (!options.includes(opt)) options.push(opt);

        /*switch (type) {
            case 0: opt = randEl.symbol; break;
            case 1: opt = randEl.atomicNumber.toString(); break;
            case 2: opt = randEl.atomicMass.toString(); break;
            case 1: opt = randEl.name; break;
        */
        if (!options.includes(opt)) options.push(opt);
    }

    options.sort(() => Math.random() - 0.5);

    // Display options
    const optionsDiv = document.getElementById("mcOptions");
    optionsDiv.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectMCOption(btn, opt);
        btn.classList.remove("selected");
        btn.disabled = false;
        optionsDiv.appendChild(btn);
    });

    document.getElementById("mcQuizQuestion").textContent = questionText;
    document.getElementById("mcQuizFeedback").textContent = "";
    document.getElementById("mcSubmitBtn").style.display = "inline-block";
    document.getElementById("nextMCBtn").style.display = "none";
}


function selectMCOption(button, opt) {
    selectedMCOption = opt;
    document.querySelectorAll("#mcOptions button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

function submitMCAnswer() {
    if (!selectedMCOption) return;
    document.querySelectorAll("#mcOptions button").forEach(btn => btn.disabled = true);
    let isCorrect = false;
    if (currentType === 2) { if (Math.abs(parseFloat(selectedMCOption) - parseFloat(currentCorrectAnswer)) <= 1) isCorrect = true; }
    else { if (selectedMCOption === currentCorrectAnswer) isCorrect = true; }
    document.getElementById("mcQuizFeedback").textContent = isCorrect ? "Correct✅" : `Incorrect❌! the correct answer is: ${currentCorrectAnswer}`;
    if (isCorrect) mcQuizScore++;
    document.getElementById("mcSubmitBtn").style.display = "none";
    document.getElementById("nextMCBtn").style.display = "inline";
}

function nextMCQuestion() { mcQuizIndex++; showMCQuestion(); }

// -------------------- Show All Elements --------------------
function toggleAllElements() {
    const output = document.getElementById("allElementsOutput");
    const button = document.getElementById("showAllBtn");

    if (output.style.display === "none" || output.style.display === "") {
        // Show all elements
        output.style.display = "block";
        button.textContent = "Hide All";

        // Generate the HTML for all elements
        output.innerHTML = periodicTable.map(el => `
            <div class="element-box ${el.state.toLowerCase()} ${el.radioactive ? "element-radioactive" : ""}">
                <h3>${el.name} (${el.symbol})</h3>
                <p>Atomic Number: ${el.atomicNumber}</p>
                <p>Atomic Mass: ${el.atomicMass}</p>
                <p>State: ${el.state}</p>
                <p>Element Family: ${el.TypeMetal}</p>
            </div>
        `).join("");
    } else {
        // Hide them again
        output.style.display = "none";
        button.textContent = "Show All";
    }
}
