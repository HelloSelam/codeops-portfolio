const form = document.querySelector('#signupForm');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#password');
const message = document.querySelector('#message');


const phonePattern = /^(09|07)\d{8}$|^\+251(9|7)\d{8}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z]).+$/;


function showError(input, text) {
  message.textContent = text;
  message.style.color = "red";
  input.style.border = "2px solid red";
}

function clearError() {
  message.textContent = "";

  nameInput.style.border = "";
  emailInput.style.border = "";
  phoneInput.style.border = "";
  passwordInput.style.border = "";
}


form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearError();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value;

  if (name.length < 2) {
    showError(nameInput, "Name must be at least 2 characters.");
    return;
  }

  if (email === "") {
    showError(emailInput, "Email is required.");
    return;
  }

  if (!phonePattern.test(phone)) {
    showError(
      phoneInput,
      "Enter a valid phone number."
    );
    return;
  }

  if (!passwordPattern.test(password)) {
    showError(
      passwordInput,
      "Password needs uppercase, lowercase, letter and special character."
    );
    return;
  }

  const savedUsers = localStorage.getItem("users");

  const users = savedUsers
    ? JSON.parse(savedUsers)
    : [];

  const user = {
    name: name,
    email: email,
    phone: phone,
    password: password
  };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Signup successful!";
  message.style.color = "green";

  form.reset();
});

const savedUsers = localStorage.getItem("users");

if (savedUsers) {
  const users = JSON.parse(savedUsers);

  console.log("Signed-up users:", users.length);
}