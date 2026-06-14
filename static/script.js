// ===============================
// LOAD MODEL INFORMATION
// ===============================

fetch("/model-info")
    .then(response => response.json())
    .then(data => {

        document.getElementById("modelInfo").innerHTML = `
            <h3>Model Information</h3>

            <p><strong>Model:</strong> ${data.model_name}</p>

            <p><strong>Problem Type:</strong> ${data.problem_type}</p>

            <p><strong>Target:</strong> ${data.target}</p>

            <p><strong>Features:</strong> ${data.features}</p>
        `;
    })
    .catch(error => {
        console.error("Error loading model info:", error);
    });


// ===============================
// PREDICT BUTTON
// ===============================

document.getElementById("predictBtn").addEventListener("click", async () => {

    const requiredFields = [
        "V1","V2","V3","V4","V5","V6","V7","V8","V9","V10",
        "V11","V12","V13","V14","V15","V16","V17","V18","V19","V20",
        "V21","V22","V23","V24","V25","V26","V27","V28",
        "scaled_amount","scaled_time"
    ];

    // Validate Inputs
    for (let field of requiredFields) {

        if (document.getElementById(field).value === "") {

            alert("Please fill all fields before prediction.");
            return;
        }
    }

    // Create Request Data
    const data = {
        V1: parseFloat(document.getElementById("V1").value),
        V2: parseFloat(document.getElementById("V2").value),
        V3: parseFloat(document.getElementById("V3").value),
        V4: parseFloat(document.getElementById("V4").value),
        V5: parseFloat(document.getElementById("V5").value),
        V6: parseFloat(document.getElementById("V6").value),

        V7: parseFloat(document.getElementById("V7").value),
        V8: parseFloat(document.getElementById("V8").value),
        V9: parseFloat(document.getElementById("V9").value),
        V10: parseFloat(document.getElementById("V10").value),
        V11: parseFloat(document.getElementById("V11").value),
        V12: parseFloat(document.getElementById("V12").value),

        V13: parseFloat(document.getElementById("V13").value),
        V14: parseFloat(document.getElementById("V14").value),
        V15: parseFloat(document.getElementById("V15").value),
        V16: parseFloat(document.getElementById("V16").value),
        V17: parseFloat(document.getElementById("V17").value),
        V18: parseFloat(document.getElementById("V18").value),

        V19: parseFloat(document.getElementById("V19").value),
        V20: parseFloat(document.getElementById("V20").value),
        V21: parseFloat(document.getElementById("V21").value),
        V22: parseFloat(document.getElementById("V22").value),
        V23: parseFloat(document.getElementById("V23").value),
        V24: parseFloat(document.getElementById("V24").value),

        V25: parseFloat(document.getElementById("V25").value),
        V26: parseFloat(document.getElementById("V26").value),
        V27: parseFloat(document.getElementById("V27").value),
        V28: parseFloat(document.getElementById("V28").value),

        scaled_amount: parseFloat(document.getElementById("scaled_amount").value),
        scaled_time: parseFloat(document.getElementById("scaled_time").value)
    };

    try {

        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        const resultDiv = document.getElementById("result");

        // Fraud Styling
        if (result.class === 1) {

            resultDiv.style.borderLeft = "8px solid red";
            resultDiv.style.backgroundColor = "#ffe6e6";

        } else {

            resultDiv.style.borderLeft = "8px solid green";
            resultDiv.style.backgroundColor = "#e6ffe6";
        }

        resultDiv.innerHTML = `
            <h3>${result.prediction}</h3>

            <p><strong>Class:</strong> ${result.class}</p>

            <p><strong>Fraud Probability:</strong>
            ${(result.fraud_probability * 100).toFixed(2)}%</p>

            <p><strong>Legitimate Probability:</strong>
            ${(result.legitimate_probability * 100).toFixed(2)}%</p>

            <p><strong>Confidence:</strong>
            ${result.confidence_percentage}</p>
        `;

    } catch (error) {

        console.error(error);

        const resultDiv = document.getElementById("result");

        resultDiv.style.backgroundColor = "#ffe6e6";

        resultDiv.innerHTML = `
            <h3 style="color:red;">
                Error occurred while predicting.
            </h3>
        `;
    }
});


// ===============================
// RESET BUTTON
// ===============================

document.getElementById("resetBtn").addEventListener("click", () => {

    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    const resultDiv = document.getElementById("result");

    resultDiv.style.borderLeft = "none";
    resultDiv.style.backgroundColor = "white";

    resultDiv.innerHTML = `
        Prediction Result Will Appear Here
    `;
});