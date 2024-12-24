const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  // Basic validation
  if (name.trim() === '') {
    alert('Please enter your name.');
    return;
  }

  if (isNaN(age) || age < 0) {
    alert('Please enter a valid age.');
    return;
  }

  // Store user data in local storage
  localStorage.setItem('userData', JSON.stringify({ name, age }));

  // Redirect to the next page
  window.location.href = '/Main/index.html'; // Replace with your next page's URL
});