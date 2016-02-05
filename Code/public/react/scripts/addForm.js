var DonorForm = window.DonorForm;
var Link = window.ReactRouter.Link;

var AddForm = React.createClass({

	getInitialState: function() {
		return {error: '', url: ''};
	},

  	submit: function(data) {

  		var ref = this;

		data.coords = this.props.position;
		delete data._id;

  		$.ajax({
			url: "api/add",
			method: 'POST',
			data: data
		}).done(function(response) {
			ref.handleSubmitResponse(response);
		});

  	},

  	handleSubmitResponse: function(response) {
  		if (response.errors === undefined) {
  			this.setState({url: '/donor/' + response});
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

	render: function() {
		return (
		  <div id="addForm" className="form">
		  	<div id="closeForm" onClick={this.hide}>close</div>
		  	<h2>Add donor</h2>
		  	{
		  		this.state.url 
		  			? 
		  				<div>
		  					<p>Manage your profile: </p>
		  					<Link to={this.state.url}>{this.state.url}</Link>
		  				</div>
		  			: <DonorForm onDonorSubmit={this.submit} errors={this.state.error} />
		  	}
		  </div>
		);
	}

});

window.AddForm = AddForm;