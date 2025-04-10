// matchLogic.js

// Simulating syllabus keywords (e.g., from parsed upload1)
const syllabusKeywords = ["integration", "u-substitution", "calculus"];

// Load videos from videos.html and match them
async function findMatchingVideos() {
  const response = await fetch('videos.html');
  const text = await response.text();

  // Create a DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  const videoItems = doc.querySelectorAll('li');
  const matches = [];

  videoItems.forEach(item => {
    const keywords = item.getAttribute('data-keywords').split(',').map(k => k.trim().toLowerCase());

    if (syllabusKeywords.some(k => keywords.includes(k))) {
      const link = item.querySelector('a').getAttribute('href');
      matches.push(link);
    }
  });

  // Save matches to use in live display
  localStorage.setItem('recommendedVideos', JSON.stringify(matches));
  console.log('Matched Videos:', matches);
}

// Run the matching logic
findMatchingVideos();
