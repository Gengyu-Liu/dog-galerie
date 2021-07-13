
	'use strict'
	let buttonDiv = document.getElementById('buttonDiv');//div element umhüllt den Button
	let galerieButton = document.getElementById('showHideButton');//erhalten show/hide button Element
	
	let headerDiv = document.createElement('div');//erstellen header für die galerie
	let figure = document.createElement('figure');//erstellen figure für die galerie
	let thumbnailDiv = document.createElement('div');//erstellen div für Thumbnail images
	
	let anzahl;//h1 element für index/Anzahl
	let img;//img element für die galerie
	let vor;//vor button
	let zuruck;//zuruck button
	let figcaption;//figcaption element
	
	let diashowButton = document.createElement('button');//Button für Diashow 
	let addButton = document.createElement('button');//Button für Add 
	let updateButton = document.createElement('button');//Button für update 
	let searchButton = document.createElement('button');//Button für Search
	let deleteButton = document.createElement('button');//Button für Delete
	
	let buttonTextShowExist = true;//ob button text show ist
	let figureElementsExist = false;//ob figure elements schon angehängt sind
	
	//registerie handle funktion für Klicken des Toggle hide/show button (beim klicken: show/hide)
	galerieButton.addEventListener('click', function(){	
	
	let buttonTextShow = "show the Galerie";//button text, um die Galerie zu zeigen
	let ButtonTextHide = "hide the Galerie";//button text, um die Galerie zu verstecken
	
	if(!figureElementsExist){//wenn figure elements noch nicht erstellt wird
			//createFigureElements(20,"img/pudel1.jpg","caption");
			readJson('bilder');
			figureElementsExist = true;
		}
		if(buttonTextShowExist){//wenn button text "show" ist		
			showGalerie();	
			galerieButton.innerHTML = "hide the Galerie";		
			buttonTextShowExist = false;			
		}
		else{//wenn button text "hide" ist
			hideGalerie();
			galerieButton.innerHTML = "show the Galerie";
			buttonTextShowExist = true;
		}
	});
	function showGalerie(){//zeig die Galerie an
		headerDiv.style.display = "block";
		figure.style.display = "block";
		thumbnailDiv.style.display = "flex";
		diashowButton.style.display = "inline-block";
		searchButton.style.display = "inline-block";
		addButton.style.display = "inline-block";
		updateButton.style.display = "inline-block";
		deleteButton.style.display = "inline-block";
	}
	function hideGalerie(){//versteck die Gelerie
		headerDiv.style.display = "none";
		figure.style.display = "none";
		thumbnailDiv.style.display = "none";
		diashowButton.style.display = "none";
		searchButton.style.display = "none";
		addButton.style.display = "none";
		updateButton.style.display = "none";
		deleteButton.style.display = "none";
	}
	function createFigureElements(num, src, figcaptionString){//erstell alle elemente für die Galerie
		/***************headerDiv*****************/
		/*
		<div id="headerDiv">
			<h1 id="anzahl">1|20</h1>			
			<h1>WUFF WUFF - HUNDE IN DER GALERIE</h1>
		</div>
		*/
		headerDiv.setAttribute('id','headerDiv');
		anzahl = document.createElement('h1');
		anzahl.setAttribute('id','anzahl');
		let anzahlTextNode = document.createTextNode("1|" + num);//soll vom bilder.json lesen
		anzahl.appendChild(anzahlTextNode);
		
		let header = document.createElement('h1');
		let headerText = document.createTextNode("WUFF WUFF - HUNDE IN DER GALERIE");
		header.appendChild(headerText);
		headerDiv.appendChild(anzahl);
		headerDiv.appendChild(header);
		
		/***************figure*************/
		/*
		<figure>
			<div id="imageDiv">
				<a id="zuruck">&#10094;</a>
				<a id="vor">&#10095;</a>
				<img src="img/pudel3.jpg" alt="pudel">
			</div>
			<figcaption>figcaptionText</figcaption>
		</figure>
		*/
		let imageDiv = document.createElement('div');
		imageDiv.setAttribute('id','imageDiv');
		
		/**************<a id="zuruck">&#10094;</a>************/
		zuruck = document.createElement('a');
		zuruck.setAttribute('id','zuruck');
		zuruck.innerHTML = '&#10094;';//createTextNode kennt unicode nicht
		imageDiv.appendChild(zuruck);
		
		/***************<a id="vor">&#10095;</a>***************/
		vor = document.createElement('a');
		vor.setAttribute('id','vor');
		vor.innerHTML = '&#10095;';
		imageDiv.appendChild(vor);
		
		/**************<img src="img/pudel3.jpg" alt="pudel">*************/
		img = document.createElement('img');
		img.setAttribute('src',src);
		img.setAttribute('alt',figcaptionString);
		imageDiv.appendChild(img);
		
		figure.appendChild(imageDiv);
		/*****************<figcaption>figcaptionText</figcaption>*************/
		figcaption = document.createElement('figcaption');
		let figcaptionText = document.createTextNode(figcaptionString);
		figcaption.appendChild(figcaptionText);
		
		figure.appendChild(figcaption);
		/*********************thumbnail images**************/
		/*
		<div id="thumbnail">
			<img src="img/hunde1.jpg"><img src="img/hunde2.jpg"><img src="img/hunde3.jpg"><img src="img/hunde4.jpg">
			<img src="img/hunde5.jpg"><img src="img/hunde6.jpg"><img src="img/hunde7.jpg"><img src="img/hunde8.jpg">
			<img src="img/hunde9.jpg"><img src="img/hunde10.jpg">
		</div>
		*/
		/***************<div id="thumbnail"><img></div>*******************/
		
		thumbnailDiv.setAttribute('id','thumbnail');
		
		
		document.body.insertBefore(headerDiv, buttonDiv);
		
		document.body.insertBefore(figure, buttonDiv);
		
		document.body.insertBefore(thumbnailDiv, buttonDiv);
		/****************Play/Stop button: <button id="diashow"><i class="fas fa-play"></i></button>***********/
		
		diashowButton.setAttribute('id','diashow');
		diashowButton.innerHTML = '<i class="fas fa-play"></i>';
		buttonDiv.appendChild(diashowButton);
		/****************search button: <button id="searchButton"><i class="fas fa-search"></i></button>***********/
		
		searchButton.setAttribute('id','searchButton');
		searchButton.innerHTML = '<i class="fas fa-search"></i>';
		buttonDiv.appendChild(searchButton);		
		
		/****************plus button: <button id="addButton"><i class="fas fa-plus"></i></button>***********/
		
		addButton.setAttribute('id','addButton');
		addButton.innerHTML = '<i class="fas fa-plus"></i>';
		buttonDiv.appendChild(addButton);
		
		/***************<button type="button" id="updateButton"><i class="fas fa-edit"></i></button>*********/
		
		updateButton.setAttribute('id','updateButton');
		updateButton.innerHTML = '<i class="fas fa-edit"></i>';
		buttonDiv.appendChild(updateButton);
		
		/****************delete button: <button id="deleteButton"><i class="fas fa-minus"></i></button>***********/
		
		deleteButton.setAttribute('id','deleteButton');
		deleteButton.innerHTML = '<i class="fas fa-minus"></i>';
		buttonDiv.appendChild(deleteButton);
			
	}