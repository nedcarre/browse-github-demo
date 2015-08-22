'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactBootstrap = require('react-bootstrap');

module.exports = React.createClass({
  componentDidMount: function() {
  },
  componentWillUnmount: function() {
  },

  render: function() {
    return <article>
          <div className='vertical-align'>
            <div>
              <div className='leftAlign'>
                <div>
                  <label>Repo ID: {this.props.repo.id}</label>
                </div>
              </div>
              <div className='leftAlign'>
                <div>
                  <div>
                    <label>Full name: {this.props.repo.full_name}</label>
                    <button className='useThisBtn' bsSize='xsmall'>
                      <Link to="/detail/repo/:name/owner/:owner" params={{name:this.props.repo.name, owner:this.props.repo.owner.login}}>Show Details</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className='leftAlign'>
                <div>
                  <div>
                    <label>Description: {this.props.repo.description}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
  }
});
