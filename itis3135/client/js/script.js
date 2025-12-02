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
        document.getElementById("email").value = ""; // Clear email field
        document.getElementById("emailBody").value = ""; // Clear message field
      } else {
        response.textContent = "Please enter a valid email address.";
        response.style.color = "red";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector('.tutorial-list');
  if (!list) return;

  list.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      return;
    }

    const card = e.target.closest('.tutorial-card');
    if (!card) return;

    card.classList.toggle('open');

    const title = card.querySelector('h3');
    if (title) {
      const expanded = card.classList.contains('open');
      title.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
  });

  document.querySelectorAll('.tutorial-card').forEach((card) => {
    const body = card.querySelector('.card-body') || card.querySelector('p');
    if (body) {
      card.classList.remove('open');
    }
  });
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

  // Load any saved accounts from localStorage
  const loadAccounts = () => JSON.parse(localStorage.getItem("accounts")) || [];

  // Save accounts back to localStorage
  const saveAccounts = (accounts) =>
    localStorage.setItem("accounts", JSON.stringify(accounts));

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailVal = email.value.trim();
    const userVal = username.value.trim();
    const passVal = password.value.trim();
    const accounts = loadAccounts();

    if (!emailVal.includes("@")) {
      response.textContent = "Please enter a valid email address.";
      response.style.color = "red";
      return;
    }

    if (passVal.length < 4) {
      response.textContent = "Password must be at least 4 characters.";
      response.style.color = "red";
      return;
    }

    if (isSignup) {
      // --- CREATE NEW ACCOUNT ---
      const existing = accounts.find(
        (acc) => acc.email === emailVal || acc.username === userVal
      );

      if (existing) {
        response.textContent = "Account already exists with that email or username.";
        response.style.color = "red";
        return;
      }

      accounts.push({ username: userVal, email: emailVal, password: passVal });
      saveAccounts(accounts);
      response.textContent = "✅ Account created successfully! You can now log in.";
      response.style.color = "green";

      // Switch back to login mode automatically
      isSignup = false;
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
      toggleLink.textContent = "Create New Account";
      form.reset();
    } else {
      // --- LOGIN EXISTING ACCOUNT ---
      const user = accounts.find(
        (acc) =>
          (acc.username === userVal || acc.email === emailVal) &&
          acc.password === passVal
      );

      if (user) {
        response.textContent = `🎉 Welcome back, ${user.username}! You are logged in.`;
        response.style.color = "green";
      } else {
        response.textContent = "Invalid credentials. Please try again or sign up.";
        response.style.color = "red";
      }
    }
  });

  // Toggle between Login and Sign Up
  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    isSignup = !isSignup;

    if (isSignup) {
      formTitle.textContent = "Create New Account";
      submitBtn.textContent = "Sign Up";
      toggleLink.textContent = "Back to Login";
    } else {
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
      toggleLink.textContent = "Create New Account";
    }

    response.textContent = "";
    form.reset();
  });
});