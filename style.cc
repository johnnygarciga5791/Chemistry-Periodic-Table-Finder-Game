body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f9f9f9;
    color: #333;
}

h1 {
    text-align: center;
    color: #2c3e50;
}

h2 {
    color: #34495e;
    margin-top: 30px;
}

/* Search section */
#searchContainer {
    text-align: left;
}

/* Make search box longer */
#symbolInput {
    padding: 10px;
    width: 500px;        /* ✅ Long enough for placeholder */
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-right: 10px;
}

/* Buttons */
button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background-color: #2980b9;
}

/* Element output box */
.element-box {
    margin-top: 10px;
    padding: 10px;
    border-radius: 6px;
}

/* States */
.solid { background-color: #ffe0b2; }
.liquid { background-color: #d1c4e9; }
.gas { background-color: #e0f7fa; }

/* Quiz container */
#quizContainer {
    margin-top: 20px;
    padding: 15px;
    background-color: #dff9fb;
    border: 1px solid #7ed6df;
    border-radius: 6px;
}
