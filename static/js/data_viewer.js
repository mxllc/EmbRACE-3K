const ACTION_COLORS = {
    "MoveForward": "#388E3C",
    "MoveBackward": "#388E3C",
    "JumpForward": "#388E3C",
    "TurnLeft": "#7C4DFF",
    "TurnRight": "#7C4DFF",
    "LookUp": "#EA80FC",
    "LookDown": "#EA80FC",
    "LookBack": "#EA80FC",
    "LookHand": "#EA80FC",
    "OpenDoor": "#E64A19",
    "PickObject": "#E64A19",
    "DropObject": "#E64A19",
    "Finish": "#FBC02D",
    "MidwayTarget": "#29B6F6"
};

let currentStep = 0;
let thinkingList = [];
let imageList = [];
let actionList = [];
let taskText = "";
let basePath = "";

function updateDisplay() {
    const img = document.getElementById("step-image");
    const stepText = document.getElementById("step-id");
    const actionBox = document.getElementById("action-box");
    const thinkingBox = document.getElementById("thinking-box");

    img.src = `${basePath}/${imageList[currentStep]}`;
    stepText.innerHTML = `
        <span style="font-size:20px; font-weight:bold; color:purple;">Step:</span>
        <span style="font-size:22px; ">${currentStep}</span>`;

    const action = actionList[currentStep];
    const color = ACTION_COLORS[action] || "#999";
    actionBox.innerHTML = `<span style="font-size:20px; font-weight:bold; color:#40C4FF;">Action:</span> <span style="font-size:20px; color:${color};">${action}</span>`;

    thinkingBox.innerHTML = `<span style="font-size:20px; font-weight:bold; color:#FFB300;">Thinking:</span> <span style="font-size:18px;">${thinkingList[currentStep]}</span>`;

    document.getElementById("prev-step").disabled = currentStep === 0;
    document.getElementById("next-step").disabled = currentStep === imageList.length - 1;
}

function loadData(taskType, taskItem) {
    basePath = `static/data/${taskType}/${taskItem}`;
    fetch(`${basePath}/infos.json`)
        .then(r => r.json())
        .then(infos => {
            taskText = infos.Instruction || "No instruction found";
            document.getElementById("instruction").innerHTML =
                `<span style="font-size:26px; font-weight:bold; color:#444;">Instruction:</span> ` +
                `<span style="font-size:26px; font-weight:bold; color:#FF5722;">${taskText}</span>`;
        });

    fetch(`${basePath}/gemini.json`)
        .then(r => r.json())
        .then(data => {
            currentStep = 0;
            imageList = data.map(e => e.image_name);
            thinkingList = data.map(e => e.thinking);
            actionList = data.map(e => e.action);
            updateDisplay();
        });
}

document.getElementById("task-type").addEventListener("change", () => {
    const selectedType = document.getElementById("task-type").value;
    fetch("static/data/index.json")
        .then(r => r.json())
        .then(indexData => {
            const taskItemSelect = document.getElementById("task-item");
            taskItemSelect.innerHTML = "";
            (indexData[selectedType] || []).forEach(item => {
                const opt = document.createElement("option");
                opt.value = item;
                opt.textContent = item;
                taskItemSelect.appendChild(opt);
            });
            taskItemSelect.dispatchEvent(new Event("change"));
        });
});

document.getElementById("task-item").addEventListener("change", () => {
    const type = document.getElementById("task-type").value;
    const item = document.getElementById("task-item").value;
    loadData(type, item);
});

document.getElementById("prev-step").addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        updateDisplay();
    }
});
document.getElementById("next-step").addEventListener("click", () => {
    if (currentStep < imageList.length - 1) {
        currentStep++;
        updateDisplay();
    }
});

// 初始化下拉框
fetch("static/data/index.json")
    .then(r => r.json())
    .then(indexData => {
        const taskTypeSelect = document.getElementById("task-type");
        for (const type in indexData) {
            const opt = document.createElement("option");
            opt.value = type;
            opt.textContent = type;
            taskTypeSelect.appendChild(opt);
        }
        taskTypeSelect.dispatchEvent(new Event("change"));
    });

console.log("页面加载成功");