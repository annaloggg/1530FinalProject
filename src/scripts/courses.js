const courses = ["CS 1666", "CS 1530", "CS 449"];

document.addEventListener("DOMContentLoaded", function () {
    genCourseCards();
});

function genCourseCards() {

    const course_div = document.getElementById("user-courses");

    for (const course of courses) {
        const course_card = document.createElement("div");
        course_card.classList.add("course-card");

        const course_name = document.createElement("h2");
        course_name.textContent = course;
        course_card.appendChild(course_name);

        const syllabus_div = document.createElement("div");
        syllabus_div.id = "syllabus-info";

        const syl_txt = document.createElement("h3");
        syl_txt.textContent = "Uploaded Syllabus:";

        const syllabus_name = course + "_syllabus.pdf";
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

    }
}