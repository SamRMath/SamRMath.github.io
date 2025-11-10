document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const response = document.getElementById("response");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      if (email.includes("@")) {
        response.textContent = "Thank you! Your email has been received.";
        response.style.color = "green";
      } else {
        response.textContent = "Please enter a valid email address.";
        response.style.color = "red";
      }
    });
  }
});