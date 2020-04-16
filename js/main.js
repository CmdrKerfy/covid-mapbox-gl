// ADD BASEMAP
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VyZnkiLCJhIjoiY2szOTE0dG43MDE4dDNqbzZ4ajdld3A1eCJ9.IYIY3O7YU3fZvR2izUZUGQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kerfy/ck8sadhtn0uip1inskm9tqsa1',
    center: [37.477968, 0.090719],
    zoom: 5.75,
    minZoom: 5.50,
    maxZoom: 7,
    //pitch:
});

var active_layer = 'doctors';

function filterBy(week) {
    // Set the label to the week
    document.getElementById('week').textContent = week;
}

// LOAD LAYERS
function init() {

    // Healthcare Staff Capacity
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

    // Healthcare Visits
    map.addSource('VisitsPLHIV', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/VisitsPLHIV.geojson',
        buffer: 0,
        maxzoom: 12
    });

    map.addSource('VisitsGenPOP', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/VisitsGenPOP.geojson',
        buffer: 0,
        maxzoom: 12
    });

    map.addSource('VisitsTotalPOP', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/VisitsTotalPOP.geojson',
        buffer: 0,
        maxzoom: 12
    });

    // Healthcare Seen
    map.addSource('PLHIVseenDoc', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/PLHIVseenDoc.geojson',
        buffer: 0,
        maxzoom: 12
    });

    map.addSource('PLHIVseenMO', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/PLHIVseenMO.geojson',
        buffer: 0,
        maxzoom: 12
    });

    map.addSource('PLHIVseenNurse', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/PLHIVseenNurse.geojson',
        buffer: 0,
        maxzoom: 12
    });

    if (window.location.search.indexOf('embed') !== -1) map.scrollZoom.disable();

// ADD LAYERS

    // Healthcare Staff Capacity
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
                type: 'interval',
                stops: [
                    // [0, 'light blue']
                    [0, 'dark red'],
                    [25, 'red'],
                    [50, 'orange'],
                    [75, 'yellow'],
                    [100, 'light green'],
                    [147, 'green']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [1, 3],
                    [25, 10],
                    [50, 25],
                    [75, 35],
                    [100, 45],
                    [150, 75]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week0', 1]
    }), 

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
                type: 'interval',
                stops: [
                    //[1, 'light green']
                    [0, 'dark red'],
                    [25, 'red'],
                    [40, 'orange'],
                    [60, 'yellow'],
                    [80, 'light green'],
                    [120, 'green']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [10, 3],
                    [12, 5],
                    [15, 7],
                    [20, 10],
                    [25, 15],
                    [30, 20],
                    [35, 25],
                    [40, 30],
                    [45, 35],
                    [75, 45],
                    [120, 55]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week0', 1]
    }),

    // Healthcare Visits
    map.addLayer({
        'id': 'VisitsPLHIV',
        'type': 'circle',
        'source': 'VisitsPLHIV',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week0',
                //type: 'interval',
                stops: [
                    [0, 'light green']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [1500, 3],
                    [2500, 5],
                    [3000, 7],
                    [4000, 10],
                    [7000, 15],
                    [8000, 20],
                    [9000, 30],
                    [10000, 35],
                    [15000, 45],
                    [20000, 55]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week0', 1]
    }),

    map.addLayer({
        'id': 'VisitsGenPOP',
        'type': 'circle',
        'source': 'VisitsGenPOP',
        'layout': {
            'visibility': 'none'
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
                    [30000, 3],
                    [40000, 5],
                    [50000, 7],
                    [60000, 10],
                    [75000, 20],
                    [100000, 30],
                    [200000, 40],
                    [300000, 50],
                    [450000, 55]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week0', 1]
    }),

    map.addLayer({
        'id': 'VisitsTotalPOP',
        'type': 'circle',
        'source': 'VisitsTotalPOP',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week0',
                //type: 'interval',
                stops: [
                    [0, 'yellow']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [40000, 5],
                    [50000, 7],
                    [60000, 10],
                    [75000, 20],
                    [100000, 30],
                    [200000, 40],
                    [300000, 50],
                    [450000, 55],
                    [500000, 60]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week0', 1]
    })
};

//HIDE LOADING BAR 
map.on('data', function(e) {
    if (e.dataType === 'source' && e.sourceId === 'doctors') {
        document.getElementById("loader").style.visibility = "hidden";
    }
})

// ADD POPUPS
map.once('style.load', function(e) {
    init();
    map.addControl(new mapboxgl.NavigationControl());
    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: [active_layer]
        });
        if (!features.length) {
            return;
        }
        var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML(
                'Province: <b>' + feature.properties.level4name + '</b>' +
                '</br>' +
                'County: <b>' + feature.properties.level5name + '</b>' +
                '</br>' +
                'Current: <b>' + feature.properties.Week0 + '</b>' +
                '</br>' +
                'Week 1: <b>' + feature.properties.Week1 + '</b>' +
                '</br>' +
                'Week 2: <b>' + feature.properties.Week2 + '</b>' +
                '</br>' +
                'Week 3: <b>' + feature.properties.Week3 + '</b>' +
                '</br>' +
                'Week 4: <b>' + feature.properties.Week4 + '</b>' +
                '</br>' +
                'Week 5: <b>' + feature.properties.Week5 + '</b>' +
                '</br>' +
                'Week 6: <b>' + feature.properties.Week6 + '</b>'
            )
            .addTo(map);
    })
});

