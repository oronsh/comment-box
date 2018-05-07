import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Row, Col } from 'reactstrap';
import axios from 'axios';
import { validateEmail } from '../../helpers';

class CommentBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            errors: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();

        const { email, message } = this.state;

        // some basic validation
        let errors = {};
        if (!email) {
            errors.email = 'Please enter your email';
        } else if (!validateEmail(email)) {
            errors.email = `${email} is not a valid email`;
        }

        if (!message) {
            errors.message = 'Message cannot be empty';
        }

        if (Object.keys(errors).length) {
            this.setState({
                errors
            });

            return;
        }

        try {
            const res = await axios.post('/comment', { email, message });

            this.setState({
                email: '',
                message: '',
                errors: {}
            });

            await this.props.fetchComments();

        } catch (err) {
            this.setState({
                errors: err.response.data.errors
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Container className="comment-box">
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Input
                            invalid={!!this.state.errors.email}
                            placeholder="Email"
                            name="email"
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                        <FormFeedback>{this.state.errors.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            invalid={!!this.state.errors.message}
                            type="textarea"
                            name="message"
                            placeholder="Message"
                            onChange={this.onChange}
                            value={this.state.message}
                        />
                        <FormFeedback>{this.state.errors.message}</FormFeedback>
                    </FormGroup>
                    <Row>
                        <Col sm="12">
                            <Button color="primary" className="float-right">SUBMIT</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default CommentBox;