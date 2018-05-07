import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Gravatar from './Gravatar';

class Comment extends Component {

    render() {
        const { comment, activities } = this.props;

        return (

            <Row>
                <Col sm="1">
                    <Gravatar {...comment} activities={activities} />
                </Col>
                <Col sm="11">
                    <b>{comment.email}</b>
                    <p>
                        {comment.message}
                    </p>
                </Col>
            </Row>

        );
    }
}

export default Comment;