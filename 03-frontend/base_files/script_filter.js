document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();

  document.getElementById('country-filter').addEventListener('change', (event) => {
    filterPlaces(event.target.value);
  });
});


function filterPlaces(country) {
  const places = document.getElementsByClassName('hola');
  Array.from(places).forEach(place => {
    if (country === '' || place.dataset.country === country) {
      place.style.display = 'block';
	} else {
      place.style.display = 'none';
	}
  });
}

function countryFilter(places) {
  const countryFilter = document.getElementById('country-filter');
  const countries = [...new Set(places.map(place => place.country_name))];

  countries.forEach(country => {
    const option = document.createElement('option');
	option.value = country;
	option.textContent = country;
	countryFilter.appendChild(option)
  });
}

function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
    loginLink.style.display = 'block';
  } else {
    loginLink.style.display = 'none';
	fetchPlaces(token);
  }
}

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
	if (cookieName === name) {
	  console.log(cookieString);
      return decodeURIComponent(cookieValue);
	}
  }
  return null;
}

async function fetchPlaces(token) {
  try {
    const response = await fetch('/data/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
	  'Authorization': `Bearer ${token}`
	}
   });
    if (!response.ok) {
      throw new Error(`NOP ${response.status}`);
	}
	const json_data = await response.json();
	console.log(json_data);
  	displayPlaces(json_data);
	countryFilter(json_data);
  } catch (error) {
    console.error('No mi loco:', error);
  }
}

function displayPlaces(places) {
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';

  places.forEach((place) => {
    const placeElement = document.createElement('div');
	placeElement.className = 'hola';
	placeElement.innerHTML = `
      <h2>${place.description}</h2>
	  <p>Price per night: $${place.price_per_night}</p>
	  <p>Location: ${place.city_name}, ${place.country_name}</p>
	  <a href="/places/${place.id}">View Details</a>
	`;
	placeElement.dataset.country = place.country_name;
	placesList.appendChild(placeElement);
  });
};



