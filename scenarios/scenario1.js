// LOAD LAYERS
function init() {

    // PLHIV
    map.addSource('PLHIV', {
        type: 'geojson',
        data: 'geojson/Blank.geojson',
        buffer: 0,
        maxzoom: 12
    });

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
    map.addSource('visitsPLHIV', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/VisitsPLHIV_2.geojson',
        buffer: 0,
        maxzoom: 12
    });
    map.addSource('visitsGenPOP', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/VisitsGenPOP.geojson',
        buffer: 0,
        maxzoom: 12
    });
    map.addSource('visitsTotalPOP', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/VisitsTotalPOP.geojson',
        buffer: 0,
        maxzoom: 12
    });

    // Healthcare PLHIV Seen
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

    // Healthcare Total Population Seen
    map.addSource('TotalPOPseenDoc', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/TotalPOPseenDoc.geojson',
        buffer: 0,
        maxzoom: 12
    });
    map.addSource('TotalPOPseenMO', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/TotalPOPseenMO.geojson',
        buffer: 0,
        maxzoom: 12
    });
    map.addSource('TotalPOPseenNurse', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/CmdrKerfy/covid-mapbox-gl/master/geojson/TotalPOPseenNurse.geojson',
        buffer: 0,
        maxzoom: 12
    });

    if (window.location.search.indexOf('embed') !== -1) map.scrollZoom.disable();

// ADD LAYERS

    // PLHIV
    map.addLayer({
        'id': 'PLHIV',
        'type': 'circle',
        'source': 'PLHIV',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week0',
                type: 'interval',
                stops: [
                    [1, 'light blue']
                ]
            },
            'circle-radius': {
                property: 'Week0',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [100, 3]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week0', 1]
    }), 

    // Doctors
    map.addLayer({
        'id': 'doctors',
        'type': 'circle',
        'source': 'doctors',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week0',
                type: 'interval',
                stops: [
                    // [0, 'light blue']
                    [0, 'red'],
                    [25, 'orange red'],
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
                    [10, 3],
                    [15, 5],
                    [25, 10],
                    [40, 25],
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
    // Nurses
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
                    [0, 'red'],
                    [25, 'orange red'],
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

    // Visits by PLHIV
    map.addLayer({
        'id': 'visitsPLHIV',
        'type': 'circle',
        'source': 'visitsPLHIV',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'green']
                ]
            },
            'circle-radius': {
                property: 'Week1',
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
        'filter': ['>=', 'Week1', 1]
    }),

    // Visits by Gen Population
    map.addLayer({
        'id': 'visitsGenPOP',
        'type': 'circle',
        'source': 'visitsGenPOP',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'blue']
                ]
            },
            'circle-radius': {
                property: 'Week1',
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
        'filter': ['>=', 'Week1', 1]
    }),

    // Visits by Total Population
    map.addLayer({
        'id': 'visitsTotalPOP',
        'type': 'circle',
        'source': 'visitsTotalPOP',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'yellow']
                ]
            },
            'circle-radius': {
                property: 'Week1',
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
        'filter': ['>=', 'Week1', 1]
    }),

    // PLHIV Seen by a Doctor
    map.addLayer({
        'id': 'PLHIVseenDoc',
        'type': 'circle',
        'source': 'PLHIVseenDoc',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'black']
                ]
            },
            'circle-radius': {
                property: 'Week1',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [3, 3],
                    [5, 5],
                    [7, 10],
                    [10, 13],
                    [12, 15],
                    [15, 17],
                    [20, 20],
                    [25, 25]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week1', 1]
    }),

    // PLHIV Seen by a Medical Officer
    map.addLayer({
        'id': 'PLHIVseenMO',
        'type': 'circle',
        'source': 'PLHIVseenMO',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'purple']
                ]
            },
            'circle-radius': {
                property: 'Week1',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [2, 3],
                    [4, 5],
                    [6, 7],
                    [8, 10],
                    [10, 15],
                    [15, 20]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week1', 1]
    }),

    //  PLHIV Seen by a Nurse
    map.addLayer({
        'id': 'PLHIVseenNurse',
        'type': 'circle',
        'source': 'PLHIVseenNurse',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'orange']
                ]
            },
            'circle-radius': {
                property: 'Week1',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [5, 7],
                    [10, 10],
                    [15, 13],
                    [20, 17],
                    [25, 20],
                    [30, 25]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week1', 1]
    })

    // Total POP Seen by a Doctor
    map.addLayer({
        'id': 'TotalPOPseenDoc',
        'type': 'circle',
        'source': 'TotalPOPseenDoc',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'black']
                ]
            },
            'circle-radius': {
                property: 'Week1',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [30, 3],
                    [50, 5],
                    [75, 10],
                    [100, 13],
                    [125, 15],
                    [150, 17],
                    [200, 20],
                    [250, 25],
                    [300, 27],
                    [400, 30],
                    [500, 33]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week1', 1]
    }),

    // Total POP Seen by a Medical Officer
    map.addLayer({
        'id': 'TotalPOPseenMO',
        'type': 'circle',
        'source': 'TotalPOPseenMO',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'purple']
                ]
            },
            'circle-radius': {
                property: 'Week1',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [20, 3],
                    [30, 5],
                    [40, 10],
                    [50, 13],
                    [60, 15],
                    [70, 17],
                    [80, 20],
                    [90, 25],
                    [100, 27],
                    [150, 30],
                    [250, 35]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week1', 1]
    }),

    //  Total POP Seen by a Nurse
    map.addLayer({
        'id': 'TotalPOPseenNurse',
        'type': 'circle',
        'source': 'TotalPOPseenNurse',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-color': {
                property: 'Week1',
                //type: 'interval',
                stops: [
                    [0, 'orange']
                ]
            },
            'circle-radius': {
                property: 'Week1',
                base: 3,
                type: 'interval',
                stops: [
                    [0, 0],
                    [20, 3],
                    [30, 5],
                    [40, 10],
                    [50, 13],
                    [60, 15],
                    [70, 17],
                    [80, 20],
                    [90, 25],
                    [100, 27],
                    [150, 30],
                    [250, 33],
                    [300, 35],
                    [400, 37]
                ]
            },
            'circle-opacity': 0.8,
            'circle-blur': 0.25
        },
        'filter': ['>=', 'Week1', 1]
    })

};