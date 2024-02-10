$(document).ready(() => {
    const amenities = {};
    const locations = {};

    // Function to update the displayed amenities list
    function updateAmenitiesList() {
        const amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    }

    // Function to update the displayed locations list
    function updateLocationsList() {
        const locationsList = Object.values(locations).join(', ');
        $('.locations h4').text(locationsList);
    }

    // Checkbox change event handler for amenities
    $('input[type="checkbox"][data-type="amenity"]').change(function() {
        const amenityId = $(this).attr('data-id');

        if (this.checked) {
            amenities[amenityId] = $(this).attr('data-name');
        } else {
            delete amenities[amenityId];
        }

        updateAmenitiesList();
    });

    // Checkbox change event handler for states and cities
    $('input[type="checkbox"][data-type="location"]').change(function() {
        const locationId = $(this).attr('data-id');

        if (this.checked) {
            locations[locationId] = $(this).attr('data-name');
        } else {
            delete locations[locationId];
        }

        updateLocationsList();
    });

    // Function to handle places search
    function searchPlaces() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ amenities: Object.keys(amenities), locations: Object.keys(locations) }),
            success: renderPlaces,
            error: (error) => console.error('Error:', error)
        });
    }

    // Function to render places
    function renderPlaces(data) {
        const placesSection = $('section.places');
        placesSection.empty(); // Clear existing places

        $.each(data, (index, place) => {
            const article = $('<article>').html(`<div class="title_box">
                                                          <h2>${place.name}</h2>
                                                          <div class="price_by_night">$${place.price_by_night}</div>
                                                      </div>
                                                      <div class="information">
                                                          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                                          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                                          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                                      </div>
                                                      <div class="description">
                                                          ${place.description}
                                                      </div>`);
            placesSection.append(article);
        });
    }

    // Check API status
    $.get("http://0.0.0.0:5001/api/v1/status/", (data) => {
        const apiStatusDiv = $("div#api_status");
        if (data.status === "OK") {
            apiStatusDiv.addClass("available");
        } else {
            apiStatusDiv.removeClass("available");
        }
    });

    // Initial places search
    searchPlaces();

    // Button click event handler
    $('button').click(searchPlaces);
});
