const form = document.getElementById("introForm");

// Prevent default submit behavior
form.addEventListener("submit", function(e) {
  e.preventDefault();
  displayResult();
});

// Clear button
document.getElementById("clear").addEventListener("click", () => {
  Array.from(form.elements).forEach(el => {
    if (el.type !== "submit" && el.type !== "reset" && el.type !== "button") el.value = "";
  });
});

// Add course button
document.getElementById("addCourse").addEventListener("click", () => {
  const coursesDiv = document.getElementById("courses");
  const courseDiv = document.createElement("div");
  courseDiv.className = "course";
  courseDiv.innerHTML = `
    <input type="text" name="dept" placeholder="Department" required>
    <input type="text" name="courseNum" placeholder="Number" required>
    <input type="text" name="courseName" placeholder="Name" required>
    <input type="text" name="reason" placeholder="Reason" required>
    <button type="button" class="deleteCourse">Delete</button>
  `;
  coursesDiv.appendChild(courseDiv);

  // Delete button
  courseDiv.querySelector(".deleteCourse").addEventListener("click", () => {
    coursesDiv.removeChild(courseDiv);
  });
});

// Display submitted data in place of form
function displayResult() {
  const formData = new FormData(form);
  let resultHTML = "<h2>Your Introduction</h2>";

  for (let [key, value] of formData.entries()) {
    if (value) resultHTML += `<p><strong>${key}:</strong> ${value}</p>`;
  }

  form.parentElement.innerHTML = resultHTML + `<button onclick="location.reload()">Reset</button>`;
}