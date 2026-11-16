let score = 0;
let shotCount = 0;
let totalPoint = 0;

let targetScore = 10;

let historyData = [];

let points = {
    X: 1,
    "10": 1,
    "9": 0,
    "8": 0,
    "7": 0,
    "6": -1,
    "5": -1,
    "4": -1,
    "3": -1,
    "2": -1,
    "1": -1,
    M: -1
};

let hitCount = {
    X: 0,
    "10": 0,
    "9": 0,
    "8": 0,
    "7": 0,
    "6": 0,
    "5": 0,
    "4": 0,
    "3": 0,
    "2": 0,
    "1": 0,
    M: 0
};

function addShot(shot, actualScore) {

    score += points[shot];
    shotCount++;
    totalPoint += actualScore;

    hitCount[shot]++;

    historyData.push({
        shot: shot,
        gamePoint: points[shot],
        actualScore: actualScore
    });

    updateDisplay();

    if (score >= targetScore) {
        showResultScreen();
    }
}

function undoShot() {

    if (historyData.length === 0) {
        return;
    }

    const lastShot = historyData.pop();

    score -= lastShot.gamePoint;
    totalPoint -= lastShot.actualScore;
    shotCount--;

    hitCount[lastShot.shot]--;

    updateDisplay();
}

function updateDisplay() {

    document.getElementById("score").textContent =
        "現在スコア : " + score;

    document.getElementById("target").textContent =
        targetScore;

    document.getElementById("shotCount").textContent =
        shotCount;

    const history =
        document.getElementById("history");

    history.innerHTML = "";

    for (let i = 0; i < historyData.length; i++) {

        const item =
            document.createElement("div");

        item.className = "history-item";

        let pointText =
            historyData[i].gamePoint;

        if (pointText > 0) {
            pointText = "+" + pointText;
        }

        item.innerHTML =
            "<span>" +
            historyData[i].shot +
            "</span>" +
            "<span class='history-point'>" +
            pointText +
            "</span>";

        history.appendChild(item);
    }

    history.scrollTop =
        history.scrollHeight;
}

function toggleSettings() {

    const settings =
        document.getElementById("settings");

    if (settings.style.display === "block") {
        settings.style.display = "none";
    } else {
        settings.style.display = "block";
    }
}

function saveSettings() {

    targetScore =
        Number(document.getElementById("targetInput").value);

    points.X =
        Number(document.getElementById("pointX").value);

    points["10"] =
        Number(document.getElementById("point10").value);

    points["9"] =
        Number(document.getElementById("point9").value);

    points["8"] =
        Number(document.getElementById("point8").value);

    points["7"] =
        Number(document.getElementById("point7").value);

    points["6"] =
        Number(document.getElementById("point6").value);

    points["5"] =
        Number(document.getElementById("point5").value);

    points["4"] =
        Number(document.getElementById("point4").value);

    points["3"] =
        Number(document.getElementById("point3").value);

    points["2"] =
        Number(document.getElementById("point2").value);

    points["1"] =
        Number(document.getElementById("point1").value);

    points.M =
        Number(document.getElementById("pointM").value);

    updateDisplay();

    toggleSettings();
}

function resetAll() {

    score = 0;
    shotCount = 0;
    totalPoint = 0;

    historyData = [];

    for (let key in hitCount) {
        hitCount[key] = 0;
    }

    updateDisplay();
}

function showResultScreen() {

    document.getElementById("gameScreen").style.display =
        "none";

    document.getElementById("resultScreen").style.display =
        "block";

    const average =
        totalPoint / shotCount;

    const score72 =
        Math.round(average * 72);

    const goldRate =
        (
            (
                hitCount["X"] +
                hitCount["10"] +
                hitCount["9"]
            ) / shotCount
        ) * 100;

    document.getElementById("resultShots").textContent =
        "射数 : " + shotCount;

    document.getElementById("resultAverage").textContent =
        "平均点 : " + average.toFixed(2);

    document.getElementById("result72").textContent =
        "72射換算 : " + score72;

    document.getElementById("resultGold").textContent =
        "ゴールド率 : " + goldRate.toFixed(1) + "%";

    let resultText = "";

    const order = [
        "X",
        "10",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
        "1",
        "M"
    ];

    for (let i = 0; i < order.length; i++) {

        const key = order[i];

        resultText +=
            key +
            "数 : " +
            hitCount[key] +
            "<br>";
    }

    document.getElementById("resultCounts").innerHTML =
        resultText;
}

function restartGame() {

    score = 0;
    shotCount = 0;
    totalPoint = 0;

    historyData = [];

    for (let key in hitCount) {
        hitCount[key] = 0;
    }

    document.getElementById("resultScreen").style.display =
        "none";

    document.getElementById("gameScreen").style.display =
        "block";

    updateDisplay();
}

updateDisplay();
