import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx'; 
import { withCookies } from 'react-cookie'; 

import dashboardRoutes from '../../routes/dashboard.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.mainPanelRef= React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = { };
  }
  componentDidMount() {
    // this.setState({ });
    // console.log(this.props)

   
  }
  componentDidUpdate(e) {
    
  }
  render() {
    let styles = {
      // backgroundColor: 'yellow',
      border: '1.5px solid #777',
      borderRadius: '15px',
      marginTop: '20px',
      overflow : 'hidden'
    };
    return (
      <div className="wrapper" >
        <div id="main-panel" className="main-panel" ref={this.mainPanelRef} style={styles}>
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}  />;
              return (
                // <Route path={prop.path} component={prop.component}  key={key} cookies={ prop.cookies}/>
                <Route path={prop.path} key={key} render={(props) => (<prop.component {...this.props}  cookies={this.props.cookies} />) }/>
              );
            })}
          </Switch>
          <Footer {...this.props} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  cookies : PropTypes.object.isRequired
};
export default withCookies(Dashboard);
