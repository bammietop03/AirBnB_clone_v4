$(document).ready(() => {
  const amenities = {};

  // Checkbox change event
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr("data-id");

    if (this.checked) {
      amenities[amenityId] = $(this).attr("data-name");
    } else {
      delete amenities[amenityId];
    }

    const amenitiesList = Object.values(amenities).join(", ");
    $(".amenities h4").text(amenitiesList);
  });

  // Check API status
  $.get("http://localhost:5001/api/v1/status/", (data) => {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });

  // Initial places search
  $.ajax({
    url: "http://localhost:5001/api/v1/places_search/",
    type: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({}),
    success: (data) => {
      // Render places
      $.each(data, (index, place) => {
        const article = $("<article>").html(`<div class="title_box">
                                                          <h2>${place.name}</h2>
                                                          <div class="price_by_night">$${
                                                            place.price_by_night
                                                          }</div>
                                                      </div>
                                                      <div class="information">
                                                          <div class="max_guest">${
                                                            place.max_guest
                                                          } Guest${
          place.max_guest !== 1 ? "s" : ""
        }</div>
                                                          <div class="number_rooms">${
                                                            place.number_rooms
                                                          } Bedroom${
          place.number_rooms !== 1 ? "s" : ""
        }</div>
                                                          <div class="number_bathrooms">${
                                                            place.number_bathrooms
                                                          } Bathroom${
          place.number_bathrooms !== 1 ? "s" : ""
        }</div>
                                                      </div>
                                                      <div class="description">
                                                          ${place.description}
                                                      </div>`);
        $("section.places").append(article);
      });
    },
    error: (error) => console.error("Error:", error),
  });

  // Button click event
  $("button").click(function () {
    // Make a new POST request to places_search with the list of checked amenities
    $.ajax({
      url: "http://localhost:5001/api/v1/places_search/",
      type: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: (data) => {
        // Handle response - Render places
        $("section.places").empty(); // Clear existing places
        $.each(data, (index, place) => {
          const article = $("<article>").html(`<div class="title_box">
                                                              <h2>${
                                                                place.name
                                                              }</h2>
                                                              <div class="price_by_night">$${
                                                                place.price_by_night
                                                              }</div>
                                                          </div>
                                                          <div class="information">
                                                              <div class="max_guest">${
                                                                place.max_guest
                                                              } Guest${
            place.max_guest !== 1 ? "s" : ""
          }</div>
                                                              <div class="number_rooms">${
                                                                place.number_rooms
                                                              } Bedroom${
            place.number_rooms !== 1 ? "s" : ""
          }</div>
                                                              <div class="number_bathrooms">${
                                                                place.number_bathrooms
                                                              } Bathroom${
            place.number_bathrooms !== 1 ? "s" : ""
          }</div>
                                                          </div>
                                                          <div class="description">
                                                              ${
                                                                place.description
                                                              }
                                                          </div>`);
          $("section.places").append(article);
        });
      },
      error: (error) => console.error("Error:", error),
    });
  });
});
