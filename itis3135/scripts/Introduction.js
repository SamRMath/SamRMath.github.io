const form = document.getElementById("introForm");
const mainContent = document.getElementById("mainContent");

// Function to generate rest of the page and replace form
function displayResult(baseHtml, formData) {
  let html = baseHtml;

  // Personal Statement
  html += `<p>${formData.get("personalStatement")}</p>`;

  // Main Bullets
  html += `<ul>`;
  for (let i = 1; i <= 7; i++) {
    html += `<li>${formData.get("bullet" + i)}</li>`;
  }
  html += `</ul>`;

  // Courses
  html += `<h5>Current Courses:</h5>`;
  html += `<ul>`;
  const courses = document.querySelectorAll("#courses .course");
  courses.forEach((courseDiv) => {
    html += `<li>${courseDiv.querySelector('[name="dept"]').value} - ${courseDiv.querySelector('[name="courseNum"]').value}: ${courseDiv.querySelector('[name="courseName"]').value} (${courseDiv.querySelector('[name="reason"]').value})</li>`;
  });
  html += `</ul>`;

  // Quote
  html += `<p>"${formData.get("quote")}" — ${formData.get("quoteAuthor")}</p>`;

  // Optional Fields
  if (formData.get("funny")) html += `<p>Funny thing: ${formData.get("funny")}</p>`;
  if (formData.get("share")) html += `<p>Something to share: ${formData.get("share")}</p>`;

  // Links
  html += `<ul>`;
  for (let i = 1; i <= 5; i++) {
    const link = formData.get("link" + i);
    if (link) html += `<li><a href="${link}" target="_blank">${link}</a></li>`;
  }
  html += `</ul>`;

  // Add reset button to start over
  html += `<button id="startOver">Start Over</button>`;

  // Replace form with result
  mainContent.innerHTML = html;

  // Reset button listener
  document.getElementById("startOver").addEventListener("click", () => {
    location.reload();
  });
}

// Prevent default form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Gather form data
  const formData = new FormData(form);

  // Build the result HTML
  let html = `<h2>${formData.get("firstName")} ${formData.get("middleName") ? formData.get("middleName") + " " : ""}${formData.get("nickname") ? '(' + formData.get("nickname") + ') ' : ""}${formData.get("lastName")}</h2>`;
  html += `<h3>Introduction</h3>`;

  // Picture
  const file = formData.get("picture");
  if (file && file.size > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      html += `<img src="${e.target.result}" alt="User picture">`;
      displayResult(html, formData);
    };
    reader.readAsDataURL(file);
  } else {
    displayResult(html, formData);
  }
});

// Clear button
document.getElementById("clear").addEventListener("click", () => {
  form.reset();
  form.querySelectorAll("input[type='text'], textarea, input[type='url']").forEach((input) => input.value = "");
});
