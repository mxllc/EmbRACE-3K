function updateBaselineVideos() {
  const type = document.getElementById("baseline-type").value;

  document.getElementById("gpt-video").src = `static/baselines/${type}/gpt.mp4`;
  document.getElementById("gemini-video").src = `static/baselines/${type}/gemini.mp4`;
  document.getElementById("qwen-video").src = `static/baselines/${type}/qwen.mp4`;
  document.getElementById("qwenft-video").src = `static/baselines/${type}/qwen_ft.mp4`;

  // 重新加载视频
  document.getElementById("gpt-video").load();
  document.getElementById("gemini-video").load();
  document.getElementById("qwen-video").load();
  document.getElementById("qwenft-video").load();
}
