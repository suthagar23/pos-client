import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import HeaderLinks from './headerLinks.jsx';
import PropTypes from 'prop-types';
import dashboardRoutes from '../../routes/dashboard.jsx';
import { GetAuthCookie } from '../../utils/authUtils';

const mapStateToProps = (state, ownProps) => {
  return { cookies: ownProps.cookies };
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  getBrand() {
    var name;
    dashboardRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  render() {

    const PosHeaderLinks = () => {
      const { cookies } = this.props;
      const {isLogedIn, userInfo} = GetAuthCookie(cookies) || {};
      if (typeof isLogedIn !== 'undefined' && typeof userInfo !== 'undefined') {
        return (
          <Navbar.Collapse>
            <HeaderLinks />
          </Navbar.Collapse>
        );
      }
      else {
        return (null);
      }
    };

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            Apple POS | {this.getBrand()} 
          </Navbar.Brand>
        </Navbar.Header>
        <PosHeaderLinks />
      </Navbar>
    );
  }
}

Header.propTypes = {
  cookies : PropTypes.object.isRequired,
  location: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  auth: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    logedIn: PropTypes.bool.isRequired
  })
};
// export default Header;
const HeaderComponent = connect(mapStateToProps)(Header);
export default HeaderComponent;
