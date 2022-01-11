const pw = document.getElementById("pw"),
    len = document.getElementById("len"),
    upper = document.getElementById("upper"),
    lower = document.getElementById("lower"),
    number = document.getElementById("number"),
    symbol = document.getElementById("symbol");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerLetters = "abcdefghijklmnopqrstuvwxyz",
    numbers = "0123456789",
    symbols = "!@#$%^&*()_+=";

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    let password = "";

    for (let i = password.length; i < len.value; i++) {
        password += generateCharacter();
    }

    pw.innerText = password;
}

function generateCharacter() {
    const xs = [];

    if (upper.checked) {
        xs.push(getUppercase());
    }

    if (lower.checked) {
        xs.push(getLowercase());
    }

    if (number.checked) {
        xs.push(getNumber());
    }

    if (symbol.checked) {
        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";
    return xs[Math.floor(Math.random() * xs.length)];
}

generatePassword();
document.getElementById("generate").addEventListener("click", generatePassword);

document.getElementById("copy").addEventListener("click", () => {
    navigator.clipboard.writeText(pw.innerText);
});
