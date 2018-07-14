
var population = {

				"Khemisset"	:"281000",
				"Ait Mimoune"	:"8254",
				"Ait Yadine"	:"20500",
				"Tiflet"	:"86000",
				"Khemis Sidi Yahya"	:"6700",
				"M'Qam Tolba"	:"13500",
				"Sidi Allal El Bahraoui"	:"15600",
				"Oulmes"	:"18700",
				"Rommani"	:"12300",
				"Ain Essbite"	:"11000",
				"Brachoua"	:"12000",
				"El Ganzra"	:"13200",
				"Maaziz"	:"11500",
				"Tiddas"	:"10000",
				"Ait Ichou"	:"10000",
				"Sidi Allal Lamsadder"	:"7400",
				"Houdderane"	:"6400"
				
				}

var x = "Khemisset";

// count markers for each commune

function pops(arr, x){

var count = 0;

for (var k=0; k < arr.features.length; k ++) {


	if (arr.features[k].properties.commune == x) { 
					
				count = count + 1;	

				}
			}
	console.log(count);
}



function stats(e){

	let layer = e.target;

	let  min = 20000;





}


//vars for layers will be shown on layer control
	var markers = L.layerGroup();
	var Khemissetmrk = L.layerGroup();
  	var regions = L.layerGroup();
	var provinces = L.layerGroup();
	var communes = L.layerGroup();

	var map = L.map('map', {
		center: [33.80, -6.21],                  //[29.38217507514529, -8.7451171875],
		zoom: 9,
    layers: [provinces, regions, communes, markers, Khemissetmrk]
	});

	// var map1 = L.map('map1', {
	// 	center: [29.38217507514529, -8.7451171875],
	// 	zoom: 6,
 //    layers: [provinces, regions]
	// });

	var basemap1 = L.tileLayer('https://api.mapbox.com/styles/v1/sidgis/cjj8lafxc3f032snzbhbhxe7y/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lkZ2lzIiwiYSI6ImM3RE1lZE0ifQ.LuNNRrO9LcVKs2dN_HvVBg', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// var basemap2 = L.tileLayer('https://api.mapbox.com/styles/v1/sidgis/cjj8lafxc3f032snzbhbhxe7y/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lkZ2lzIiwiYSI6ImM3RE1lZE0ifQ.LuNNRrO9LcVKs2dN_HvVBg', {
	// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(map1);

	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Morocco</h4>' +  (props ?'<b>' + props.name + '</b><br />': 'Hover over a commune');
	};
	info.addTo(map);

	var baseLayers = {
		"Random markers": markers,
		"Markers of Khemisset": Khemissetmrk
	};
// vars for IDs of layers control 
	var overlays = {
		"Random markers": markers,
		"Communes": communes,
		"Provinces": provinces,
		"Regions": regions
  };
// vars which will carry data of GeoJson files
  var geojsonfile1 = null;
	var geojsonfile2 = null;
	var geojsonfile3 = null;
	var geojsonmarkers = null;
	var geojsonmrk = null;
	//var alllayers = (geojsonfile1, geojsonfile2);
	//var basemaps = baseLayers;

  // Get GeoJSON and put on it on the map when it loads

  var markericon = L.icon({
	iconUrl: 'icons/Map-marker-02.png',
	iconSize: [36,36],
	iconAnchor: [18,18]
  });
//functions for hover and onClick on layers
    var geohover;

    function resetHighlight(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 1,
			stroke: true,
			color: "red",
			fill: true,
			fillColor: getColor(layer.feature.properties.osm_id),
			dashArray: '',
			fillOpacity: 2
		});
        info.update(layer.feature.properties);
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

  	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 2,
			stroke: true,
			color: "red",
			fill: true,
			fillColor: "yellow",
			dashArray: '',
			fillOpacity: .99
		});
        info.update(layer.feature.properties);
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}
//adding GeoJson files to be overlays on the map
	// $.getJSON("data/Random-Markers.geojson",function(data4){
	// 		geojsonmarkers = L.geoJson(data4,{
 //                pointToLayer: function (feature, latlng) {
 //                     var marker1 = L.marker(latlng,{icon: markericon});
 //                     return marker1;
 //                 }
	// 	    }).addTo(markers);
	// });

  $.getJSON("data/region_Maroc_bis.geojson",function(data1){
      geojsonfile1 = L.geoJson(data1,{
			    onEachFeature: function (feature, layer) {
					    layer.bindTooltip(feature.properties.name_1);
			}, //onEachFeature
  	}).addTo(regions);
  });

	$.getJSON("data/Province-mise-a-jour-2009_region.geojson",function(data2){
			geojsonfile2 = L.geoJson(data2,{
				      //onEachFeature: onEachFeature
		}).addTo(provinces);
	});

