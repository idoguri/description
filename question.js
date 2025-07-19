const allQuestions = [
    {
        question: "日本の首都はどこですか？",
        modelAnswer: "東京"
    },
    {
        question: "1たす1は？",
        modelAnswer: "2"
    },
    {
        question: "日本の通貨は？",
        modelAnswer: "円"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let results = [];

function startQuiz() {
    currentQuestionIndex = 0;
    results = [];
    shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 3);

    document.getElementById("startContainer").style.display = "none";
    document.getElementById("finalResultContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";

    showQuestion();
}

function showQuestion() {
    const q = shuffledQuestions[currentQuestionIndex];
    document.getElementById("questionText").textContent = q.question;
    const userInput = document.getElementById("userAnswer");
    userInput.value = "";
    userInput.focus();

    document.getElementById("quizContainer").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("finalResultContainer").style.display = "none";

    // ボタン文言を「次の問題へ」に
    document.getElementById("submitBtn").textContent = "次の問題へ";
}

function submitAnswer() {
    const rawAnswer = document.getElementById("userAnswer").value.trim();
    if (rawAnswer === "") {
        alert("解答を入力してください。");
        return;
    }

    results.push({
        question: shuffledQuestions[currentQuestionIndex].question,
        user: rawAnswer,
        modelAnswer: shuffledQuestions[currentQuestionIndex].modelAnswer || "模範解答なし"
    });

    showSingleResult();
}

function showSingleResult() {
    document.getElementById("quizContainer").style.display = "none";
    const resultDiv = document.getElementById("singleResult");

    const last = results[results.length - 1];

    resultDiv.innerHTML = `
        <p><strong>問題:</strong> ${last.question}</p>
        <p><strong>あなたの回答:</strong> ${last.user}</p>
        <p><strong>模範解答例:</strong> ${last.modelAnswer}</p>
    `;

    document.getElementById("resultContainer").style.display = "block";

    document.getElementById("nextButton").textContent = currentQuestionIndex + 1 < shuffledQuestions.length ? "次の問題へ" : "終了";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("finalResultContainer").style.display = "block";

    document.getElementById("score").textContent = `全${results.length}問の回答履歴`;

    const listDiv = document.getElementById("resultList");
    listDiv.innerHTML = "";

    results.forEach((res, i) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>問題 ${i + 1}:</strong> ${res.question}<br>
            <strong>あなたの回答:</strong> ${res.user}<br>
            <strong>模範解答例:</strong> ${res.modelAnswer}
        `;
        listDiv.appendChild(div);
    });

    document.getElementById("retryButton").textContent = "最初からやり直す";
}

function restartQuiz() {
    document.getElementById("finalResultContainer").style.display = "none";
    document.getElementById("startContainer").style.display = "block";
}