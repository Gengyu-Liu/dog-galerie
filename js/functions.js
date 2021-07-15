
/**************************diashow start and stop*****************/
let idInt = 0;//interval id
let idTimeout = 0;//timeout id
function diashow() {//start and stop, stop automatic after 15 secs if no reaction	
    if (idInt == 0) {
        //index = -1;//diashow beginnt immer von vorne an
        diashowButton.innerHTML = '<i class="fas fa-stop"></i>';
        idInt = window.setInterval(vorfunc, 1000);
        idTimeout = window.setTimeout(stop, 15000);

        /*************versteck vor und zurueck botton beim diashow starten***********/
        vor.style.display = "none";
        zuruck.style.display = "none";
    } else
        stop();
}

/*******************diashow stop function*******************/
function stop() {
    window.clearInterval(idInt);
    window.clearTimeout(idTimeout);
    diashowButton.innerHTML = '<i class="fas fa-play"></i>';
    idInt = 0;
    idTimeout = 0;
    /*************zeig vor und zurueck botton wieder an beim diashow stoppen***********/
    vor.style.display = "block";
    zuruck.style.display = "block";
}
/*******************vorButton's handler funktion*************************/
function vorfunc() {
    index++;
    if (index >= bilderNum) {
        index = 0;
    }
    zeigBild(index);
    thumbnailOpacity(index);
}

/**********welche Bild wird angezeigt************/
function zeigBild(num) {
    let figcaptionText = "";
    img.setAttribute('src', bildArray[num]["map"]);
    figcaptionText = bildArray[num]["caption"] + " aufgenommen am " + bildArray[num]["date"] + ", "
            + " Autor: " + bildArray[num]["autor"];
    img.setAttribute('alt', figcaptionText);
    figcaption.innerHTML = figcaptionText;
    anzahl.innerHTML = num + 1 + "|" + bilderNum;//update num/anzahl
}
/**********set opacity für alle thumbnail images**********/
function thumbnailOpacity(num) {
    let thumbnailImages = document.getElementsByTagName('img');//thumbnail images ausser [0](für die Galerie)

    for (let i = 1; i < thumbnailImages.length; i++) {
        if (num == i - 1)
            thumbnailImages[i].style.opacity = 1;
        else
            thumbnailImages[i].style.opacity = 0.2;
    }
}
/***********************handler function des add button******************/
let addFieldExist = false;//ob add field existiert 
function showAddField() {
    if (!addFieldExist) {
        document.getElementById('addDiv').style.display = "block";
        addFieldExist = true;
    } else {
        document.getElementById('addDiv').style.display = "none";
        addFieldExist = false;
    }
}
/***********************handler function des update button******************/
let updateFieldExist = false;//ob update field existiert 
function showUpdateField() {
    if (!updateFieldExist) {
        document.getElementById('updateDiv').style.display = "block";
        updateFieldExist = true;
    } else {
        document.getElementById('updateDiv').style.display = "none";
        updateFieldExist = false;
    }
}
/***********************handler function des search button******************/
let searchFieldExist = false;//ob search field existiert 
function showSearchField() {
    if (!searchFieldExist) {
        document.getElementById('searchDiv').style.display = "block";
        searchFieldExist = true;
    } else {
        document.getElementById('searchDiv').style.display = "none";
        searchFieldExist = false;
    }
}
/***********************handler function des delete button******************/
let deleteFieldExist = false;//ob delete field existiert 
function showDeleteField() {
    if (!deleteFieldExist) {
        document.getElementById('deleteDiv').style.display = "block";
        deleteFieldExist = true;
    } else {
        document.getElementById('deleteDiv').style.display = "none";
        deleteFieldExist = false;
    }
}


