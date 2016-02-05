var DonorInfo = React.createClass({

	getInitialState: function() {
		return {
			emailAddress: '*******', 
			contactNumber: '*******'
		};
	},
	
	showMore: function() {
		this.setState({
			emailAddress: this.props.donor.emailAddress, 
			contactNumber: this.props.donor.contactNumber
		});
	},

	render: function() {
		return (
			<div className="donorInfo">
				<h2>{this.props.donor.firstName} {this.props.donor.lastName}</h2>
				<p><b>Group</b>: {this.props.donor.bloodGroup}</p>
				<p><b>Email</b>: {this.state.emailAddress}</p>
				<p><b>Number</b>: {this.state.contactNumber}</p>
				<p onClick={this.showMore}><i>reveal details</i></p>
			</div>
		);
	}

});

window.DonorInfo = DonorInfo;