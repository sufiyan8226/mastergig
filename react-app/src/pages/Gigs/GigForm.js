import React from 'react'
import {
  Container,
  Header,
  Button,
  Checkbox,
  Form
} from 'semantic-ui-react'

class GigForm extends React.Component {

    constructor() {
      super()
      this.state = {
        status: 'requested',
        admin_id: 5,
        public: false
      }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    handleCheck = () => {
        this.setState({
            public: true
        })
    }

    createGig = (event) => {
        event.preventDefault()
        const newGig = this.state

        const reqObj = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(newGig)
        }
        fetch(`http://localhost:5000/gigs`, reqObj)
        .then(resp => {
            return resp.json()
        }).then(respObj => {
            console.log(respObj)
        })
        this.props.toggleView()
    }

  
    render() {
        return (

            <div>
                
            <Container text style={{ marginTop: '7em'}} floated="right">
                <Header as='h1'>Book a Gig Request</Header>
                    <h3>
                       Gig request 
                    </h3>
                <Form onSubmit={this.createGig}>

                    <Form.Group widths='equal'>
                        <Form.Input name="client_name" fluid label='Name' placeholder="First and Last" onChange={this.handleChange} />
                        <Form.Input name="client_email" fluid label='Email' placeholder='Email Address' onChange={this.handleChange} />
                        <Form.Input name="client_phone" fluid label='Phone' placeholder='###-###-####' onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input name="date" fluid label='Date' placeholder='MM/DD/YY' onChange={this.handleChange} />
                        <Form.Input name="start_time" fluid label='Start Time' placeholder='##:## am/pm' onChange={this.handleChange} />
                        <Form.Input name="end_time" fluid label='End Time' placeholder='##:## am/pm' onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Field>
                        <Form.Input name="location" fluid label='Location' placeholder='Location' onChange={this.handleChange} />
                    </Form.Field>

                    <Form.Field>
                        <Form.TextArea name="description" fluid label="Description" placeholder='What type of event is this booking for?' onChange={this.handleChange} />
                    </Form.Field>

                    <Form.Field>
                        <Form.TextArea name="rep" fluid label="Repertoire" placeholder='Specific Pieces or Music Genre' onChange={this.handleChange} />
                    </Form.Field>
                    <br></br>
                    <Form.Field>
                        <h4>Is your event open to the public? </h4>
                        <Checkbox name="public" fluid label='Public' onChange={this.handleCheck} />
                    </Form.Field>
                    <br></br>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
            </div>
        
        )
    }
}
  
export default GigForm