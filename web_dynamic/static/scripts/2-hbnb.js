$(document).ready(() => {
    const amenities = {};

    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).attr('data-id');

        if (this.checked) {
            amenities[amenityId] = $(this).attr('data-name')
        } else {
            delete amenities[amenityId];
        }

        const amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });

    $.get("http://localhost:5001/api/v1/status/", (data) => {
	if (data.status === "OK") {
	    $("div#api_status").addClass("available");
	} else {
	    $("div#api_status").removeClass("available");
	}
    });
});
