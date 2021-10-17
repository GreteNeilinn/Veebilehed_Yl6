(function() {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function() {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            if (h > 12) {
                h = h - 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let kingitus = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");
        let postkontor = document.getElementById("valik-1");
        let pakiautomaat = document.getElementById("valik-2");

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        } else if (eesnimi.value === "" || sisestabNumbrit(eesnimi.value)) {

            alert("Palun sisestage korrektne eesnimi");

            return;


        } else if (perenimi.value === "" || sisestabNumbrit(perenimi.value)) {

            alert("Palun sisestage korrektne perekonnanimi");

            return;

        } else if (!(kingitus.checked) && !(kontaktivaba.checked)) {

            alert("Palun valige kas tegemist on kingituseg või/ja kas tegemist on kontaktivaba tarnega");

            return;

        } else if (!(postkontor.checked) && !(pakiautomaat.checked)) {

            alert("Palun valige saatmisviis");

            return;

        } else {
            if (linn.value === "trt" || linn.value === "nrv") {
                e.innerHTML = "2.50 &euro;";
            } else if (linn.value === "tln") {
                e.innerHTML = "0.00 &euro;";
            } else {
                e.innerHTML = "3.00 &euro;";
            }


        }

        console.log("Tarne hind on arvutatud");

        function sisestabNumbrit(sõne) {
            return /\d/.test(sõne);
        }
    }


})();

// map

let mapAPIKey = "AjMGz85QyV0Bxmz5IS-0Thftc9QcQaZxkKkq_pU9oI4BYueKc3gQxIKMwKE1xCza";

let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        57.79926708499923, 26.102986320832606
    );

    let tartuÜlikool = new Microsoft.Maps.Location(
        58.381073031787174, 26.719822982538492
    );

    let lätiÜlikool = new Microsoft.Maps.Location(
        56.95072052002351, 24.115781864109096
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
    });

    let pushpin = new Microsoft.Maps.Pushpin(tartuÜlikool, {
        title: 'Tartu Ülikool',
    });

    let pushpin2 = new Microsoft.Maps.Pushpin(lätiÜlikool, {
        title: 'Läti Ülikool',
    });

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikool on Baltimaade juhtiv ülikool, kuuludes ainukesena regioonis maailma 1,2% parima sekka.'
    }

    pushpin2.metadata = {
        title: 'Läti Ülikool',
        description: 'Läti Ülikool (läti keeles Latvijas Universitāte) on ülikool Riias ja ühtlasi Läti vanim klassikaline ülikool',
    }

    var infobox = new Microsoft.Maps.Infobox(tartuÜlikool, {
        visible: false
    })

    var infobox2 = new Microsoft.Maps.Infobox(lätiÜlikool, {
        visible: false
    })

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    infobox.setMap(map);
    infobox2.setMap(map);
    map.entities.push(pushpin);
    map.entities.push(pushpin2);

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE