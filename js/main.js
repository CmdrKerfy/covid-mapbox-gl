// ADD BASEMAP
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VyZnkiLCJhIjoiY2szOTE0dG43MDE4dDNqbzZ4ajdld3A1eCJ9.IYIY3O7YU3fZvR2izUZUGQ';
// var bounds = [
//     [31.113927, -5.198409], // Southwest coordinates
//     [44.797660, 7.994002] // Northeast coordinates
// ]
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kerfy/ck8sadhtn0uip1inskm9tqsa1',
    center: [37.477968, 0.090719],
    zoom: 5.75,
    minZoom: 5.50,
    maxZoom: 7,
    //pitch:
    //maxBounds: bounds
});

var active_layer = 'doctors';

function filterBy(week) {
    //var filters = ['==', 'week', week];
    //map.setFilter('earthquake-circles', filters);
    //map.setFilter('earthquake-labels', filters);

    // Set the label to the week
    document.getElementById('week').textContent = week;
}

// ADD LAYERS
function init() {
    map.addSource('doctors', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/Doctor_Capacity.geojson',
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
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-color': {
                property: 'Week0',
                //type: 'interval',
                stops: [
                    [0, 'light blue']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [5, 5],
                    [25, 10],
                    [50, 25],
                    [75, 35],
                    [100, 45],
                    [150, 60]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.5
        },
        'filter': ['>=', 'Week0', 1]
    }, 'waterway-label');

    map.addLayer({
        'id': 'nurses',
        'type': 'circle',
        'source': 'nurses',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week0',
                //type: 'interval',
                stops: [
                    [1, 'light green']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [1, 3],
                    [5, 5],
                    [25, 10],
                    [50, 25],
                    [75, 35],
                    [100, 45],
                    [150, 50]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.5
        },
        'filter': ['>=', 'Week0', 1]
    }, 'waterway-label');
};

// ADD POPUPS
map.once('style.load', function(e) {
    init();
    map.addControl(new mapboxgl.NavigationControl());
    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['nurses']
        });
        if (!features.length) {
            return;
        }
        var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML('<h3>More Information</h3>' +
                '<ul>' +
                '<li>Province: <b>' + feature.properties.level4name + '</b></li>' +
                '<li>County: <b>' + feature.properties.level5name + '</b></li>' +
                '<li>Current: <b>' + feature.properties.Week0 + '</b></li>' +
                '<li>Week 1: <b>' + feature.properties.Week1 + '</b></li>' +
                '<li>Week 2: <b>' + feature.properties.Week2 + '</b></li>' +
                '<li>Week 3: <b>' + feature.properties.Week3 + '</b></li>' +
                '<li>Week 4: <b>' + feature.properties.Week4 + '</b></li>' +
                '<li>Week 5: <b>' + feature.properties.Week5 + '</b></li>' +
                '<li>Week 6: <b>' + feature.properties.Week6 + '</b></li>' +
                '</ul>')
            .addTo(map);
    })
});

//HIDE LOADING BAR 
map.on('data', function(e) {
    if (e.dataType === 'source' && e.sourceId === 'doctors') {
        document.getElementById("loader").style.visibility = "hidden";
    }
})

// TIME SLIDER PROPERTIES
var prop = document.getElementById('prop');
prop.addEventListener('change', function() {
    console.log('dropdown changed');
    console.log(prop.value);

    console.log('active layer: ');
    console.log(active_layer);

    var clickedLayer = prop.value;
    // e.preventDefault();
    // e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
    } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        map.setLayoutProperty(active_layer, 'visibility', 'none');
        active_layer = clickedLayer;
    }

});


// Set filter to first week
filterBy(0);

document
    .getElementById('slider')
    .addEventListener('input', function(e) {
        var week = parseInt(e.target.value, 10);
        console.log("print week from slider");
        console.log(week);

        property_val = "Week" + week

        console.log("property_val");
        console.log(property_val);

        map.setPaintProperty('doctors', 'circle-radius', {
            property: property_val,
            base: 3,
            type: 'interval',
            stops: [
                [0, 0],
                [1, 3],
                [10, 5],
                [25, 10],
                [50, 25],
                [75, 35],
                [100, 45],
                [150, 60]
            ]
        });

        map.setPaintProperty('nurses', 'circle-radius', {
            property: property_val,
            base: 3,
            type: 'interval',
            stops: [
                [0, 0],
                [1, 3],
                [5, 5],
                [25, 10],
                [50, 25],
                [75, 35],
                [100, 45],
                [150, 50]
            ]
        });

        filterBy(week);
    });



// 'circle-radius': {
//     property: 'Week0',
//     base: 3,
//     type: 'interval',
//     stops: [
//         [1, 3],
//         [50, 8],
//         [100, 10],
//         [150, 15]
//     ]
// },