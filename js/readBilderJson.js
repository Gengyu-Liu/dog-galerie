	"use strict"
	let bildArray;//Bilder Array von bilder.json
	let bilderNum = 0;//Anzahl der Bilder
	let index = 0;//welche Bild wird jetzt gezeigt

	/*************Variablen in showGalerie.js
		let anzahl;//h1 element für index/Anzahl
		let vor;//vor button
		let zuruck;//zuruck button
		let img;//img element für die galerie
		let figcaption;//figcaption element
		let thumbnailDiv; //div element für thumbnail
		let diashowButton;//Button für Diashow 
		let diashowButton;//Button für Diashow 
		let addButton;//Button für Add 
		let searchButton;//Button für Search
		let deleteButton;//Button für Delete
	**************/
	
	function readJson(nameJson){
		let xhr = new XMLHttpRequest();		
		xhr.open('GET', 'extern/' + nameJson + '.json', true);
		xhr.send(null);		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				let bilderObj = JSON.parse(xhr.responseText);
				let bilderArten = Object.keys(bilderObj);//Namen der eigenschaften
				bildArray = bilderObj[bilderArten[0]];
				bilderNum = bildArray.length;//Anzahl der Bilder
				let hunde1 = bildArray[0];//das erste Objekt
				/**************erhalt das erste Objekt für createFigureElements*************/
				let src;
				let figcaptionText = "";
				let bildNames = Object.keys(bildArray[0]);
					for(let x = 0; x < bildNames.length; x++){
						switch(bildNames[x]){
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
								figcaptionText += " Quelle: " + hunde1[bildNames[x]];
								break;
							default: break;
						}
					}
				createFigureElements(bilderNum, src, figcaptionText);	
				
				
				/***************erstell img elements für thumbnail images************/
				for(let i = 0; i < bildArray.length; i++){
					let thumbnailImg = document.createElement('img');
					thumbnailImg.setAttribute('src',bildArray[i]["map"]);
					thumbnailImg.setAttribute('alt',bildArray[i]["caption"]);
					/*************inizialisieren Opacity des thumbnail Images***********/
					if(i == 0)
						thumbnailImg.style.opacity = 1;
					else
						thumbnailImg.style.opacity = 0.2;
					/****************register handler funktion für Klicken der thumbnail images**********/
					thumbnailImg.onclick = function(){
						let indexArray = bildArray.findIndex(obj => obj.map === thumbnailImg.getAttribute('src'));//update for add und delete
						if(indexArray != -1){
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
				zuruck.addEventListener('click',function(){
					index--;
					if(index < 0){
						index = bilderNum - 1;	
					}
					zeigBild(index);
					thumbnailOpacity(index);
				});	
				/***************registerie handler funktion für klicken des diashow button***********/
				diashowButton.addEventListener('click', diashow);
				
				/**************registerie handler funktion für klicken des search button**********/
				searchButton.addEventListener('click', showSearchField);
				document.getElementById('searchDivButton').addEventListener('click', function(){
					let num;
					if(searchMapNumber.value != ""){
						num = searchMapNumber.value;//fängt von 1 an --> user friendly, searchMapNumber ist input id
						zeigBild(num - 1);
						index = num - 1;
						thumbnailOpacity(num - 1);
					}
					searchMapNumber.value = "";//clear text in input field 
				});
				
				/******************registerie handler funktion für klicken des add button**********/
				addButton.addEventListener('click', showAddField);
				document.getElementById('addDivButton').addEventListener('click', function(){
					let obj;
					if(addMapName.value != ""){
						obj = {
							map:"img/" + addMapName.value + ".jpg",//input(id mapName) wert 
							caption:addCaption.value,//input(id caption) wert 
							date:addDate.value,//input(id date) wert 
							autor:addAutor.value//input(id autor) wert 
						};
					
						/****************erstell thumbnail image ****************/
						let thumbnailImg = document.createElement('img');
						thumbnailImg.setAttribute('src',obj["map"]);
						thumbnailImg.setAttribute('alt',obj["caption"]);
						thumbnailDiv.appendChild(thumbnailImg);//fügt das img Element von thumbnail images hinzu
						
						/****************regesterier Handler Funktion für das neu thumbnail image element**************/
						thumbnailImg.onclick = function(){
						let indexArray = bildArray.findIndex(obj => obj.map === thumbnailImg.getAttribute('src'));//update for add und delete
							if(indexArray != -1){
								zeigBild(indexArray);
								thumbnailOpacity(indexArray);
								index = indexArray;
							}
						};
						/**************initialisieren des opacity des neu erstellte img Tlement*********/
						thumbnailImg.style.opacity = 0.2;
						
						/**********************update globale variablen*******************/
						bildArray.push(obj);//fügt das Objekt in bildArray hinzu
						bilderNum = bildArray.length;//update die Anzahl
						anzahl.innerHTML = index + 1 + "|" + bilderNum;//update num/anzahl
					}
					//clear text in input field 
					addMapName.value = "";//clear text in input field 
					addCaption.value = "";
					addDate.value = "";
					addAutor.value = "";
				});
				
				/******************registerie handler funktion für klicken des update button**********/
				updateButton.addEventListener('click', showUpdateField);
				document.getElementById('updateDivButton').addEventListener('click', function(){
					let obj;
					let index = updateMapNumber.value;
					if(index != ""){
						if(isNaN(index) || index < 1 || index > bilderNum){
							alert("Name must be a number between 1 and the total number of all the images");
						}
						else{
							obj = {
							map:"img/" + updateMapName.value + ".jpg",//input(id mapName) wert 
							caption:updateCaption.value,//input(id caption) wert 
							date:updateDate.value,//input(id date) wert 
							autor:updateAutor.value//input(id autor) wert 
						};
					
						/****************tausch den thumbnail Bild ****************/
						let thumbnailImg = document.createElement('img');
						thumbnailImg.setAttribute('src',obj["map"]);
						thumbnailImg.setAttribute('alt',obj["caption"]);
						//es gibt noch ein img in Galerie, index fängt von 1 an
						thumbnailDiv.replaceChild(thumbnailImg, document.getElementsByTagName('img')[index]);
						
						/****************regesterier Handler Funktion für das neu thumbnail image element**************/
						thumbnailImg.onclick = function(){
						let indexArray = bildArray.findIndex(obj => obj.map === thumbnailImg.getAttribute('src'));//update for add und delete
							if(indexArray != -1){
								zeigBild(indexArray);
								thumbnailOpacity(indexArray);
								index = indexArray;
							}
						};
						/**************initialisieren des opacity des neu erstellte img Tlement*********/
						thumbnailImg.style.opacity = 0.2;
						
						/**********************update bildArray, tausch des Objek*******************/
						bildArray.splice(index - 1, 1, obj);//
				
						}						
					}
					//clear text in input field 
					updateMapName.value = "";//clear text in input field 
					updateCaption.value = "";
					updateDate.value = "";
					updateAutor.value = "";
				});
				
				/******************registerie handler funktion für klicken des delete button**********/
				deleteButton.addEventListener('click', showDeleteField);
				document.getElementById('deleteDivButton').addEventListener('click', function(){
					let num;
					if(deleteMapNumber.value != ""){
						num = deleteMapNumber.value;//fängt von 1 an --> user friendly, deleteMapNumber ist input id
						if(isNaN(num) || num < 1 || num > bilderNum){
							alert("Name must be a number between 1 and the total number of all the images");
						}
						else{
							let src = bildArray[num - 1];
							bildArray.splice(num - 1, 1);//lös das Objekt vom bildArray
							thumbnailDiv.removeChild(document.getElementsByTagName('img')[num]);//los das img Element von thumbnail images
							bilderNum = bildArray.length;//update die Anzahl
							anzahl.innerHTML = index + 1 + "|" + bilderNum;//update num/anzahl
						}
					}
					deleteMapNumber.value = "";//clear text in input field 
				});
			}
		}
	}
	/**************************diashow start and stop*****************/			
	let idInt = 0;//interval id
	let idTimeout = 0;//timeout id
	function diashow(){//start and stop, stop automatic after 15 secs if no reaction	
		if(idInt == 0){
			//index = -1;//diashow beginnt immer von vorne an
			diashowButton.innerHTML = '<i class="fas fa-stop"></i>';
			idInt = window.setInterval(vorfunc,1000);
			idTimeout = window.setTimeout(stop,15000);
			
			/*************versteck vor und zurueck botton beim diashow starten***********/
			vor.style.display = "none";
			zuruck.style.display = "none";
		}
		else stop();
	}
	
	/*******************diashow stop function*******************/
	function stop(){
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
	function vorfunc(){
		index++;
		if(index >= bilderNum){	index = 0;}
		zeigBild(index);
		thumbnailOpacity(index);
	}
	
	/**********welche Bild wird angezeigt************/
	function zeigBild(num){
		let figcaptionText = "";
		img.setAttribute('src', bildArray[num]["map"]);
		figcaptionText = bildArray[num]["caption"] + " aufgenommen am " + bildArray[num]["date"] + ", "
		+ " Quelle: " + bildArray[num]["autor"];
		img.setAttribute('alt', figcaptionText);
		figcaption.innerHTML = figcaptionText;
		anzahl.innerHTML = num + 1 + "|" + bilderNum;//update num/anzahl
	}
	function thumbnailFunc(i){
		zeigBild(i);
		thumbnailOpacity(i);
		index = i;
	}
	/**********set opacity für alle thumbnail images**********/
	function thumbnailOpacity(num){
		let thumbnailImages = document.getElementsByTagName('img');//thumbnail images ausser [0](für die Galerie)
		
		for(let i = 1; i < thumbnailImages.length; i++){
			if(num == i - 1)
				thumbnailImages[i].style.opacity = 1;
			else
				thumbnailImages[i].style.opacity = 0.2;
		}
	}
	/***********************handler function des add button******************/
	let addFieldExist = false;//ob add field existiert 
	function showAddField(){
		if(!addFieldExist){
			document.getElementById('addDiv').style.display = "block";
			addFieldExist = true;
		}
		else{
			document.getElementById('addDiv').style.display = "none";
			addFieldExist = false;
		}
	}
	/***********************handler function des update button******************/
	let updateFieldExist = false;//ob update field existiert 
	function showUpdateField(){
		if(!updateFieldExist){
			document.getElementById('updateDiv').style.display = "block";
			updateFieldExist = true;
		}
		else{
			document.getElementById('updateDiv').style.display = "none";
			updateFieldExist = false;
		}
	}
	/***********************handler function des search button******************/
	let searchFieldExist = false;//ob search field existiert 
	function showSearchField(){
		if(!searchFieldExist){
			document.getElementById('searchDiv').style.display = "block";
			searchFieldExist = true;
		}
		else{
			document.getElementById('searchDiv').style.display = "none";
			searchFieldExist = false;
		}
	}
	/***********************handler function des delete button******************/
	let deleteFieldExist = false;//ob delete field existiert 
	function showDeleteField(){
		if(!deleteFieldExist){
			document.getElementById('deleteDiv').style.display = "block";
			deleteFieldExist = true;
		}
		else{
			document.getElementById('deleteDiv').style.display = "none";
			deleteFieldExist = false;
		}
	}