'use strict'

/********read json variables********/
let bildArray;//Bilder Array von bilder.json
let bilderNum = 0;//Anzahl der Bilder
let index = 0;//welche Bild wird jetzt gezeigt
let bilderArten; //unterschiedliche Items

/********HTML elements and flags********/
let buttonDiv = document.getElementById('buttonDiv');//div element umhüllt den Button
let galerieButton1 = document.getElementById('item1');//erhalten show/hide hunde1 button Element
let galerieButton2 = document.getElementById('item2');//erhalten show/hide hunde2 button Element	

let anzahl = document.getElementById('anzahl');//h1 element für index/Anzahl
let img = document.getElementById('hauptbild');//img element für die galerie
let vor = document.getElementById('vor');//vor button
let zuruck = document.getElementById('zuruck');//zuruck button
let figcaption = document.getElementsByTagName('figcaption')[0];//figcaption element

let headerDiv = document.getElementById('headerDiv');//header für die galerie
let figure = document.getElementsByTagName('figure')[0];//figure für die galerie
let thumbnailDiv = document.getElementById('thumbnail');//div für Thumbnail images

let diashowButton = document.getElementById('diashow');//Button für Diashow 
let addButton = document.getElementById('add');//Button für Add 
let updateButton = document.getElementById('update');//Button für update 
let searchButton = document.getElementById('search');//Button für Search
let deleteButton = document.getElementById('delete');//Button für Delete

let itemExists = false; //ob item buttons existieren

