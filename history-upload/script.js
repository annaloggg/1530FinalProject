// Wait for the DOM to be fully loaded
var courseURL = new URL("http://localhost:8000/Courses");
document.addEventListener("DOMContentLoaded", () => {
    const containerBody = document.querySelector(".container-body")

    // Show loading state
    containerBody.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <span>Loading courses...</span>
      </div>
    `

    // Fetch the db.json file
    fetch("../db.json")
        .then((response) => {
            // Check if the response is ok
            if (!response.ok) {
                throw new Error("Failed to load course data")
            }
            return response.json()
        })
        .then((data) => {
            // Clear the loading state
            containerBody.innerHTML = ""
            console.log(data["Courses"])
            // Check if we have courses
            if (data["Courses"] && data["Courses"].length > 0) {
                // Create a container for the course grid
                const coursesGrid = document.createElement("div")
                coursesGrid.className = "courses-grid"

                // Loop through each course and create a card
                data["Courses"].forEach((course) => {
                    const courseCard = document.createElement("div")
                    courseCard.className = "course-card"

                    // Create the course code element
                    const courseCode = document.createElement("div")
                    courseCode.className = "course-code"
                    courseCode.textContent = `${course.Subject} ${course.CourseCode}`

                    // Create the course name element
                    const courseName = document.createElement("div")
                    courseName.className = "course-name"
                    courseName.textContent = course.CourseName

                    // Add the elements to the card
                    courseCard.appendChild(courseCode)
                    courseCard.appendChild(courseName)

                    // Add click event to view syllabus
                    courseCard.addEventListener("click", () => {
                        // You can implement navigation to a syllabus detail page
                        // or show a modal with the syllabus content
                        viewSyllabus(course)
                    })

                    // Add the card to the grid
                    coursesGrid.appendChild(courseCard)
                })

                // Add the grid to the container
                containerBody.appendChild(coursesGrid)
            } else {
                // Show empty state if no courses
                showEmptyState()
            }
        })
        .catch((error) => {
            console.error("Error fetching course data:", error)
            // Show error message
            containerBody.innerHTML = `
          <div class="error-message">
            <p>Failed to load courses. Please try again later.</p>
            <p>${error.message}</p>
          </div>
        `
        })

    // Function to show empty state
    function showEmptyState() {
        containerBody.innerHTML = `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <p>No courses available</p>
          <p><a href="../syllabus-uploader/upload-syllabus.html">Upload a syllabus to get started</a></p>
        </div>
      `
    }

    // Function to handle viewing a syllabus
    function viewSyllabus(course) {
        window.location.href = `../syllabus-detail/syllabus-detail.html?id=${course.id}`
    }
}
)

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

async function httpPostRequest(theUrl, newBlog) {
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


