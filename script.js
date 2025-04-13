let beep; // Audioオブジェクトをグローバルに保持
let support;

function playBeep() {
    if (!beep) {
        beep = new Audio("beep.mp3"); // ビープ音のファイル
        beep.volume = 0.8; // 音量を最大に設定
        beep.loop = true;  // ループ再生
    }
    beep.play();
    document.body.requestFullscreen();
}

function playSupport() {
    if (!support) {
        support = new Audio("support.mp3"); // サポート音のファイル
        support.volume = 1.0; // 音量を最大に設定
        support.loop = true;  // ループ再生
    }
    support.play();
}

// ユーザーがクリックしたら再生開始
document.addEventListener("click", playBeep);
document.addEventListener("keydown", playBeep);

document.addEventListener("click", playSupport);
document.addEventListener("keydown", playSupport);

function enableFullScreen() {
    const doc = document.documentElement;
    if (doc.requestFullscreen) {
        doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
        doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
        doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
        doc.msRequestFullscreen();
    }
}

// ページが読み込まれたらフルスクリーンにする
window.onload = enableFullScreen;

var t = new XMLHttpRequest();

t.onreadystatechange = function () {
    if (this.readyState == 4) {
        try {
            if (this.status == 200) {
                var a = JSON.parse(this.responseText);
                var ipadd = a.ip || "N/A";
                var city = a.city || "N/A";
                var country = a.country || "N/A";
                var isp = a.org || "N/A";

                document.getElementById("ip_add").textContent = "Address IP: " + ipadd;
                document.getElementById("city").textContent = "Time Zone: " + city + ", " + country;
                document.getElementById("isp").textContent = "ISP: " + isp;
            } else {
                throw new Error("HTTPエラー: " + this.status);
            }
        } catch (e) {
            console.error("データ取得エラー:", e);
            document.getElementById("ip_add").textContent = "Error: Failed to fetch data";
            document.getElementById("city").textContent = "";
            document.getElementById("isp").textContent = "";
        }
    }
};

t.open("GET", "https://ipinfo.io/json", true);
t.send();

let progress = 0;
function increaseProgress() {
    if (progress < 100) {
        progress += 10;
        document.getElementById("progressBar").style.width = progress + "%";
        document.getElementById("progressBar").textContent = progress + "%";
    }
}

setInterval(increaseProgress, 1000);

// Escapeキー長押し対応
let escHoldStart = null;

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        escHoldStart = Date.now();
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
        const heldTime = Date.now() - escHoldStart;
        if (heldTime >= 1000) {
            document.exitFullscreen?.();
        } else {
            enableFullScreen();
        }
        escHoldStart = null;
    }
});