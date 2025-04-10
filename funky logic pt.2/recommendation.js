// recommendations.js
//still doesn't work

document.addEventListener("DOMContentLoaded", () => {
  const recommended = JSON.parse(localStorage.getItem('recommendedVideos')) || [];
  const container = document.getElementById("recommended-container");

  if (recommended.length === 0) {
    container.innerHTML = "<p>No related videos found. Try uploading your syllabus again.</p>";
    return;
  }

  recommended.forEach(url => {
    const link = document.createElement("a");
    link.href = url;
    link.textContent = `Watch: ${url.split('/').pop().replace('.html', '').replace(/_/g, ' ')}`;
    link.target = "_blank";

    const div = document.createElement("div");
    div.appendChild(link);
    container.appendChild(div);
  });
});
