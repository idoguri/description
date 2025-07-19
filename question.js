const allQuestions = [
    { question: "日本の首都はどこですか？", answer: "東京" },
    { question: "1たす1は？", answer: "2" },
    { question: "日本の通貨は？", answer: "円" }
];

let currentQuestionIndex = 0;
let score = 0;
let results = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    results = [];

    document.getElementById("startContainer").style.display = "none";
    document.getElementById("finalResultContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";

    showQuestion();
}

function showQuestion() {
    const q = allQuestions[currentQuestionIndex];
    document.getElementById("questionText").textContent = q.question;
    const userInput = document.getElementById("userAnswer");
    userInput.value = "";
    userInput.focus();

    document.getElementById("quizContainer").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("finalResultContainer").style.display = "none";
}

function submitAnswer() {
    const rawAnswer = document.getElementById("userAnswer").value;
    const normalizedUser = normalize(rawAnswer);
    const normalizedCorrect = normalize(allQuestions[currentQuestionIndex].answer);

    const isCorrect = normalizedUser === normalizedCorrect;
    if (isCorrect) score++;

    results.push({
        question: allQuestions[currentQuestionIndex].question,
        user: rawAnswer,
        correct: allQuestions[currentQuestionIndex].answer,
        isCorrect: isCorrect
    });

    showSingleResult();
}

function showSingleResult() {
    document.getElementById("quizContainer").style.display = "none";
    const resultDiv = document.getElementById("singleResult");

    const last = results[results.length - 1];
    resultDiv.innerHTML = `
        <p><strong>問題:</strong> ${last.question}</p>
        <p><strong>あなたの答え:</strong> ${last.user}</p>
        <p><strong>正解:</strong> ${last.correct}</p>
        <p><strong>結果:</strong> ${last.isCorrect ? "⭕️ 正解" : "❌ 不正解"}</p>
    `;

    document.getElementById("resultContainer").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < allQuestions.length) {
        showQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("finalResultContainer").style.display = "block";

    document.getElementById("score").textContent = `スコア: ${score} / ${results.length}`;

    const listDiv = document.getElementById("resultList");
    listDiv.innerHTML = "";

    results.forEach((res, i) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>問題 ${i + 1}:</strong> ${res.question}<br>
            <strong>あなたの答え:</strong> ${res.user}<br>
            <strong>正解:</strong> ${res.correct}<br>
            <strong>${res.isCorrect ? "⭕️ 正解" : "❌ 不正解"}</strong>
        `;
        listDiv.appendChild(div);
    });
}

function restartQuiz() {
    document.getElementById("finalResultContainer").style.display = "none";
    document.getElementById("startContainer").style.display = "block";
}

// 文字列の正規化処理
function normalize(str) {
    str = str.trim();
    // 記号・句読点・空白類の除去
    str = str.replace(/[()（）「」、。・,.．\s\u3000\-―ー―‐'’"”]/g, "");
    // 全角数字→半角数字
    str = str.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248));
    // 漢数字を数字に変換（簡易）
    str = str.replace(/[一二三四五六七八九〇零十百千]/g, kanjiToNumber);
    // カタカナ→ひらがな
    str = wanakana.toHiragana(str);
    return str;
}

function kanjiToNumber(char) {
    const map = { "一": "1", "二": "2", "三": "3", "四": "4", "五": "5", "六": "6", "七": "7", "八": "8", "九": "9", "〇": "0", "零": "0" };
    return map[char] || char;
}