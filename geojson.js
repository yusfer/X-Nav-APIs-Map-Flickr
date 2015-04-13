	function chooseAddr(lat, lng,type) {
	  var location = new L.LatLng(lat, lng);
	  map.panTo(location);

	  if (type == 'city' || type == 'administrative') {
		map.setZoom(11);
	  } else {
		map.setZoom(13);
	  }
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
			
	};
	$('#busca').click(addr_search)
})
	
/*
	}

});*/


