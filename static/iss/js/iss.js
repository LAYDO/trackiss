let issLat = document.getElementById('issLat');
let issLon = document.getElementById('issLon');
let issAlt = document.getElementById('issAlt');
let issVel = document.getElementById('issVel');
var issMap;
var appStorage = window.sessionStorage;
var metric = false;

var y = document.getElementsByClassName("nav-link");
for (var i = 0; i < y.length; i++) {
    let temp = y[i].id.toLowerCase();
    appStorage.setItem(y[i].id, false);
    let path = window.location.pathname.replace('/', '');
    path = path.replace('/', '');
    if (path == temp) {
        appStorage.setItem(y[i].id, true);
    }
}

for (var i = 0; i < appStorage.length; i++) {
    var active = appStorage.getItem(appStorage.key(i));
    if (active === "true") {
        // document.getElementById(appStorage.key(i)).className += " active";
        console.log(appStorage);
    }
}

window.onscroll = () => {
    changeNav();
}

initMap();
fetchISS();
setInterval(fetchISS, 5000);

function changeNav() {
    let navBar = document.getElementById('issNavbar');
    let navTrigger = document.getElementById('issHeader').getBoundingClientRect();

    if (navTrigger.bottom <= 0) {
        navBar.classList.add("nav-fixed");
    } else {
        navBar.classList.remove("nav-fixed");
    }
}

function redirect(evt) {
    var y = document.getElementsByClassName('active');
    for (var i = 0; i < y.length; i++) {
        y[i].className = '';
    }
    window.location.pathname = evt.currentTarget.id.toLowerCase();
    // document.getElementById(window.location.pathname).className = 'active';
}

function fetchISS() {
    let url = `${window.location.href}iss?units=${metric ? 'kilometers' : 'miles'}`;
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        issLat.innerText = `${data.latitude.toFixed(4)}`;
        issLon.innerText = `${data.longitude.toFixed(4)}`;
        issAlt.innerText = `${data.altitude.toFixed(2)} ${metric ? 'km' : 'miles'}`;
        issVel.innerText = `${data.velocity.toFixed(2)} ${metric ? 'km/h' : 'mph'}`;
        // for loop and replace iss-icon class with new class to track where ISS has been (since on-screen)
        let icons = document.getElementsByClassName('iss-icon');
        for (var i = 0; i < icons.length; i++) {
            icons[i].className = '';
        }
        let issIcon = L.divIcon({ className: 'iss-icon' });
        L.marker([data.latitude, data.longitude], { icon: issIcon }).addTo(issMap);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

function initMap() {
    document.getElementById('issMap').innerHTML = '<div id="mapId"></div>';
    issMap = new L.map('mapId').setView([0, 0], 2);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGF5ZG8iLCJhIjoiY2t0bmcwZW5oMDJqNTJwbzJ1cm9uZHZjMiJ9.aP2xQEplUndXkrSgmkB9Sw'
    }).addTo(issMap);
}

function checkMetric() {
    metric = !metric;
    let m = document.getElementById('metricCheck');
    m.className = metric ? 'metric-checked' : 'metric';
}
