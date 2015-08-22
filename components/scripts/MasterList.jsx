'use strict';

var React = require('react');
var Request = require('superagent');
var Repo = require('./Repo');

var site = require('./config');

module.exports = React.createClass({
    getInitialState: function() {
      return {
        reposInPage : [],
        lastSeenQueue: []
      };
    },
    componentDidMount: function() {
      this.fetchRepos(this.state.targetUrl);
    },
    componentWillUnmount: function() {
    },
    fetchRepos: function(lastSeen) {
      var targetUrl = site.github.url + site.github.getRepos
      Request
        .get(targetUrl)
        .query({since: lastSeen || 0})
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
    updateRepos: function(reposFetched) {
      var lastItem, lastSeen;
      lastItem = reposFetched[reposFetched.length-1];
      if (this.state.lastSeenQueue.length === 0) {
        this.state.lastSeenQueue.push(lastItem.id);
      }
      else {
        lastSeen = this.state.lastSeenQueue[this.state.lastSeenQueue.length - 1];
        if (lastItem.id > lastSeen) {
          this.state.lastSeenQueue.push(lastItem.id);
        }
      }
      this.setState({
        reposInPage: reposFetched
      });
    },

    previous: function(event) {
      this.state.lastSeenQueue.pop();
      this.state.lastSeenQueue.pop();
      this.fetchRepos(this.state.lastSeenQueue[this.state.lastSeenQueue.length - 1]);
    },
    continueNext: function(event) {
      this.fetchRepos(this.state.lastSeenQueue[this.state.lastSeenQueue.length - 1]);
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
