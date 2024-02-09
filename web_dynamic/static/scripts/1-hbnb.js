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
});
