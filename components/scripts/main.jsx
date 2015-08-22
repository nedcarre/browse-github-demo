'use strict';

// import the assets
require('./../sass/style.scss');

// import the code
var site = require('./config');
var React = require('react');
var Router = require('react-router');
var {DefaultRoute, Link, Route, RouteHandler} = Router;

// Handlers
var MasterList = require('./MasterList');
var Detail = require('./Detail');

var App = React.createClass({
  getInitialState: function() {
    return null;
  },
  render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="detail" path="/detail/repo/:name/owner/:owner" handler={Detail}/>
    <DefaultRoute handler={MasterList}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.querySelector('#root'));
});

