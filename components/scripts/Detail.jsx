'use strict';

var React = require('react');
var Request = require('superagent');

var site = require('./config');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      detail: null
    }
  },
  componentDidMount: function() {
    var repo = this.props.params.name;
    var owner = this.props.params.owner;

    var targetUrl = site.github.url + site.github.getRepoDetail;
    targetUrl = targetUrl.replace(':owner', owner)
      .replace(':repo', repo);
    Request
      .get(targetUrl)
      .type('application/json')
      .accept('application/vnd.github.v3+json')
      .end(function(err, res){
        if (res.ok) {
          if(this.isMounted()) {
            try {
              var results = JSON.parse(JSON.stringify(res.body));
              this.showDetails(results);
            } catch(e) {
              console.error("Error parsing JSON", e.message);
            }
          }
        }
        else {
          console.log("Error: " + res.text);
        }
      }.bind(this));
  },
  componentWillUnmount: function() {
  },
  showDetails: function(repo) {
    this.setState({detail: repo});
  },

  render: function() {
    var prettified = JSON.stringify(this.state.detail, undefined, 2);

    return <div>
        <pre>
          {prettified}
        </pre>
      </div>
  }
});
