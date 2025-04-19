// /src/js/matchLogic.js

const courseKeywordMap = {
  "MATH 0220": ["integration", "u-substitution", "calculus"],
  "CS 1666": ["sprites", "animation", "game loop"], 
  "CS 449": ["kernel", "interrupt", "virtual memory"]
};

const videoFiles = [
  "videos/integration_basics.html",
  "videos/integration_by_parts.html",
  "videos/linear_regression.html",
  "videos/game_design_intro.html",
  "videos/kernel_architecture.html"
];

async function runMatchLogic(courseName) {
  const syllabusKeywords = courseKeywordMap[courseName] || [];
  const matches = [];

  for (const file of videoFiles) {
    try {
      const res = await fetch(file);
      const text = await res.text();
      const lowerText = text.toLowerCase();

      if (syllabusKeywords.some(keyword => lowerText.includes(keyword))) {
        const titleMatch = text.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : file;

        matches.push({ url: file, title });
      }
    } catch (err) {
      console.error(`Could not read ${file}:`, err);
    }
  }

  localStorage.setItem("recommendedVideos", JSON.stringify(matches));
  window.location.href = "home.html";
}
