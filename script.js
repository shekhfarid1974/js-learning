document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  let isValid = true;

  // Clear previous errors
  document.querySelectorAll('.error').forEach(error => error.textContent = '');
  document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

  // Get values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate Name
  if (name === '') {
    showError('name', 'Name is required');
    isValid = false;
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError('email', 'Email is required');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate Message
  if (message === '') {
    showError('message', 'Message is required');
    isValid = false;
  }

  // If valid, submit form
  if (isValid) {
    alert('Form submitted successfully!');
    this.submit(); // You can change this to an AJAX call or redirect
  }
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = field.closest('.form-group').querySelector('.error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}