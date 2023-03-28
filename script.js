
const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');

async function getBreweriesBySearchQuery(query) {
  const url = `https://api.openbrewerydb.org/breweries/search?query=${query}`;
  const response = await fetch(url);
  const breweries = await response.json();
  return breweries;
}

function displayBreweryDetails(brewery) {
  const name = document.createElement('h2');
  name.textContent = `name: ${brewery.name}`;

  const type = document.createElement('p');
  type.textContent = `Type: ${brewery.brewery_type}`;

  const address = document.createElement('p');
  address.textContent = `Address: ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;

  const website = document.createElement('p');
  website.innerHTML = `Website: <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>`;

  const phone = document.createElement('p');
  phone.textContent = `Phone: ${brewery.phone}`;

  const breweryDetails = document.createElement('div');
  breweryDetails.appendChild(name);
  breweryDetails.appendChild(type);
  breweryDetails.appendChild(address);
  breweryDetails.appendChild(website);
  breweryDetails.appendChild(phone);

  resultsContainer.appendChild(breweryDetails);
}

async function searchBreweries() {
  const query = searchInput.value.trim();
  resultsContainer.innerHTML = '';

  if (query) {
    try {
      const breweries = await getBreweriesBySearchQuery(query);

      if (breweries.length > 0) {
        breweries.forEach(brewery => displayBreweryDetails(brewery));
      } else {
        const message = document.createElement('p');
        message.textContent = 'No breweries found.';
        resultsContainer.appendChild(message);
      }
    } catch (error) {
      console.error(error);
      const message = document.createElement('p');
      message.textContent = 'An error occurred while searching for breweries.';
      resultsContainer.appendChild(message);
    }
  }
}

searchInput.addEventListener('input', searchBreweries);


