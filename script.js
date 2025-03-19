// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", () => {
    updateTable(); // 最初のテーブル更新

    // 更新ボタンのクリックに反応
    const updateButton = document.querySelector("#update-button");
    updateButton.addEventListener("click", updateTable);
});

// CSVを読み込む関数
async function loadCSV(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
}

// CSVをパースする関数
function parseCSV(csvText) {
    const rows = csvText.split("\n").map(row => row.split(","));
    return rows;
}

// テーブルを生成する関数
function populateTable(data) {
    const tableBody = document.querySelector("#schedule-table tbody");
    tableBody.innerHTML = ""; // 初期化

    // 1行目（ヘッダー）はスキップ
    data.slice(1).forEach(row => {
        if (row.length < 5) return; // データ不足の行はスキップ

        const status = row[4]?.trim() || ""; // 状態列を取得

        // 状態が「非参照」の場合は処理をスキップ
        if (status === "非参照") return;

        const tr = document.createElement("tr");

        // 状態によるスタイル変更 (UIには表示しない)
        if (status === "終了済") {
            tr.style.textDecoration = "line-through"; // 終了: 取り消し線
            tr.style.backgroundColor = ""; // 背景色変更なし
        } else if (status === "進行中") {
            tr.style.backgroundColor = "#ffe4b5"; // 進行中: 背景色変更
        }

        // 4列分 (状態は省略)
        for (let i = 0; i < 4; i++) {
            const td = document.createElement("td");
            td.textContent = row[i]?.trim() || ""; // 内容をセット
            tr.appendChild(td);
        }

        tableBody.appendChild(tr);
    });
}

// テーブルを更新する関数 (ボタン用)
async function updateTable() {
    try {
        const csvText = await loadCSV("https://docs.google.com/spreadsheets/d/e/2PACX-1vSJ_pdzvwNGa2bAbXCQ3hzDokTq0v33n4NROmEt6fD0W2WGgZQBYtsEvzdx4ZKtCHcsCkeG2GOvmpxf/pub?gid=914423484&single=true&output=csv"); // 最新CSVを読み込む
        const data = parseCSV(csvText); // パース
        populateTable(data); // テーブル更新
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", () => {
    updateTable(); // 最初のテーブル更新

    // 更新ボタンのクリックに反応
    const updateButton = document.querySelector("#update-button");
    updateButton.addEventListener("click", updateTable);
});