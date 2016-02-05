var DonorForm = React.createClass({

	getInitialState: function() {
		return {firstName: '', lastName: '', contactNumber: '', emailAddress: '', bloodGroup: '', error: '', address: '', _id: ''};
	},

	getData: function() {
  		return {
			firstName: this.state.firstName.trim(),
			lastName: this.state.lastName.trim(),
			contactNumber: this.state.contactNumber.trim(),
			emailAddress: this.state.emailAddress.trim(),
			bloodGroup: this.state.bloodGroup.trim(),
			_id: this.state._id
		};
  	},

  	setData: function(data) {
  		if (data) {
			var state = {};
			for (var prop in this.state) {
				if (data[prop] !== undefined)
					state[prop] = data[prop];
			}
			this.setState(state);
		}
  	},

  	handleChange: function(e) {
		var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	},

	handleSubmit: function(e) {
		e.preventDefault();

		var data = this.getData();

	    if (this.isInvalidData(data)) {
	    	this.setState({error: 'All inputs are mandatory.'});
	    	return;
	    }

	    this.props.onDonorSubmit(data);

  	},

  	isInvalidData: function(data) {
  		return !data.firstName || !data.lastName || !data.contactNumber || !data.emailAddress || !data.bloodGroup;
  	},

  	componentWillReceiveProps: function(nextProps) {
		this.setData(nextProps.donor);
	},

	render: function() {

		return (

		  <form onSubmit={this.handleSubmit}>

		  	<div id="errorsForm">{this.props.errors} {this.state.error}</div>

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

		    <input type="submit" value="Post" />

		  </form>

		);
	}

});

window.DonorForm = DonorForm;