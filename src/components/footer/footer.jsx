import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetAuthCookie } from '../../utils/authUtils';

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, cookies: ownProps.cookies };
};

class Footer extends Component {
  render() {

    const PosFooterAPIDocsLinks = () => {
      const { cookies } = this.props;
      const {isLogedIn, userInfo} = GetAuthCookie(cookies) || {};
      if (typeof isLogedIn !== 'undefined' && typeof userInfo !== 'undefined') {
        return (
          <li>
            <a href="#docs">Docs</a>
          </li>
        );
      }
      else {
        return (null);
      }
    };

    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#help">Help</a>
              </li>
              <PosFooterAPIDocsLinks />
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{' '}
            Apple POS,
          </p>
        </Grid>
      </footer>
    );
  }
}


Footer.propTypes = {
  cookies : PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    logedIn: PropTypes.bool.isRequired
  })
};

const FooterComponent = connect(mapStateToProps)(Footer);
export default FooterComponent;

// export default Footer;
