import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import md5 from 'md5';

class Gravatar extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        const { email, createdAt, _id, activities } = this.props;
        const email_md5 = md5(email);

        return (
            <div>
                <img src={`https://www.gravatar.com/avatar/${email_md5}`} className="gravatar" id={'Popover-' + _id} onClick={this.toggle} />
                <Popover placement="right" isOpen={this.state.popoverOpen} target={'Popover-' + _id} toggle={this.toggle}>
                    <PopoverHeader>{email}</PopoverHeader>
                    <PopoverBody>Last active: {new Date(activities.get(email)).toLocaleString()}</PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default Gravatar;