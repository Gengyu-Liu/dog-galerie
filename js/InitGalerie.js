"use strict"
/*******trigger the first item******/
readJson('bilder',0);

function initItems(){
    for (let i = bilderArten.length - 1; i >= 0; i--) {
        let item = document.createElement('button');
        item.setAttribute('id', "item" + (i + 1));
        item.innerHTML = bilderArten[i];
        buttonDiv.insertBefore(item, buttonDiv.childNodes[0]);
        //registerie handle funktion für Klicken des Item hunde1
        item.addEventListener('click', function () {
            readJson('bilder', i);
            initGalerie(); 
        });
    }
}

/*********Initialisierung für die Galerie**************/
function initGalerie() {//erstell passende image elemente für die Galerie
    if(!itemExists){
        initItems();
        itemExists = true;
    }
    /***** Initializierung: 1| Anzahl ******/
    document.getElementById('anzahl').innerHTML = "1|" + bilderNum;//soll vom bilder.json lesen

    /***************figure*************/
    /*
     <figure>
     <div id="imageDiv">
     <a id="zuruck">&#10094;</a>
     <a id="vor">&#10095;</a>
     <img id="hauptbild" src="img/pudel3.jpg" alt="pudel">
     </div>
     <figcaption>figcaptionText</figcaption>
     </figure>
     */

    /**************Initializierung: hauptbild <img src="img/pudel3.jpg" alt="pudel">*************/
    let hunde1 = bildArray[0];//das erste Objekt
    /*Inizialisierung: erzeugt das erste Bild */
    let src;
    let figcaptionText = "";
    let bildNames = Object.keys(bildArray[0]);
    for (let x = 0; x < bildNames.length; x++) {
        switch (bildNames[x]) {
            case "map":
                src = hunde1[bildNames[x]];
                break;
            case "caption":
                figcaptionText += hunde1[bildNames[x]];
                break;
            case "date":
                figcaptionText += " aufgenommen am " + hunde1[bildNames[x]] + ", ";
                break;
            case "autor":
                figcaptionText += " Autor: " + hunde1[bildNames[x]];
                break;
            default:
                break;
        }
    }
    img.setAttribute('src', src);
    img.setAttribute('alt', figcaptionText);

    figcaption.innerHTML = figcaptionText;

    /*********************thumbnail images**************/
    /*
     <div id="thumbnail">
     <img src="img/hunde1.jpg"><img src="img/hunde2.jpg"><img src="img/hunde3.jpg"><img src="img/hunde4.jpg">
     <img src="img/hunde5.jpg"><img src="img/hunde6.jpg"><img src="img/hunde7.jpg"><img src="img/hunde8.jpg">
     <img src="img/hunde9.jpg"><img src="img/hunde10.jpg">
     </div>
     */

    /*****lösch alle Kindelemente von thumbnail div falls es gint*******/
    while (thumbnailDiv.firstChild) {
        thumbnailDiv.removeChild(thumbnailDiv.firstChild);
    }
    /***************erstell img elements für thumbnail images************/
    for (let i = 0; i < bildArray.length; i++) {
        let thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('src', bildArray[i]["map"].replace(".jpg","klein.jpg"));
        thumbnailImg.setAttribute('alt', bildArray[i]["caption"]);
        /*************inizialisieren Opacity des thumbnail Images***********/
        if (i == 0)
            thumbnailImg.style.opacity = 1;
        else
            thumbnailImg.style.opacity = 0.2;
        /****************register handler funktion für Klicken der thumbnail images**********/
        thumbnailImg.onclick = function () {
            let src = thumbnailImg.getAttribute('src');
            let indexArray = bildArray.findIndex(obj => obj.map === src.replace("klein.jpg", ".jpg"));//update for add und delete
            if (indexArray != -1) {
                zeigBild(indexArray);
                thumbnailOpacity(indexArray);
                index = indexArray;
            }
        };
        thumbnailDiv.appendChild(thumbnailImg);
    }

    /**************registerie handler funktion für klicken des vor button*************/
    vor.addEventListener('click', vorfunc);
    /**************event hinzufügen auf zuruck button*************/
    zuruck.addEventListener('click', function () {
        index--;
        if (index < 0) {
            index = bilderNum - 1;
        }
        zeigBild(index);
        thumbnailOpacity(index);
    });
    /***************registerie handler funktion für klicken des diashow button***********/
    diashowButton.addEventListener('click', diashow);
    /**************registerie handler funktion für klicken des search button**********/
    searchButton.addEventListener('click', showSearchField);
    document.getElementById('searchDivButton').addEventListener('click', function () {
        let num = searchMapNumber.value;
        if ( num != "") {
            if (isNaN(num) || num < 1 || num > bilderNum) {
                alert("Name must be a number between 1 and " + bilderNum);
            } else {
                num = searchMapNumber.value;//fängt von 1 an --> user friendly, searchMapNumber ist input id
                zeigBild(num - 1);
                index = num - 1;
                thumbnailOpacity(num - 1);
            }
        }
        searchMapNumber.value = "";//clear text in input field 
    });
    /******************registerie handler funktion für klicken des add button**********/
    addButton.addEventListener('click', showAddField);
    document.getElementById('addDivButton').addEventListener('click', function () {
        let obj;
        let addObj = true;
        if (addMapName.value != "") {
            obj = {
                map: "img/" + addMapName.value + ".jpg", //input(id mapName) wert 
                caption: addCaption.value, //input(id caption) wert 
                date: addDate.value, //input(id date) wert 
                autor: addAutor.value//input(id autor) wert 
            };

            /****************erstell thumbnail image ****************/
            let thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('src', obj["map"]);
            thumbnailImg.setAttribute('alt', obj["caption"]);
            thumbnailDiv.appendChild(thumbnailImg);//fügt das img Element von thumbnail images hinzu
            
            /***************image name valiadation*****************/
            thumbnailImg.onerror = function(){
                alert("There is no image with name " + obj["map"]);
                thumbnailImg.remove();
                addObj = false;
            }
            /**********************update globale variablen*******************/
            if(addObj){
                /**************initialisieren des opacity des neu erstellte img Tlement*********/
                thumbnailImg.style.opacity = 0.2;
                bildArray.push(obj);//fügt das Objekt in bildArray hinzu
                bilderNum = bildArray.length;//update die Anzahl
                anzahl.innerHTML = index + 1 + "|" + bilderNum;//update num/anzahl
                /****************regesterier Handler Funktion für das neu thumbnail image element**************/
                thumbnailImg.onclick = function () {
                    let indexArray = bildArray.findIndex(obj => obj.map === thumbnailImg.getAttribute('src'));//update for add und delete
                    if (indexArray != -1) {
                        zeigBild(indexArray);
                        thumbnailOpacity(indexArray);
                        index = indexArray;
                    }
                };
            }
        }
        //clear text in input field 
        addMapName.value = "";//clear text in input field 
        addCaption.value = "";
        addDate.value = "";
        addAutor.value = "";
    });

    /******************registerie handler funktion für klicken des update button**********/
    updateButton.addEventListener('click', showUpdateField);
    document.getElementById('updateDivButton').addEventListener('click', function () {
        let obj;
        let num = updateMapNumber.value;
        if (num != "") {
            if (isNaN(num) || num < 1 || num > bilderNum) {
                alert("Name must be a number between 1 and " + bilderNum);
            } else {
                obj = {
                    map: "img/" + updateMapName.value + ".jpg", //input(id mapName) wert 
                    caption: updateCaption.value, //input(id caption) wert 
                    date: updateDate.value, //input(id date) wert 
                    autor: updateAutor.value//input(id autor) wert 
                };
                console.log(obj["map"]);
                /****************tausch den thumbnail Bild ****************/
                let thumbnailImg = document.createElement('img');
                thumbnailImg.setAttribute('src', obj["map"]);
                thumbnailImg.setAttribute('alt', obj["caption"]);
                //es gibt noch ein img in Galerie, index fängt von 1 an
                thumbnailDiv.replaceChild(thumbnailImg, document.getElementsByTagName('img')[num]);
                
                bildArray.splice(num - 1, 1, obj);//
                
                /****************regesterier Handler Funktion für das neu thumbnail image element**************/
                thumbnailImg.onclick = function () {
                    let indexArray = bildArray.findIndex(obj => obj.map === thumbnailImg.getAttribute('src'));//update for add und delete
                    if (indexArray != -1) {
                        zeigBild(indexArray);
                        thumbnailOpacity(indexArray);
                        index = indexArray;
                        console.log(index);
                        console.log(bildArray);
                    }
                };
                /**************initialisieren des opacity des neu erstellte img Tlement*********/
                thumbnailImg.style.opacity = 0.2;

                /**********************update bildArray, tausch des Objek*******************/
             
            }
        }
//        //clear text in input field 
//        updateMapName.value = "";//clear text in input field 
//        updateCaption.value = "";
//        updateDate.value = "";
//        updateAutor.value = "";
    });

    /******************registerie handler funktion für klicken des delete button**********/
    deleteButton.addEventListener('click', showDeleteField);
    document.getElementById('deleteDivButton').addEventListener('click', function () {
        let num = deleteMapNumber.value;//fängt von 1 an --> user friendly, deleteMapNumber ist input id
        if ( num != "") {
            if (isNaN(num) || num < 1 || num > bilderNum) {
                alert("Name must be a number between 1 and " + bilderNum);
            } else {
                bildArray.splice(num - 1, 1);//lös das Objekt vom bildArray
                thumbnailDiv.removeChild(document.getElementsByTagName('img')[num]);//los das img Element von thumbnail images
                bilderNum = bildArray.length;//update die Anzahl
                anzahl.innerHTML = index + 1 + "|" + bilderNum;//update num/anzahl
            }
        }
        deleteMapNumber.value = "";//clear text in input field 
    });
}