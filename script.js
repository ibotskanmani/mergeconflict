const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxKxEdYztLq7SYUU-nfbvvcuUmgXo8uRJZv7VHuziarIEYaySPMVjT9O-9u-OoI_idUag/exec"
let tableBody = document.getElementById("tableBody");


function loadData() {

    fetch(WEB_APP_URL)
        .then(res => res.json())
        .then(data => {

            tableBody.innerHTML = "";

            data.forEach((row, index) => {

                tableBody.innerHTML += `
                    <tr>
                        <td contenteditable="true">${row[0]}</td>
                        <td contenteditable="true">${row[1]}</td>
                        <td contenteditable="true">${row[2]}</td>
                        <td contenteditable="true">${row[3]}</td>
                        <td contenteditable="true">${row[4]}</td>
                        <td contenteditable="true">${row[5]}</td>
                        <td>
                            <button onclick="deleteRow(this)">Delete</button>
                        </td>
                    </tr>
                `;

            });

        })
        .catch(err => console.log("Load Error:", err));
}


function addRow() {

    let rowCount = tableBody.rows.length + 1;

    let row = tableBody.insertRow();

    row.innerHTML = `
        <td contenteditable="true">${rowCount}</td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
}

function saveData() {

    let rows = document.querySelectorAll("#tableBody tr");

    let data = [];

    rows.forEach(row => {

        let cells = row.querySelectorAll("td");

        data.push({
            serialNo: cells[0].innerText.trim(),
            id: cells[1].innerText.trim(),
            name: cells[2].innerText.trim(),
            email: cells[3].innerText.trim(),
            designation: cells[4].innerText.trim(),
            salary: cells[5].innerText.trim()
        });

    });

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "save",
            payload: data
        })
    })
    .then(res => res.text())
    .then(msg => {
        alert("Saved Successfully ");
        loadData();
    })
    .catch(err => {
        console.log("Save Error:", err);
    });
}



function getRowData(row) {

    let cells = row.querySelectorAll("td");

    return {
        serialNo: cells[0].innerText.trim(),
        id: cells[1].innerText.trim(),
        name: cells[2].innerText.trim(),
        email: cells[3].innerText.trim(),
        designation: cells[4].innerText.trim(),
        salary: cells[5].innerText.trim()
    };
}


function deleteRow(btn) {

    let row = btn.parentElement.parentElement;

    row.remove();

    updateSerialNumbers();
}



function updateSerialNumbers() {

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1;
    });
}






window.onload = function () {
    loadData();
};