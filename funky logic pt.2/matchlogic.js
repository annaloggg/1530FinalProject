// matchLogic.js

const keywordMap = {
  "MATH 0220": ["integration", "calculus"],
  "CS 1542": ["concurrency", "threads", "deadlock"],
  "HIS 1203": ["industrial revolution", "empire", "treaty"]
};

// Point to your folder of video HTMLs
const videoFolder = "videos/";
const videoFiles = [
  "videos/Calculus Optimization - The Fence Problem #shorts #short #calculus copy.html",
  "videos/Calculus Optimization - The Fence Problem #shorts #short #calculus.html",
  "videos/FASTEST way to factor a trinomial! #shorts.html",
  "videos/For Loop in Python.html",
  "videos/History of the USA 🇺🇸🦅.html",
  "videos/Infinite Limit Shortcut!! (Calculus).html",
  "videos/integration by parts trick  #maths #integration.html",
  "videos/integration by parts, the life changing way!!.html",
  "videos/L'Hospital's Rule, Derivative, Limits, Example - Calculus.html",
  "videos/Solving Related Rates Problems, Derivative, Ladder Problem - Calculus.html",
  "videos/The Most Useful Calculus 1 Tip!.html",
  "videos/This is the Most Asked FAANG Interview Question! - Two Sum - Leetcode 1.html",
  "videos/Understand Chain Rule in 39.97 Seconds!.html"

];
async function runMatchLogic(courseCode) {
  console.log("Running match logic for:", courseCode);

  // ✅ FIXED: ensures it doesn't crash if courseCode is invalid
  const keywords = (keywordMap[courseCode] || []).map(k => k.toLowerCase());
  console.log("Filtering with keywords:", keywords);

  const iframes = document.querySelectorAll("iframe");
  console.log("Found iframes:", iframes.length);

  for (const iframe of iframes) {
    try {
      // Wait briefly in case iframe content needs time
      await new Promise(resolve => setTimeout(resolve, 100));

      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const text = doc.body?.innerText?.toLowerCase() || "";

      const matches = keywords.some(kw => text.includes(kw));

      if (!matches) {
        iframe.closest("#video-player").style.display = "none";
      } else {
        iframe.closest("#video-player").style.display = "block";
      }

    } catch (err) {
      console.error("Could not access iframe content:", err);
      iframe.closest("#video-player").style.display = "none";
    }
  }
}


// async function runMatchLogic(courseCode) {
//   console.log("Running match logic for:", courseCode); // ← add this
//   console.log("Course selected:", courseCode);
//   console.log("Keywords:", keywords);
//   console.log("Found iframes:", document.querySelectorAll("iframe").length);

//   const syllabusKeywords = keywordMap[courseCode] || [];
//   const matches = [];

//   for (const file of videoFiles) {
//     try {
//       const res = await fetch(videoFolder + file);
//       const text = await res.text();

//       const lowerText = text.toLowerCase();

//       if (syllabusKeywords.some(keyword => lowerText.includes(keyword))) {
//         const titleMatch = text.match(/<title>(.*?)<\/title>/i);
//         const title = titleMatch ? titleMatch[1] : file;

//         matches.push({ url: `${videoFolder}${file}`, title });
//       }
//     } catch (err) {
//       console.error(`Could not read ${file}:`, err);
//     }
//   }

// localStorage.setItem("recommendedVideos", JSON.stringify(matches));
// window.location.href = "/src/html/home.html";
// // redirect to the same page to  refresh
// window.addEventListener("load", () => runMatchLogic('MATH 0220'));

// }
