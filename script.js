const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-122.6750, 45.5051]),
        zoom: 13
    })
});

const locations = [
    {
        name: "Burnside Skatepark",
        coordinates: [-122.6787, 45.5151],
        address: "SE 2nd Ave, Portland, OR 97232",
        imageElement: document.getElementById('burnside-image')
    },
    {
        name: "Lincoln High School",
        coordinates: [-122.6676, 45.5235],
        address: "1600 SW Salmon St, Portland, OR 97205",
        imageElement: document.getElementById('lincoln-image')
    },
    {
        name: "Tanner Springs Park",
        coordinates: [-122.6858, 45.5211],
        address: "NW 10th Ave & NW Marshall St, Portland, OR 97209",
        imageElement: document.getElementById('tanner-image')
    },
    // Add the remaining locations similarly...
];

// Create a popup element for displaying the picture and address
const popup = document.createElement('div');
popup.className = 'popup';
popup.style.position = 'absolute';
popup.style.backgroundColor = '#FFFFFF';
popup.style.padding = '10px';
popup.style.borderRadius = '8px';
popup.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
popup.style.minWidth = '200px';
popup.style.maxWidth = '250px';
popup.style.display = 'none';
document.body.appendChild(popup);

// Add a custom pink pin for each location
locations.forEach(location => {
    const marker = new ol.Overlay({
        position: ol.proj.fromLonLat(location.coordinates),
        positioning: 'center-center',
        element: document.createElement('div'),
        stopEvent: false
    });

    marker.getElement().style.backgroundColor = '#FF1493';
    marker.getElement().style.width = '16px';
    marker.getElement().style.height = '16px';
    marker.getElement().style.borderRadius = '50%';
    marker.getElement().style.boxShadow = '0 0 10px rgba(255, 20, 147, 0.5)';
    marker.getElement().style.cursor = 'pointer';

    // Add click event to show the popup with the image and address
    marker.getElement().addEventListener('click', () => {
        popup.innerHTML = `
            <strong>${location.name}</strong><br>
            <img src="${location.imageElement.src}" alt="${location.name}" style="width: 100%; border-radius: 8px; margin-top: 5px;">
            <p style="margin: 5px 0;">${location.address}</p>
        `;
        popup.style.display = 'block';
        popup.style.left = `${marker.getElement().getBoundingClientRect().left + window.scrollX}px`;
        popup.style.top = `${marker.getElement().getBoundingClientRect().top + window.scrollY - 100}px`;
    });

    map.addOverlay(marker);
});

// Hide the popup when clicking outside
map.on('click', () => {
    popup.style.display = 'none';
});
