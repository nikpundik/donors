var DonorForm = window.DonorForm;
var Link = window.ReactRouter.Link;

var EditForm = React.createClass({

	getInitialState: function() {
		return {error: '', success: '', donor: null, deleted: false};
	},

  	submit: function(data) {

  		var ref = this;

  		$.ajax({
			url: "api/update",
			method: 'POST',
			data: data
		}).done(function(response) {
			ref.handleSubmitResponse(response);
		});

  	},

  	handleSubmitResponse: function(response) {
  		if (response === true) {
  			this.setState({error: '', success: 'Changes saved.'});
		} else {
			var errors = '';
			for (var field in response.errors) {
				errors += response.errors[field].message + ' ';
			}
			this.setState({error: errors, success: ''});
		}
  	},

  	loadDonor: function() {
  		var ref = this;
		var donorId = this.props.params.id;
		$.ajax({
			url: "api/donor/" + donorId,
			method: 'GET'
		}).done(function(data) {
			if (data !== false) {
				ref.setState({donor: data});
			} else {
				this.setState({error: 'No user found', success: ''});
			}
		});

  	},

  	removeDonor: function() {
  		var ref = this;
		var donorId = this.props.params.id;
		$.ajax({
			url: 'api/remove',
			data: {donorId: donorId},
			method: 'POST'
		}).done(function(data) {
			if (data !== false) {
				ref.setState({donor: null, deleted: true, success: 'Donor removed.'});
			} else {
				this.setState({error: 'Error on user remove', success: ''});
			}
		});
  	},

  	componentDidMount: function() {
  		this.loadDonor();
  	},

	render: function() {

		return (
		  <div id="editForm" className="form">
		  	<h2>Update donor</h2>
		  	<p className="success">{this.state.success}</p>
		  	{
		  		!this.state.deleted 
				  	? <div>
			  			<DonorForm donor={this.state.donor} onDonorSubmit={this.submit} errors={this.state.error} />
			  			<p className="remove" onClick={this.removeDonor}>remove donor</p>
			  		</div> 
	  				: null
	  		}
		  	<Link to='/'>Back to map</Link>
		  </div>
		);
	}

});

window.EditForm = EditForm;







/*








var DonorProfile = React.createClass({

	getInitialState: function() {
		return {firstName: '', lastName: '', contactNumber: '', emailAddress: '', bloodGroup: '', error: '', address: '', _id: ''};
	},

	handleChange: function(e) {
		var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	},

	handleSubmit: function(e) {
		e.preventDefault();

		var data = this.getData();
		data.coords = this.props.position;

	    if (this.isInvalidData(data)) {
	    	this.setState({error: 'All inputs are mandatory.'});
	    	return;
	    }

   	 	this.submit(data);
  	},

  	submit: function(data) {
  		var ref = this;
  		$.ajax({
			url: "api/update",
			method: 'POST',
			data: data
		}).done(function(response) {
			ref.handleSubmitResponse(response);
		});
  	},

  	handleSubmitResponse: function(response) {
  		if (response === true) {
			this.hide(true);	
		} else {
			var errors = '';
			for (var field in response.errors) {
				errors += response.errors[field].message + ' ';
			}
			this.setState({error: errors});
		}
  	},

  	hide: function(updateDonors) {
  		this.props.hideFunction(updateDonors | false);
  	},

  	getData: function() {
  		return {
  			_id: this.state._id,
			firstName: this.state.firstName.trim(),
			lastName: this.state.lastName.trim(),
			contactNumber: this.state.contactNumber.trim(),
			emailAddress: this.state.emailAddress.trim(),
			bloodGroup: this.state.bloodGroup.trim()
		};
  	},

  	isInvalidData: function(data) {
  		return !data.firstName || !data.lastName || !data.contactNumber || !data.emailAddress || !data.bloodGroup;
  	},

  	loadDonor: function() {
  		var ref = this;
		var donorId = this.props.params.id;
		$.ajax({
			url: "api/donor/" + donorId,
			method: 'GET'
		}).done(function(data) {
			if (data !== false) {
				var state = {};
				for (var prop in ref.state) {
					if (data[prop] !== undefined)
						state[prop] = data[prop];
				}
				ref.setState(state);
			}
		});

  	},

  	componentDidMount: function() {
  		this.loadDonor();
  	},

	render: function() {
		return (
		  <form id="addForm" onSubmit={this.handleSubmit}>

		  	<div id="closeForm" onClick={this.hide}>close</div>

		  	<h2>Update donor</h2>

		  	<div id="errorsForm">{this.state.error}</div>

		    <input 
		    	type="text" 
		    	placeholder="First name" 
		    	name="firstName" 
		     	value={this.state.firstName}
		      	onChange={this.handleChange} 
		      	required />
		    <input 
		    	type="text" 
		    	placeholder="Last name"  
		    	name="lastName" 
		    	value={this.state.lastName}
		      	onChange={this.handleChange} 
		      	required />
		    <input 
		    	type="text" 
		    	placeholder="Contact number"  
		    	name="contactNumber" 
		    	value={this.state.contactNumber}
		      	onChange={this.handleChange} 
		      	required />
		    <input 
		    	type="email" 
		    	placeholder="Email address"  
		    	name="emailAddress" 
		    	value={this.state.emailAddress}
		      	onChange={this.handleChange} 
		      	required />
		    <input 
		    	type="text" 
		    	placeholder="Blood group"  
		    	name="bloodGroup" 
		    	value={this.state.bloodGroup}
		      	onChange={this.handleChange} 
		      	required />

		    <input type="submit" value="Edit" />

		  </form>
		);
	}

});

window.DonorProfile = DonorProfile;

*/