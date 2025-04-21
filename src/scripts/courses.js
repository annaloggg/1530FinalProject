var courseURL = new URL("http://localhost:8000/Courses");
document.addEventListener("DOMContentLoaded", () => {
    genCourseCards();
});

function genCourseCards() {

    const course_div = document.getElementById("user-courses");
    course_div.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>Loading courses...</span>
    </div>
  `
    // Fetch the db.json file
    retrieveAndDisplayAllCourseEntries()
        .then((data) => {
            // Clear the loading state
            course_div.innerHTML = ""
            // Check if we have courses
            if (data && data.length > 0) {
                // Create a container for the course grid
                const coursesGrid = document.createElement("div")
                coursesGrid.className = "courses-grid"

                // Loop through each course and create a card
                data.forEach((course) => {
                    const course_card = document.createElement("div");
                    course_card.classList.add("course-card");

                    const course_name = document.createElement("h2");
                    course_name.textContent = `${course.Subject} ${course.CourseCode}`;
                    course_card.appendChild(course_name);

                    const syllabus_div = document.createElement("div");
                    syllabus_div.id = "course-name";

                    const syl_txt = document.createElement("h3");
                    syl_txt.textContent = course.CourseName;

                    const syllabus_name = "";
                    const syl_link = document.createElement("p");
                    syl_link.textContent = syllabus_name;

                    const edit_button = document.createElement("button");
                    edit_button.classList.add("edit-button");
                    edit_button.type = "button";

                    const pencil_icon = document.createElement("img");
                    pencil_icon.src = "/src/assets/pencilIcon.png";
                    pencil_icon.classList.add("pencil-icon");
                    edit_button.appendChild(pencil_icon);

                    syllabus_div.appendChild(syl_txt);
                    syllabus_div.appendChild(syl_link);
                    syllabus_div.appendChild(edit_button);

                    course_card.appendChild(syllabus_div);
                    course_div.appendChild(course_card);
                    syl_txt.addEventListener("click", () => {
                        console.log(course);
                        viewSyllabus(course);
                    })
                    pencil_icon.addEventListener("click", () => {
                        window.location.href = `/syllabus-update/syllabus-update.html?id=${course.id}`
                    })

                })
            }
        }).catch((error) => {
            console.error("Error fetching course data:", error)
            // Show error message
            course_div.innerHTML = `
          <div class="error-message">
            <p>Cannot fetch courses at this time.</p>
          </div>
        `
        })

}

function viewSyllabus(course) {
    window.location.href = `/syllabus-detail/syllabus-detail.html?id=${course.id}`
}

async function retrieveAndDisplayAllCourseEntries() {
    // issuing an HTTP Get request to get all the blogs
    let courses = await httpGetRequest(courseURL);
    console.log(courses)
    return courses;
}

async function httpGetRequest(theUrl) {
    return await fetch(theUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
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

