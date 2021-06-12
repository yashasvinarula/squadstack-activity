import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Segment} from 'semantic-ui-react';

import GetStartedModal from './GetStartedModal';

class PlanContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      selectedPlan: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal(selectedPlan){
    this.setState({
      open: true,
      selectedPlan
    });
  }  

  closeModal(){
    this.setState({
      open: false,
      selectedPlan: ""
    })
  }

  render(){
    const {open, selectedPlan} = this.state;
    const {prices, activePriceHeader, mostPopularPlan} = this.props;
    const plansList = prices[activePriceHeader].data.filter(plan => plan.title !== "Qualified 60");
    return(
      <>
        <GetStartedModal 
          open = {open}
          selectedPlan = {selectedPlan}
          closeModal = {this.closeModal}
        />
        <Grid
          stackable
          textAlign="center"
          columns = {4}
        >
          {
            plansList.map(plan => (
              <Grid.Column key={plan.title}>
                <div>
                  {
                    plan.title === mostPopularPlan ? (
                        <Segment attached="top" className="plan-trial-active">
                          <h5>Most Popular!</h5>
                        </Segment>
                      ) : (
                        <Segment attached = "top" style={{border: "0", color: "white"}}>
                        {'1'}
                        </Segment>
                      )
                  }
                  <Segment attached className="plan-header">
                    <h4>{plan.title}</h4>
                  </Segment>
                  <Segment attached style={{backgroundColor: plan.title === mostPopularPlan ? "#f5f5f5" : "white"}}>
                    <div>
                      <p style={{fontSize: "32px", margin: "0", fontWeight: "bold"}}>${plan.priceperlead}</p>
                      <p>Per Qualified Lead</p>
                    </div>
                    <hr />
                    <div>
                      <p style={{margin: "0"}}>Qualified Leads Per Month</p>
                      <p style={{fontSize: "20px"}}>{plan.qualifiedpermonth}</p>
                    </div>
                    <hr />
                    <div>
                      <p style={{margin: "0"}}>Platform Fee Per Month</p>
                      <p style={{fontSize: "20px"}}>${plan.platformprice}</p>
                    </div>
                  </Segment>
                  <Segment attached='bottom' className="plan-footer">
                    <h3>${plan.finalprice.toLocaleString()}/mo</h3>
                  </Segment>
                  <Segment 
                    className = {plan.title === mostPopularPlan ? "plan-trial-active" : "plan-trial"}
                    onClick = {() => this.openModal(plan.title)}
                  >
                    <h5>Start Your Trial</h5>
                  </Segment>
                </div>
              </Grid.Column>
            ))
          }
          <Grid.Column>
            <div>
              <Segment attached = "top" style={{border: "0", color: "white"}}>
                {'1'}
              </Segment>
              <Segment attached className="plan-header" >
                <h4>Enterprise</h4>
              </Segment>
              <Segment attached style={{backgroundColor: "#f5f5f5", height: "325px"}}>
                <p style={{
                    fontSize: "18px", 
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%"
                  }}>
                  Want More Than 80 Qualified Leads Per Month?
                </p>
              </Segment>
              <Segment className="plan-trial" onClick = {(plan) => this.openModal('Enterprise')}>
                <h5>Get In Touch</h5>
              </Segment>
            </div>
          </Grid.Column>

        </Grid>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    prices: state.prices,
    activePriceHeader: state.activePriceHeader,
    mostPopularPlan: state.mostPopularPlan
  }
}

export default connect(mapStateToProps, null)(PlanContainer);