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
			alert("Opps.. Something went wrong and we could not fetch your data at the moment.")
		});
	}

	function initialize(data) {
		renderTraficInfo(data);
		renderMap(data);

		// Watch for sorting
		$('#sorting').on('change', function(e) {
			if (this.value === "") {
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

		for (var i = 0; i < data.length; i++) {
			(function(i) {
				createMap(data[i], map);
			})(i);
		}

		console.log("finished");
	}

	// Based on sorting type
	function renderMapByType(data, type) {
		var mapOptions = {
			center: new google.maps.LatLng(62, 15),
			zoom: 5
		};

		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		for (var i = 0; i < data.length; i++) {
			if (+type === data[i].category) {
				createMap(data[i], map);
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

		for (var i = 0; i < data.length; i++) {
			var message = getTraficinfoContent(data[i]);

			$area.append(message);
		}

	}

	// Trafic info based in sorting
	function renderTraficInfoByType(data, type) {
		$('.trafic-info-area').empty();

		var $area = $('.trafic-info-area');

		for (var i = 0; i < data.length; i++) {
			if (+type === data[i].category) {
				var message = getTraficinfoContent(data[i]);

				$area.append(message);
			}
		}
	}

	function getTraficinfoContent(traficinfo) {
		var match = traficinfo.createddate.match(/(\d+)\+(\d{4})/);
        var date = new Date(+match[1]);

		return '<div class="trafic-info">'
							+ '<h2>' + traficinfo.title + '</h2>'
							+ '<p>' + date.toDateString() + ' ' + date.getHours() + ':' +  date.getMinutes() + '</p>'
							+ '<p>' + traficinfo.description + '</p>'
							+ '<p>Kategori: ' + traficinfo.category + '</p>';
	}

	// Get data 
	getTraficinfo();
});