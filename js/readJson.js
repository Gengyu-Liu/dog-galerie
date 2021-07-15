"use strict"

function readJson(nameJson, index) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'extern/' + nameJson + '.json', true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let bilderObj = JSON.parse(xhr.responseText);
            bilderArten = Object.keys(bilderObj);//Namen der eigenschaften
            bildArray = bilderObj[bilderArten[index]];
            bilderNum = bildArray.length;//Anzahl der Bilder  
            for (let x = 0; x < bildArray.length; x++) {
                bildArray[x]["map"] = "img/" + bildArray[x]["map"] + ".jpg";
            }
            initGalerie();
        }
    }
}
