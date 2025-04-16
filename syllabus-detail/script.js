var courseURL = new URL("http://localhost:8000/Courses");
document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const courseTitle = document.getElementById("course-title")
    const courseSubtitle = document.getElementById("course-subtitle")
    const loadingIndicator = document.getElementById("loading-indicator")
    const syllabusContent = document.getElementById("syllabus-content")
    const errorMessage = document.getElementById("error-message")
  
    // Get the course ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const courseId = urlParams.get("id")
  
    if (!courseId) {
      // No course ID provided, show error
      showError("No course ID provided")
      return
    }
  
    // Fetch the course data from db.json
    fetch("../db.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load course data")
        }
        return response.json()
      })
      .then((data) => {
        // Find the course with the matching ID
        retrieveAndDisplayOneCourse(courseId).then((course)=>{
            console.log(course)
            if (!course) {
                throw new Error("Course not found")
              }
        
              // Update the page with course information
              displayCourseInfo(course)
        });
      })
      .catch((error) => {
        console.error("Error fetching course data:", error)
        showError(error.message)
      })
  
    function displayCourseInfo(course) {
      // Update the page title
      document.title = `${course.Subject} ${course.CourseCode} - Syllabus`
  
      // Update the course title and subtitle
      courseTitle.textContent = `${course.Subject} ${course.CourseCode}: ${course.CourseName}`
      courseSubtitle.textContent = "Syllabus Content"
  
      // Hide loading indicator
      loadingIndicator.classList.add("hidden")
  
      // Display syllabus content
      if (course.SyllabusContent && course.SyllabusContent.trim() !== "") {
        syllabusContent.innerHTML = formatSyllabusContent(course.SyllabusContent)
        syllabusContent.classList.remove("hidden")
      } else {
        // Show a message if no content is available
        syllabusContent.innerHTML = `
                  <div class="empty-content">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                          <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                      <p>No syllabus content available for this course.</p>
                      <p>You can upload content using the Syllabus Uploader.</p>
                  </div>
              `
        syllabusContent.classList.remove("hidden")
      }
    }
  
    function formatSyllabusContent(content) {
      // This function formats the syllabus content for display
      // You can enhance this to handle different formats, parse markdown, etc.
  
      // Basic formatting: convert newlines to <br> tags and preserve whitespace
      const formattedContent = content.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
  
      // Wrap the content in a div with appropriate styling
      return `<div class="content-text">${formattedContent}</div>`
    }
  
    function showError(message) {
      // Hide loading indicator
      loadingIndicator.classList.add("hidden")
  
      // Update error message
      errorMessage.innerHTML = `
              <p>Failed to load syllabus content.</p>
              <p>${message}</p>
              <a href="../syllabus-uploader/upload-syllabus.html" class="button button-primary">Re-upload a syllabus</a>
          `
  
      // Show error message
      errorMessage.classList.remove("hidden")
    }
  })

  async function retrieveAndDisplayOneCourse(id) {

    let course = await httpGetRequest(`${courseURL}/${id}`);
    return course;
}
  
  async function httpGetRequest(theUrl) {
    return await fetch(theUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
};

async function httpPostRequest(theUrl, newCourse) {
    return await fetch(theUrl, {
        method: 'POST',
        body: JSON.stringify(newBlog),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpPatchRequest(theUrl, updatedField) {
    return await fetch(theUrl, {
        method: 'PATCH',
        body: JSON.stringify(updatedField),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpDeleteRequest(theUrl) {
    return await fetch(theUrl, {
        method: 'DELETE'
    })
        .catch(error => console.error('Error:', error));
}


