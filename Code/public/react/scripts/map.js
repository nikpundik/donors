var AddForm = window.AddForm;
var DonorInfo = window.DonorInfo;

var DonorsMap = React.createClass({

	donors: [],
	markers: [],
	map: null,
	bounds: null,

	getInitialState: function() {
		return {position: {x:0, y:0}, addVisible: false};
	},

	loadMap: function() {
		var mapDiv = ReactDOM.findDOMNode(this.refs.map);
		this.map = new google.maps.Map(mapDiv, {
			center: {lat: 15.540, lng: 30.44},
			zoom: 8
		});
		this.geolocate();
		this.addListeners();
	},

	updateDonors: function() {
		this.socket.emit('getDonors', this.bounds);
	},

	loadDonorsFromSocket: function() {
		var ref = this;
		this.socket = io();
		this.socket.on('gotDonors', function(donors) {
			ref.donors = donors;
			ref.placeMarkers();
		});
		this.socket.on('updatedDonor', function(atCoords) {
			ref.updateDonors();
		});
	},

	clearMarkers: function() {
		for (var i = 0; i < this.markers.length; i++) {
	    	this.markers[i].setMap(null);
	  	}
	  	this.markers = [];
	},

	placeMarkers: function() {
		this.clearMarkers();
		for (var i=0; i<this.donors.length; i++) {
			var donor = this.donors[i];
			try {
				var marker = this.getMarker(donor);
				this.markers.push(marker);
			} catch (e) {
				console.log('Error parsing donor');
			}
		}
	},

	getMarker: function(donor) {
		var ref = this;
		var latlng = new google.maps.LatLng(donor.coords.x, donor.coords.y);

		var marker = new google.maps.Marker({
			position: latlng,
			map: this.map,
			icon: 'img/blood-drop-icon.png'
		});

		marker.donor = donor;

		marker.addListener('click', function() {
			var div = document.createElement("DIV");
			ReactDOM.render(<DonorInfo donor={donor} />, div);
			var infowindow = new google.maps.InfoWindow({
				content: div
			});
			infowindow.open(ref.map, marker);
		});

		return marker;

	},

	geolocate: function() {
		var ref = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				ref.map.setCenter(pos);
			}, function() {});
		}
	},

	addListeners: function() {
		var ref = this;

		this.map.addListener('idle', function() {
			ref.bounds = ref.map.getBounds().toJSON();
			ref.updateDonors();
		});

		this.map.addListener('click', function(e) {
			ref.setState({
				position: {
					x: e.latLng.lat(), 
					y: e.latLng.lng()
				},
				addVisible: true
			});
		});
	},

	addHide: function(needUpdate) {
		this.setState({
			addVisible: false
		});
		if (needUpdate)
			this.updateDonors(); 
	},

	componentDidMount: function() {
		this.loadMap();
		this.loadDonorsFromSocket();
	},

	render: function() {
		return (
			<div id="mapContainer">
				<div ref="map" id="map">
					Loading..
				</div>
				{
					this.state.addVisible
						? <AddForm position={this.state.position} hideFunction={this.addHide}></AddForm>
						: null
				}
			</div>
		);
	}

});

window.DonorsMap = DonorsMap;