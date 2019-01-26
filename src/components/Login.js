import React, { Component } from "react";
import passwordHash from 'password-hash';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordhashed: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handlePassword = event => {


        console.log(event.target.value);



        let hashed = passwordHash.generate(event.target.value);

        this.setState({ passwordhashed: hashed, password:event.target.value})

        console.log(event.target.value);


    }
     handleSubmit = event => {

         event.preventDefault();

         const data = new FormData(event.target);

         fetch('/api/form-submit-url', {
             method: 'POST',
             body: data,
         });

     }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handlePassword}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;