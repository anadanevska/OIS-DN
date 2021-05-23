function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    }
}

function setLatLng(dataset) {
    var lat = dataset.lat;
    var lng = dataset.lng;
    return new L.LatLng(lat, lng);
}

function latLngRadians(dataset) {
    return _.map(dataset, function (item) {
        var latRad = item.lat * (Math.PI / 180);
        var lngRad = item.lng * (Math.PI / 180);
        return [latRad, lngRad];
    });
}

function radToCart(radians) {
    var cartesian = [];
    radians.forEach(function (coordinate) {
        var cartesianLat = Math.cos(coordinate[0]) * Math.cos(coordinate[1]);
        var cartesianLng = Math.cos(coordinate[0]) * Math.sin(coordinate[1]);
        var sineLat = Math.sin(coordinate[0]);
        cartesian.push({ x: cartesianLat, y: cartesianLng, z: sineLat });
    });
    return cartesian;
}

/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad === "undefined") {
    Number.prototype.toRad = function () {
        return (this * Math.PI) / 180;
    };
}

/**
 * Calculate middle point between two coordinates.
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @return Array of calculated lng and lat, e.g. [lng lat]
 */

function middlePoint(lat1, lng1, lat2, lng2) {
    //-- Longitude difference
    var dLng = (lng2 - lng1).toRad();

    //-- Convert to radians
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();
    lng1 = lng1.toRad();

    var bX = Math.cos(lat2) * Math.cos(dLng);
    var bY = Math.cos(lat2) * Math.sin(dLng);
    var lat3 = Math.atan2(
        Math.sin(lat1) + Math.sin(lat2),
        Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
    );
    var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    return [(lat3 * 180) / Math.PI, (lng3 * 180) / Math.PI];
}