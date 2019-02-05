import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import HeaderLinks, { LoginLinks} from './headerLinks.jsx';
import PropTypes from 'prop-types';
import dashboardRoutes from '../../routes/dashboard.jsx';
import { GetAuthCookie } from '../../utils/authUtils';

const mapStateToProps = (state, ownProps) => {
  return {   };
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPageTitle() {
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
      const {isLogedIn, userInfo} = GetAuthCookie() || {};
      if (typeof isLogedIn !== 'undefined' && typeof userInfo !== 'undefined') {
        return (
          <Navbar.Collapse>
            <HeaderLinks />
          </Navbar.Collapse>
        );
      }
      else {
        return (
          <Navbar.Collapse>
            <LoginLinks />
          </Navbar.Collapse>
        );
      }
    };

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            Apple POS | {this.getPageTitle()} 
          </Navbar.Brand>
        </Navbar.Header>
        <PosHeaderLinks />
      </Navbar>
    );
  }
}

Header.propTypes = {
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
