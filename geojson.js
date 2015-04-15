	function chooseAddr(lat, lng,type) {
	  var location = new L.LatLng(lat, lng);
	  map.panTo(location);

	  if (type == 'city' || type == 'administrative') {
		map.setZoom(11);
	  } else {
		map.setZoom(13);
	  }
	}
	
function creoCarrousel(array){
	var carousel = ""
	
    carousel = '<div id="myCarousel" class="carousel slide" data-ride="carousel">'+
      
     ' <ol class="carousel-indicators">'+
     '   <li data-target="#myCarousel" data-slide-to="0" class="active"></li>'+
     '   <li data-target="#myCarousel" data-slide-to="1"></li>'+
     '   <li data-target="#myCarousel" data-slide-to="2"></li>'+
     '   <li data-target="#myCarousel" data-slide-to="3"></li>'+
     '   <li data-target="#myCarousel" data-slide-to="4"></li>'+
    '  </ol>'+
     ' <div class="carousel-inner" role="listbox">'+
     '   <div class="item active">'+
      '    <img src="'+array[0]+'" alt="First slide">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
              
      '      </div>'+
        '  </div>'+
    '    </div>'+
      '  <div class="item">'+
      '    <img src="'+array[1]+'" alt="Second slide">'+
        '  <div class="container">'+
       '     <div class="carousel-caption">'+
        '    </div>'+
       '   </div>'+
       ' </div>'+
       ' <div class="item">'+
       '   <img src="'+array[2]+'" alt="Third slide">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
             
       '     </div>'+
      '    </div>'+
      '  </div>'+
       ' <div class="item">'+
       '   <img src="'+array[3]+'" alt="Third slide">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
             
       '     </div>'+
      '    </div>'+
      '  </div>'+
       ' <div class="item">'+
      '    <img src="'+array[4]+'" alt="Fourth slide">'+
        '  <div class="container">'+
        '    <div class="carousel-caption">'+
             
       '     </div>'+
        '  </div>'+
     '   </div>'+
    '  </div>'+
     ' <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+
      '  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
      '  <span class="sr-only">Previous</span>'+
    '  </a>'+
     ' <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">'+
      '  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
     '   <span class="sr-only">Next</span>'+
      '</a>'+
   ' </div>'
   return carousel
}

$(document).ready(function(){
	
    map = L.map('map').setView([0, 0], 13);

// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	L.marker([40.2838, -3.8215]).addTo(map)
    .bindPopup('Aulario III')
    .openPopup();
    
    
    
    map.on('click', function(e) {
		L.marker(e.latlng).addTo(map)
		.bindPopup('New Popup')
		.openPopup();
		console.log(e)
});

	map.locate({setView:true, maxZoom:16});
	map.on('locationfound',function(e) {
		
		//alert(e.lang)
	});
	
	function onLocationError(e){
		alert(e.message);
	}

	map.on('localtionerror',onLocationError);

	$("#getpop").click(function(){
		$.getJSON("buildings-urjc.json",function(data){
			//L.geoJson(data).addTo(map)
			L.geoJson(data,{onEachFeature:onEachFeature}).addTo(map)
		
		})		
		
	})
	
	
	function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup(feature.properties.Name);
    }
}



	function addr_search(){
		var inp = document.getElementById("addr");

		$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
			var items = [];

			$.each(data, function(key, val) {
				items.push(
				"<li><a href='#' onclick='chooseAddr(" +
				val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
				'</a></li>'
				);
				});
				$('#results').empty();
						if (items.length != 0) {
							$('<p>', { html: "Search results:" }).appendTo('#results');
							$('<ul/>', {
							'class': 'my-new-list',
							html: items.join('')
							}).appendTo('#results');
						} else {
							$('<p>', { html: "No results found" }).appendTo('#results');
						}
			})
		url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + inp.value + "&tagmode=any&format=json&jsoncallback=?"
		$.getJSON(url,function(data){
			
			var  array = []
			for(i=0;i<5;i++){
				//list = list + "<li><img src=" + data.items[i].media.m+ "></li>"
				array.push(data.items[i].media.m)
			}
			var carrousel = creoCarrousel(array)	//funcion que crea carrousel de tamaño 5
			$("#fotos").html(carrousel);
		})		
	};
	$('#busca').click(addr_search)
	//$('#addr').on('keyup',addr_search).keyup()
	$('#addr').keyup(addr_search)
})
	

