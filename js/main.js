// ADD BASEMAP
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VyZnkiLCJhIjoiY2szOTE0dG43MDE4dDNqbzZ4ajdld3A1eCJ9.IYIY3O7YU3fZvR2izUZUGQ';
var bounds = [

]
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/kerfy/ck8sadhtn0uip1inskm9tqsa1',
//center: 
//zoom:
//minZoom:
//maxZoom:
//pitch:
//maxBounds: bounds
});


function init() {
    map.addSource('doctors', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/Doctor_Console.geojson',
        buffer: 0,
        maxzoom: 12
    });

    map.addSource('nurses', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/Nurse_Capacity.geojson',
        buffer: 0,
        maxzoom: 12
    });

    if (window.location.search.indexOf('embed') !== -1) map.scrollZoom.disable();

    map.addLayer({
        'id': 'doctors',
        'type': 'circle',
        'source': 'doctors',
        'paint': {
            'circle-color': {
                property: 'Week',
                type: 'interval',
                stops: [
                    [0, 'yellow']
                    [1, 'orange'],
                    [2, 'red'],
                    [3, 'blue'],
                    [4, 'purple']
                ]
            },
            'circle-radius': {
                property: 'Week',
                base: 3,
                type: 'interval',
                stops: [
                    [1, 3],
                    [2, 8],
                    [3, 12]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.5
        },
        'filter': ['>=', 'Week', 1]
    }, 'waterway-label');

    map.addLayer({
        'id': 'nurses',
        'type': 'circle',
        'source': 'nurses',
        'paint': {
            'circle-color': {
                property: 'Week0',
                type: 'interval',
                stops: [
                    [1, 'orange'],
                    [2, 'red']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [1, 3],
                    [2, 8],
                    [3, 12]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.5
        },
        'filter': ['>=', 'Week0', 1]
    }, 'waterway-label');
};

map.once('style.load', function(e) {
    init();
    map.addControl(new mapboxgl.NavigationControl());
    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['veh-incd-1', 'veh-incd-2']
        });
        if (!features.length) {
            return;
        }
        var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML('<h3>Collision Detail</h3>' +
                '<ul>' +
                '<li>Year: <b>' + feature.properties.YEAR + '</b></li>' +
                '<li>Pedestrian Injuries: <b>' + feature.properties.PED_INJ + '</b></li>' +
                '<li>Pedestrian Fatalities: <b>' + feature.properties.PED_KIL + '</b></li>' +
                '<li>Cyclist Injuries: <b>' + feature.properties.CYC_INJ + '</b></li>' +
                '<li>Cyclist Fatalities: <b>' + feature.properties.CYC_KIL + '</b></li>' +
                '</ul>')
            .addTo(map);
    });
