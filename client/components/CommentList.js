import React, { Component } from 'react';
import { Container, Input, FormGroup } from 'reactstrap';

import Comment from './comment';

class CommentList extends Component {

    constructor(props) {
        super(props);
        this.activities = new Map();
        this.setLastActivity = this.setLastActivity.bind(this);
    }

    setLastActivity(comment) {
        if(!this.activities.has(comment.email)) {
            this.activities.set(comment.email, comment.createdAt);
        } else {
            const prev = new Date(this.activities.get(comment.email)).getTime();
            const current = new Date(comment.createdAt).getTime();
            if(prev <= current) {
                this.activities.set(comment.email, comment.createdAt);
            }
        }
    }

    render() {

        return (
            <Container className="comment-list">

                <FormGroup className="comment-filter">
                    <Input placeholder="Filter" onChange={this.props.filterComments} />
                </FormGroup>

                <ul>
                    {
                        this.props.comments.map(comment => {
                            
                            this.setLastActivity(comment);
                            
                            return (
                                <li key={comment._id}>
                                    <Comment comment={comment} activities={this.activities} toggle={this.toggle} />
                                </li>
                            );
                        })
                    }
                </ul>

            </Container>
        );
    }
}

export default CommentList;