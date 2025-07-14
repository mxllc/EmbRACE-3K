async function updateBaselineVideos() {
  const type = document.getElementById("baseline-type").value;

  try {
    const response = await fetch("static/baselines/index.json");
    const indexData = await response.json();

    const models = [
      { name: "gpt", videoId: "gpt-video", labelId: "gpt-label" },
      { name: "gemini", videoId: "gemini-video", labelId: "gemini-label" },
      { name: "qwen", videoId: "qwen-video", labelId: "qwen-label" },
      { name: "qwen_ft", videoId: "qwenft-video", labelId: "qwen_ft-label" }
    ];

    models.forEach(model => {
      const entry = indexData[type]?.[model.name];
      const videoElem = document.getElementById(model.videoId);
      const sourceElem = videoElem.querySelector("source");
      const labelElem = document.getElementById(model.labelId);

      if (entry && entry.file) {
        const videoPath = `static/baselines/${type}/${entry.file}`;
        sourceElem.src = videoPath;
        videoElem.load();

        const speed = entry.speed || 1;
        labelElem.innerText = `x${speed}`;
      } else {
        sourceElem.src = "";
        videoElem.load();
        labelElem.innerText = "x–";
        console.warn(`No video entry for ${model.name} under ${type}`);
      }
    });

  } catch (error) {
    console.error("Failed to load index.json:", error);
  }
}
