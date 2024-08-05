document.addEventListener('DOMContentLoaded', () => {
  getPlaceIdFromURL();
  checkAuthentication();
});

function getPlaceIdFromURL() {
  const url = window.location.pathname;
  const url_id = url.split('/')[2];
  console.log(url_id);
  return url_id;
}

function checkAuthentication() {
  const token = getCookie('token');
  const addReviewSection = document.getElementById('add-review');
  
  if (!token) {
    addReviewSection.style.display = 'none';
  } else {
    addReviewSection.style.display = 'block';
	fetchPlaceDetails(token, getPlaceIdFromURL());
  }
}

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
	if (cookieName === name) {
      return decodeURIComponent(cookieValue);
	}
  }
  return null;
}

async function fetchPlaceDetails(token, placeID) {
  try {
    const response = await fetch(`/data/${placeID}`, {
      method: 'GET',
	  headers: {
        'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	  }
	});
	if (!response.ok) {
      throw new Error(`NOP ${response.status}`);
	}
	const data = await response.json();
	displayPlaceDetails(data);
  } catch (error){
    console.error('No mi loco:', error);
  }
}

function displayPlaceDetails(place) {
  const placeDetails = document.getElementById('place-details');
  placeDetails.innerHTML = '';
  const placeElement = document.createElement('div');
  placeElement.innerHTML = `
	<h2>${place.id}</h2>
	<p>Host: ${place.host_name}</p>
	<p>Price per night: ${place.price_per_night}</p>
	<p>Location: ${place.city_name}, ${place.country_name}</p>
	<p>Description: ${place.description}</p>
	<p>Amenities: ${place.amenities}</p>
  `;
  placeDetails.appendChild(placeElement);
};
