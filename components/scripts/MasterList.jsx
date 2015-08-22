'use strict';

var React = require('react');
var Request = require('superagent');
var Repo = require('./Repo');

var site = require('./config');

module.exports = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState: function() {
      return {
        reposInPage : [],
        offset: 0
      };
    },
    componentDidMount: function() {
      var targetUrl = site.github.url + site.github.getRepos;
      Request
        .get(targetUrl)
        .type('application/json')
        .accept('application/vnd.github.v3+json')
        .end(function(err, res){
          if (res.ok) {
            if(this.isMounted()) {
              try {
                var results = JSON.parse(JSON.stringify(res.body));
                console.log("Results: ", results.length);
                this.updateRepos(results);
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
    updateRepos: function(reposFetched) {
      var nextOffset = this.state.offset + reposFetched.length;
      this.setState({
        reposInPage: reposFetched,
        offset: nextOffset
      });
    },

    previous: function() {

    },
    continueNext: function(event) {
      if(event && event.target.tagName !== 'A') {
        var routerContext = this.context.router;
        //routerContext.transitionTo('');
      }
    },
    render: function(){
         return <div>
          <section>
              {
                this.state.reposInPage.map(function(item, i){
                  return <Repo key={item.id} index={i} repo={item}></Repo>;
                },this)
              }
          </section>
          <div className="buttonsBar">
              <div className="leftBtn" onClick={this.previous}>
                  <a href="#/">&lt;&lt; previous</a>
              </div>
              <div className="rightBtn" onClick={this.continueNext}>
                <a href="#/">next &gt;&gt;</a>
              </div>
          </div>
        </div>
    }
});
