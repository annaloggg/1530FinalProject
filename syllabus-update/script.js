var courseURL = new URL("http://localhost:8000/Courses");
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const contentPreview = document.getElementById('contentPreview');
    const fileContent = document.getElementById('fileContent');
    const clearButton = document.getElementById('clearButton');
    const analyzeButton = document.getElementById('analyzeButton');
    const syllabusTitle = document.getElementById('upload-syllabus-title');

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    retrieveAndDisplayOneCourse(courseId).then((course) => {
        console.log(course);
        syllabusTitle.textContent = `Update Syllabus for ${course.Subject} ${course.CourseCode} ${course.CourseName}`;
    })
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) return;
        // show file name
        fileName.textContent = file.name;
        fileInfo.classList.remove('hidden');

        // show loading
        loadingIndicator.classList.remove('hidden');

        // hide content preview
        contentPreview.classList.add('hidden');

        // read file
        const reader = new FileReader();

        reader.onload = function (e) {
            // hide loading
            loadingIndicator.classList.add('hidden');

            // show preview
            const content = e.target.result;
            fileContent.textContent = content;
            contentPreview.classList.remove('hidden');

            // store in localstorage
            localStorage.setItem('syllabusContent', content);
            localStorage.setItem('syllabusFileName', file.name);
        };

        reader.onerror = function () {
            loadingIndicator.classList.add('hidden');
            alert('error in reading file');
        };

        reader.readAsText(file);
    });

    // clearButton
    clearButton.addEventListener('click', function () {
        fileInput.value = '';
        fileInfo.classList.add('hidden');
        contentPreview.classList.add('hidden');
        localStorage.removeItem('syllabusContent');
        localStorage.removeItem('syllabusFileName');
    });

    // uploadButton
    analyzeButton.addEventListener('click', function () {
        // Check if empty
        if (!localStorage.getItem('syllabusContent')) {
            alert('Upload a syllabus file first!');
            return;
        }

        const syllabusContent = localStorage.getItem("syllabusContent");
        console.log(syllabusContent);
        updateExistingCourse(courseId, syllabusContent).then(() => {
            localStorage.removeItem('syllabusContent');
            localStorage.removeItem('syllabusFileName');
        })

        window.location.href = "/src/html/profile.html";
    });

    // Drag and drop
    const uploadArea = document.querySelector('.upload-area');

    uploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#eef6fd';
        uploadArea.style.borderColor = '#3498db';
    });

    uploadArea.addEventListener('dragleave', function () {
        uploadArea.style.backgroundColor = '#f9f9f9';
        uploadArea.style.borderColor = '#ccc';
    });

    uploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#f9f9f9';
        uploadArea.style.borderColor = '#ccc';

        const file = e.dataTransfer.files[0];
        if (file) {
            fileInput.files = e.dataTransfer.files;
            // cause change event
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
});

async function updateExistingCourse(courseId, syllabusContent) {

    // getting a hold on all the fields in the page
    let updateFields = {};
    if (syllabusContent != "") {
        updateFields["SyllabusContent"] = syllabusContent;
    }
    if (Object.keys(updateFields).length !== 0) {
        await httpPatchRequest(`${courseURL}/${courseId}`, updateFields);
    }
}

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

