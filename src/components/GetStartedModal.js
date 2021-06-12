import React, {Component} from 'react';
import {Modal, Icon, Header, Form, Button, Dropdown} from 'semantic-ui-react';

class GetStartedModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      leadSourcesChecked: [],
      sourcesChecked: [],
      numberofleads: null,
      numberofagents: null,
      crm: null,
      totalleads: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    if(e.target.name === "phone"){
      const {value} = e.target;
      const regex = new RegExp('^[0-9]*$');
      if(value !== ""){
        if(value.length>10 || regex.test(value) === false) return;
      }
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelectChange = (e, item) => {
    const {name, value} = item;
    this.setState({
      [name]: value
    });
  }

  handleCheckBoxChange = (name, item) => {
    let {leadSourcesChecked, sourcesChecked} = this.state;
    if(name === "leadsource"){
      if(leadSourcesChecked.includes(item)){
        leadSourcesChecked = leadSourcesChecked.filter(lsc => lsc !== item);
      }else{
        leadSourcesChecked.push(item);
      }
      this.setState({
        leadSourcesChecked
      });
    }
    if(name === "source"){
      if(sourcesChecked.includes(item)){
        sourcesChecked = sourcesChecked.filter(sc => sc !== item);
      }else{
        sourcesChecked.push(item);
      }
      this.setState({
        sourcesChecked
      })
    }
  }

  handleSubmit(){
    const {
      name, email, phone, numberofagents, 
      numberofleads, crm, totalleads, leadSourcesChecked, 
      sourcesChecked
    } = this.state;
    const string = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Number of Leads: ${numberofleads}
    Total Leads: ${totalleads}
    CRM: ${crm}
    Number of Agents: ${numberofagents}
    Biggest Lead Sources: ${leadSourcesChecked}
    You heard about us from: ${sourcesChecked}`;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())){
      window.alert(string);
      this.props.closeModal();
    }
  }

  render(){
    const {open, selectedPlan} = this.props;
    const {
      name, email, phone, leadSourcesChecked, sourcesChecked,
      numberofagents, numberofleads, crm, totalleads
    } = this.state;
    const options = [
      { key: 'Option 1', value: 'Option 1', text: 'Option 1' },
      { key: 'Option 2', value: 'Option 2', text: 'Option 2' },
      { key: 'Option 3', value: 'Option 3', text: 'Option 3' },
    ];
    const leadSources = ['Zillow', 'Realtor', 'Yloppo', 'Others'];
    const sources = ['Google', 'Facebook', 'Email', 'Friends', 'Real Closers'];
    return(
      <Modal
        size="small"
        open = {open}
        onClose = {() => this.props.closeModal()}
      >
        <Modal.Header>
          <Icon 
            name = "close" 
            color = "grey"
            style = {{
              float: "right",
              cursor: "pointer"
            }}
            onClick = {() => this.props.closeModal()}            
          />
          <center>Get Started With SquadVoice</center>
        </Modal.Header>
        <Modal.Content>
          <Header as="h3">
            Plan Selected:  
            <span style={{fontWeight: "100", marginLeft: "10px"}}>{selectedPlan}</span>
          </Header>
          <Form>

            <Form.Field>
              <Form.Input name="name" label="Name" onChange={this.handleChange} value={name} required />
            </Form.Field>

            <Form.Group widths="equal">
              <Form.Input name="email" label="Email Address" type="email" onChange={this.handleChange} value={email} required/>
              <Form.Input name="phone" label="Phone Number" type="tel" onChange={this.handleChange} value={phone} required />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Number of Leads You Generate In a Month</label>
                <Dropdown 
                  selection 
                  options={options} 
                  name="numberofleads"
                  onChange={this.handleSelectChange}
                  placeholder="-" 
                  value={numberofleads}
                />
              </Form.Field>
              <Form.Field>
                <label>Total Leads in your CRM</label>
                <Dropdown 
                  selection 
                  options={options} 
                  name="totalleads"
                  onChange={this.handleSelectChange}
                  placeholder="-" 
                  value={totalleads}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                  <label>Which CRM do you use?</label>
                  <Dropdown 
                    selection 
                    options={options} 
                    name="crm"
                    onChange={this.handleSelectChange}
                    placeholder="-" 
                    value={crm}
                  />
                </Form.Field>
              <Form.Field>
                <label>No. of Agents</label>
                <Dropdown 
                  selection 
                  options={options} 
                  name="numberofagents"
                  onChange={this.handleSelectChange}
                  placeholder="-" 
                  value={numberofagents}
                />
              </Form.Field>
            </Form.Group>

            <label style={{fontWeight: "700"}}>Which are your biggest lead sources?</label>
            <Form.Group inline>
              {
                leadSources.map(ls => (
                  <Form.Checkbox 
                    key = {ls}
                    checked = {leadSourcesChecked.includes(ls)}
                    label = {ls}
                    value = {ls}
                    onChange = {(name, item) => this.handleCheckBoxChange('leadsource', ls)}
                  />
                ))
              }
            </Form.Group>

            <label style={{fontWeight: "700"}}>How did you head about us?</label>
            <Form.Group inline>
              {
                sources.map(source => (
                  <Form.Checkbox 
                    key = {source}
                    checked = {sourcesChecked.includes(source)}
                    label = {source}
                    value = {source}
                    onChange = {(name, item) => this.handleCheckBoxChange('source', source)}
                  />
                ))
              }
            </Form.Group>

            <Button type="submit" style={{backgroundColor: "#ff5722", color: "white"}} onClick={this.handleSubmit}>Submit</Button>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default GetStartedModal;
