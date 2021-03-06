import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

class Container extends Component {
  render() {

    const ContainerHeader = () => {
      if (typeof this.props.title !== 'undefined') {
        return (
          <div className={'header' + (this.props.hCenter ? ' text-center' : '')}>
            <h4 className="title">{this.props.title}</h4>
            <p className="sub-tile">{this.props.subTitle}</p>
          </div>
        );
      }
      else if (typeof this.props.subTitle !== 'undefined') {
        return (
          <div className={'header' + (this.props.hCenter ? ' text-center' : '')}>
            <p className="sub-tile">{this.props.subTitle}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <div className={'card ' + (this.props.plain ? ' card-plain' : '') + (this.props.className ? this.props.className : '')} style={this.props.style}>

        
        <ContainerHeader />
        <div
          className={
            'content ' +  ' content-updated ' +
            (this.props.ctAllIcons ? ' all-icons' : '') +
            (this.props.ctTableFullWidth ? ' table-full-width' : '') +
            (this.props.ctTableResponsive ? ' table-responsive' : '') +
            (this.props.ctTableUpgrade ? ' table-upgrade' : '')
          }
          
        >
          {this.props.content}

          {/* <div className="footer">
            {this.props.legend}
            {this.props.stats !== null ? <hr /> : ''}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  plain: PropTypes.string,
  hCenter: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  ctAllIcons: PropTypes.string,
  ctTableFullWidth: PropTypes.bool,
  ctTableResponsive: PropTypes.bool,
  ctTableUpgrade: PropTypes.string,
  content: PropTypes.object,
  legend: PropTypes.object,
  statsIcon: PropTypes.string,
  stats: PropTypes.string,
};

export default Container;
