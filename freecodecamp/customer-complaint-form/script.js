const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const orderNoInput = document.getElementById("order-no");
const productCodeInput = document.getElementById("product-code");
const quantityInput = document.getElementById("quantity");
const complaintDescInput = document.getElementById("complaint-description");
const solutionDescInput = document.getElementById("solution-description");
const complaintsGroup = document.getElementById("complaints-group");
const complaintCheckboxes = document.querySelectorAll(`#complaints-group input[type="checkbox"]`);
const solutionsGroup = document.getElementById("solutions-group");
const solutionRadios = document.querySelectorAll(`#solutions-group input[type="radio"]`);
const submitButton = document.getElementById("submit-btn");

function validateForm() {
  const nameValue = nameInput.value;
  const emailValue = emailInput.value;
  const orderNoValue = orderNoInput.value;
  const productCodeValue = productCodeInput.value;
  const quantityValue = quantityInput.value;
  const complaintDescValue = complaintDescInput.value;
  const solutionDescValue = solutionDescInput.value;

  const isComplaintChecked = document.querySelector(`input[name="complaint"]:checked`) !== null;
  const isSolutionChecked = document.querySelector(`input[name="solutions"]:checked`) !== null;

  const isNameValid = nameValue.trim().length > 0;

  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
  const orderNoRegex = /^2024\d{6}$/;
  const productCodeRegex = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/
  const quantityRegex = /^[1-9]\d*$/;

  const otherComplaintChecked = document.getElementById("other-complaint").checked;
  const otherSolutionChecked = document.getElementById("other-solution").checked

  const isComplaintDescValid = !otherComplaintChecked ||complaintDescValue.trim().length >= 20;
  const isSolutionDescValid = !otherSolutionChecked || solutionDescValue.trim().length >= 20;

  return {
    "full-name": isNameValid,
    "email": emailRegex.test(emailValue),
    "order-no": orderNoRegex.test(orderNoValue),
    "product-code": productCodeRegex.test(productCodeValue),
    "quantity": quantityRegex.test(quantityValue),
    "complaints-group": isComplaintChecked,
    "complaint-description": isComplaintDescValid,
    "solutions-group": isSolutionChecked,
    "solution-description": isSolutionDescValid
  };
}

function validateField(e) {
  const validation = validateForm();

  const fieldName = e.target.id;

  if (validation[fieldName]) {
    e.target.style.borderColor = "green";
  } else {
    e.target.style.borderColor = "red";
  }
}

function validateComplaintGroup() {
  const validation = validateForm();

  if (validation["complaints-group"]) {
    complaintsGroup.style.borderColor = "green";
  } else {
    complaintsGroup.style.borderColor = "red";
  }
}

function validateSolutionGroup() {
  const validation = validateForm();

  if(validation["solutions-group"]) {
    solutionsGroup.style.borderColor = "green";
  } else {
    solutionsGroup.style.borderColor = "red";
  }
}

nameInput.addEventListener("change", validateField);
emailInput.addEventListener("change", validateField);
orderNoInput.addEventListener("change", validateField);
productCodeInput.addEventListener("change", validateField);
quantityInput.addEventListener("change", validateField);

for (const checkbox of complaintCheckboxes) {
  checkbox.addEventListener("change", validateComplaintGroup);
}

complaintDescInput.addEventListener("change", validateField);

for (const radio of solutionRadios) {
  radio.addEventListener("change", validateSolutionGroup);
}

solutionDescInput.addEventListener("change", validateField);

function isValid(validationObject) {
  return Object.values(validationObject).every(value => value === true);
}

const form = document.querySelector("form");

form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();

  const validation = validateForm();
  const formIsValid = isValid(validation);

  const normalFields = [
    nameInput,
    emailInput,
    orderNoInput,
    productCodeInput,
    quantityInput
  ];

  for (const field of normalFields) {
    if (validation[field.id]) {
      field.style.borderColor = "green";
    } else {
      field.style.borderColor = "red";
    }
  }

  if (validation["complaints-group"]) {
    complaintsGroup.style.borderColor = "green";
  } else {
    complaintsGroup.style.borderColor = "red";
  }

  if (validation["complaint-description"]) {
    complaintDescInput.style.borderColor = "green";
  } else {
    complaintDescInput.style.borderColor = "red";
  }

  if (validation["solutions-group"]) {
    solutionsGroup.style.borderColor = "green";
  } else {
    solutionsGroup.style.borderColor = "red";
  }

  if (validation["solution-description"]) {
    solutionDescInput.style.borderColor = "green";
  } else {
    solutionDescInput.style.borderColor = "red";
  }
});
