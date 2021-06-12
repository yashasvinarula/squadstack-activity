import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react';

import {setPriceHeader} from '../actions';


class PricesHeader extends Component{
  render(){
    const {prices, activePriceHeader} = this.props;
    const priceList = Object.keys(prices);
    return(
      <Grid 
        stackable
        textAlign="center"
        celled="internally" 
        columns={priceList.length} 
        className="prices-header"
      >
        {
          priceList.map(price => (
            <Grid.Column 
              key = {price}
              className = {price === activePriceHeader ? 'prices-header-element-active' : 'prices-header-element'}
              onClick = {() => this.props.setPriceHeader(price)}
            >
              <h4>{prices[price].displayName}</h4>
            </Grid.Column>
          ))
        }
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    prices: state.prices,
    activePriceHeader: state.activePriceHeader
  }
}

export default connect(mapStateToProps, {setPriceHeader})(PricesHeader);
