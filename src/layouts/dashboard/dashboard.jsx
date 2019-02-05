import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx'; 
import dashboardRoutes from '../../routes/dashboard.jsx';
import { connect } from 'react-redux'; 
import Notifications from '../../components/notification/notification.jsx';
const mapStateToProps = (state, ownProps) => {
  return { };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.mainPanelRef= React.createRef(); 
    this.state = { };
  }

  render() {
    let styles = {
      border: '1.5px solid #777',
      borderRadius: '15px',
      marginTop: '20px',
      overflow : 'hidden'
    };
    return (
      <div className="wrapper" >
        <Notifications />
        <div id="main-panel" className="main-panel" ref={this.mainPanelRef} style={styles}>
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}  />;
              return (
                // <Route path={prop.path} component={prop.component}  key={key} cookies={ prop.cookies}/>
                <Route path={prop.path} key={key} render={(props) => (<prop.component {...this.props} />) }/>
              );
            })}
          </Switch>
          <Footer {...this.props} />
        </div>
      </div>
    );
  }
}

const DashboardComponent = connect(mapStateToProps)(Dashboard);
export default DashboardComponent;