function getColor(d) {
		if (d == 2821038 ) {
			return "green" 
		}else{
			return "white"
		}
    
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.osm_id),
        weight: 1,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: .99
    };
}

// L.geoJson(statesData, {style: style}).addTo(map)


	$.getJSON("data/communes.geojson",function(data3){
			geojsonfile2 = L.geoJson(data3,{
				      onEachFeature: onEachFeature,
				      style: style
		}).addTo(communes);
	});

	var Icon = L.Icon.extend({
    options:{
        iconSize: [30,30],
        iconAnchor: [18,18],
        popupAnchor: [0,-6]
    }
});

// Create specific icons
var ca = new Icon({iconUrl: 'MJS_icones/Jeunesse/PNG 1x/CA1.png'});
var ce = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/ce1.png'});
var cfp = new Icon({iconUrl: 'MJS_icones/Affaires Féminines/PNG 1x/cfp1.png'});
var csj = new Icon({iconUrl: 'MJS_icones/Jeunesse/PNG 1x/CSJ1.png'});
var cspi = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/cspi1.png'});
var ct = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/ct1.png'});
var ff = new Icon({iconUrl: 'MJS_icones/Affaires Féminines/PNG 1x/ff1.png'});
var ge = new Icon({iconUrl: 'MJS_icones/Affaires Féminines/PNG 1x/GE1.png'});
var mj = new Icon({iconUrl: 'MJS_icones/Jeunesse/PNG 1x/mj1.png'});
var pa = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/pa1.png'});
var po = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/POO1.png'});
var poo = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/POO1.png'});
var sc = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/sc1.png'});
var tgjg = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/tgjg1.png'});
var tgjng = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/tgjng1.png'});
var to = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/to1.png'});
var tpgj = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/tpjg1.png'});
var tpjng = new Icon({iconUrl: 'MJS_icones/Sport/PNG 1x/tpjng1.png'});

	$.getJSON("data/Markers-Khemisset.geojson",function(data5){
			geojsonmrk = L.geoJson(data5,{
				onEachFeature: function (feature, layer) {
					layer.bindPopup(feature.properties.NAME);
					}, pointToLayer: function (feature, latlng) {
						if (feature.properties.Abréviatio == "CA"){
							var marker = L.marker(latlng,{icon: ca});
						} else if (feature.properties.Abréviatio == "CE"){
							var marker = L.marker(latlng,{icon: ce});
						} else if (feature.properties.Abréviatio == "CFP"){
							var marker = L.marker(latlng, {icon: cfp});
						} else if (feature.properties.Abréviatio == "CSJ"){
							var marker = L.marker(latlng,{icon: csj});
						} else if (feature.properties.Abréviatio == "CSPI"){
							var marker = L.marker(latlng, {icon: cspi});
						} else if (feature.properties.Abréviatio == "CT"){
							var marker = L.marker(latlng,{icon: ct});
						} else if (feature.properties.Abréviatio == "FF"){
							var marker = L.marker(latlng,{icon: ff});
						} else if (feature.properties.Abréviatio == "GE"){
                            var marker = L.marker(latlng,{icon: ge});
						} else if (feature.properties.Abréviatio == "MJ"){
							var marker = L.marker(latlng,{icon: mj});
						} else if (feature.properties.Abréviatio == "PA"){
							var marker = L.marker(latlng,{icon: pa});
						} else if (feature.properties.Abréviatio == "PO"){
							var marker = L.marker(latlng,{icon: poo});
						} else if (feature.properties.Abréviatio == "POO"){
							var marker = L.marker(latlng,{icon: poo});
						} else if (feature.properties.Abréviatio == "SC"){
							var marker = L.marker(latlng,{icon: sc});
						} else if (feature.properties.Abréviatio == "TGJG"){
							var marker = L.marker(latlng,{icon: tgjg});
						} else if (feature.properties.Abréviatio == "TGJNG"){
							var marker = L.marker(latlng,{icon: tgjng});
						} else if (feature.properties.Abréviatio == "TO"){
							var marker = L.marker(latlng,{icon: to});
						} else if (feature.properties.Abréviatio == "TPGJ"){
							var marker = L.marker(latlng,{icon: tpgj});
						} else if (feature.properties.Abréviatio == "TPJNG"){
							var marker = L.marker(latlng,{icon: tpjng});
						}
					return marker;
                    }
		}).addTo(Khemissetmrk);
	});

	L.control.layers(baseLayers, overlays, {
		hideSingleBase: true,
		collapsed: false
	}).addTo(map);

	//L.control.selectLayers(baseLayers, overlays).addTo(map);
