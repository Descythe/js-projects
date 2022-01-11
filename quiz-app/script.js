const quiz = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "Florin Pop",
        b: "Donald Trump",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const answerElements = document.querySelectorAll(".answer"),
    a_text = document.getElementById("a_text"),
    b_text = document.getElementById("b_text"),
    c_text = document.getElementById("c_text"),
    d_text = document.getElementById("d_text");

let currentQuiz = 0,
    score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quiz[currentQuiz];

    document.getElementById("question").innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerElements.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerElements.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

document.getElementById("submit").addEventListener("click", () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quiz[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quiz.length) {
            loadQuiz();
        } else {
            document.getElementById("quiz").innerHTML = `
                <h2>You answered correctly at ${score}/${quiz.length} questions.</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});
