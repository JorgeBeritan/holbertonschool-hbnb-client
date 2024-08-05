

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const placesList = document.getElementById('places-list');
  const loginLink = document.getElementById('login-link');

  if (loginForm) {
	console.log(' here ok ');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
	  if (!email || !password) {
        alert('Plaease enter both email and password');
		return
	  }
	console.log('here ok 2');
	  const submitButton = loginForm.querySelector('button[type="submit"]');
	  submitButton.disable = true;

	  try {
       await loginUser(email, password);
	  } finally {
        submitButton.disabled = false;
	  }
	});
  }
  
});

async function loginUser(email, password) {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({ email, password })
	});

	if (response.ok) {
      const data = await response.json();
	  document.cookie = `token=${data.access_token}; path=/`;
	  window.location.href = '/places';
	} else {
      const errorData = await response.json();
	  alert('Login Failed ' + errorData.message);
	}
  } catch (error) {
    alert('An error ocurred: ' + errorData.message);
  }
}
