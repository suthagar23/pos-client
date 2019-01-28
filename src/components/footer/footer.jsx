import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return { auth: state.auth };
};

class Footer extends Component {
  render() {

    const PosFooterAPIDocsLinks = () => {
      if (this.props.auth.logedIn) {
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
            Apple POS created by <a href="">Suthagar</a>,
          </p>
        </Grid>
      </footer>
    );
  }
}


Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    logedIn: PropTypes.bool.isRequired
  })
};

const FooterComponent = connect(mapStateToProps)(Footer);
export default FooterComponent;

// export default Footer;
