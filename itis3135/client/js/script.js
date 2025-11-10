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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const response = document.getElementById("loginResponse");

  const toggleLink = document.getElementById("toggleForm");
  const formTitle = document.getElementById("form-title");
  const submitBtn = document.getElementById("submitBtn");
  let isSignup = false;

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue.includes("@")) {
      response.textContent = "Please enter a valid email address.";
      response.style.color = "red";
      return;
    }

    if (passwordValue.length < 4) {
      response.textContent = "Password must be at least 4 characters long.";
      response.style.color = "red";
      return;
    }

    if (isSignup) {
      response.textContent = `Account created successfully for ${usernameValue}!`;
      response.style.color = "green";
    } else {
      response.textContent = `Welcome back, ${usernameValue}! You are logged in.`;
      response.style.color = "green";
    }

    form.reset();
  });

  // Toggle between Login and Sign Up
  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    isSignup = !isSignup;

    if (isSignup) {
      formTitle.textContent = "Sign Up";
      submitBtn.textContent = "Sign Up";
      toggleLink.textContent = "Back to Login";
    } else {
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
      toggleLink.textContent = "Create New Account";
    }

    response.textContent = "";
  });
});