var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var DonorsMap = window.DonorsMap;
var DonorProfile = window.DonorProfile;

ReactDOM.render((
  <Router>
	<Route path="/donor/:id" component={EditForm} />
    <Route path="/" component={DonorsMap} />
  </Router>
), document.getElementById('content'));


