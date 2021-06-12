import React, {Component} from 'react';
import './App.css';
import {Container} from 'semantic-ui-react';
import {connect} from 'react-redux';

import { setNetworkStatus } from './actions';

import PricesHeader from './components/PricesHeader';
import PlanContainer from './components/PlanContainer';
import Offline from './components/Offline';



class App extends Component{

  constructor(props){
    super(props);
    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }

  componentDidMount(){
    this.handleNetworkChange();
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  }

  componentWillUnmount(){
    window.removeEventListener('online');
    window.removeEventListener('offline');
  }

  handleNetworkChange(){
    this.props.setNetworkStatus(window.navigator.onLine);
  }

  render(){
    return(
      <>
        {
          this.props.online ? (
            <Container>
              <PricesHeader />
              <PlanContainer />
            </Container>
          ) : (
            <Offline />
          )
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    online: state.online
  }
}

export default connect(mapStateToProps, {setNetworkStatus})(App);