// TIME SLIDER PROPERTIES
var prop = document.getElementById('prop');
prop.addEventListener('change', function() {
    console.log('dropdown changed: ' + prop.value);

    var clickedLayer = prop.value;
    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
        active_layer = clickedLayer;

    } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        map.setLayoutProperty(active_layer, 'visibility', 'none');
        active_layer = clickedLayer;
    }
    console.log('clicked layer: ' + clickedLayer);
    console.log('active layer: ' + active_layer);
});
// Set filter to first week
filterBy(0);

document
    .getElementById('slider')
    .addEventListener('input', function(e) {
        var week = parseInt(e.target.value, 10);
        console.log("print week from slider: " + week);

        property_val = "Week" + week
        console.log("property_val = " + property_val);

        // Healthcare Staff Capacity
        map.setPaintProperty('doctors', 'circle-radius', {
            property: property_val,
            base: 3,
            type: 'interval',
            stops: [
                [0, 0],
                [10, 3],
                [15, 5],
                [25, 10],
                [40, 25],
                [75, 35],
                [100, 45],
                [150, 75]
            ]
        });
        map.setPaintProperty('doctors', 'circle-color', {
            property: property_val,
            type: 'interval',
            stops: [
                [0, 'dark red'],
                [25, 'red'],
                [50, 'orange'],
                [75, 'yellow'],
                [100, 'light green'],
                [147, 'green']
            ]
        });

        map.setPaintProperty('nurses', 'circle-radius', {
            property: property_val,
            base: 3,
            type: 'interval',
            stops: [
                [0, 0],
                [10, 3],
                [12, 5],
                [15, 7],
                [20, 10],
                [25, 15],
                [30, 20],
                [35, 25],
                [40, 30],
                [45, 35],
                [75, 45],
                [120, 55]
            ]
        });
        map.setPaintProperty('nurses', 'circle-color', {
            property: property_val,
            type: 'interval',
            stops: [
                [0, 'dark red'],
                [25, 'red'],
                [40, 'orange'],
                [60, 'yellow'],
                [80, 'light green'],
                [120, 'green']
            ]
        });

        // Healthcare Visits
        map.setPaintProperty('VisitsPLHIV', 'circle-radius', {
            property: property_val,
            base: 3,
            type: 'interval',
            stops: [
                [0, 0],
                [1500, 3],
                [2500, 5],
                [3000, 7],
                [4000, 10],
                [7000, 15],
                [8000, 20],
                [9000, 30],
                [10000, 35],
                [15000, 45],
                [20000, 55]
            ]
        });
        map.setPaintProperty('VisitsGenPOP', 'circle-radius', {
            property: property_val,
            base: 3,
            type: 'interval',
            stops: [
                [0, 0],
                [30000, 3],
                [40000, 5],
                [50000, 7],
                [60000, 10],
                [75000, 20],
                [100000, 30],
                [200000, 40],
                [300000, 50],
                [450000, 55]
            ]
        });
        map.setPaintProperty('VisitsTotalPOP', 'circle-radius', {
            property: property_val,
            base: 3,
            type: 'interval',
            stops: [
                [0, 0],
                [40000, 5],
                [50000, 7],
                [60000, 10],
                [75000, 20],
                [100000, 30],
                [200000, 40],
                [300000, 50],
                [450000, 55],
                [500000, 60]
            ]
        });

        filterBy(week);
    });