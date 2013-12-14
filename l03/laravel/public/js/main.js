$(function() {
	function getTraficinfo() {
		var xhr = $.ajax({
			url: '/traficinfo',
			accepts: 'json'
		});

		xhr.done(function(data) {
			initialize(data);
		});

		xhr.fail(function(err) {
			console.log(err);
		});
	}

	function initialize(data) {
		renderTraficInfo(data);
		renderMap(data);

		// Watch for sorting
		$('#sorting').on('change', function(e) {
			if (this.value === "") {
				console.log("kommer");
				renderTraficInfo(data);
				renderMap(data);
			}

			renderMapByType(data, this.value);
			renderTraficInfoByType(data, this.value);
		});
	}

	// All information
	function renderMap(data, sorting) {
		$('#map-canvas').empty();

		var mapOptions = {
			center: new google.maps.LatLng(62, 15),
			zoom: 5
		};

		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		for (var i = 0; i < data.messages.length; i++) {
			(function(i) {
				createMap(data.messages[i], map);
			})(i);
		}
	}

	// Based on sorting type
	function renderMapByType(data, type) {
		var mapOptions = {
			center: new google.maps.LatLng(62, 15),
			zoom: 5
		};

		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		for (var i = 0; i < data.messages.length; i++) {
			if (+type === data.messages[i].category) {
				createMap(data.messages[i], map);
			}
		}
	}

	// Plots markers with information on map
	function createMap(traficinfo, map) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(traficinfo.latitude, traficinfo.longitude),
			title: traficinfo.title,
			map: map
		});

		// Does not work invalid date
		// var regex = /Date\((\d+)\+(\d+)\)/;

		// var date = data.messages[i].createddate.match(regex);

		
		var message = getTraficinfoContent(traficinfo);

		var infowindow = new google.maps.InfoWindow({
			content: message
		});

		(function(marker, infowindow) {
			google.maps.event.addListener(marker, 'click', function() {
    			infowindow.open(map,marker);
  			});	
		})(marker, infowindow);
		
		marker.setMap(map);
	}

	// All traficinfo
	function renderTraficInfo(data) {
		$('.trafic-info-area').empty();
		var $area = $('.trafic-info-area');

		for (var i = 0; i < data.messages.length; i++) {
			var message = getTraficinfoContent(data.messages[i]);

			$area.append(message);
		}

	}

	// Trafic info based in sorting
	function renderTraficInfoByType(data, type) {
		$('.trafic-info-area').empty();

		var $area = $('.trafic-info-area');

		for (var i = 0; i < data.messages.length; i++) {
			if (+type === data.messages[i].category) {
				var message = getTraficinfoContent(data.messages[i]);

				$area.append(message);
			}
		}
	}

	function getTraficinfoContent(traficinfo) {
		return '<div class=".trafic-info">'
							+ '<h2>' + traficinfo.title + '</h2>'
							+ '<p>' + traficinfo.createddate + '</p>'
							+ '<p>' + traficinfo.description + '</p>'
							+ '<p>Kategori: ' + traficinfo.category + '</p>';
	}

	// Get data 
	getTraficinfo();
});