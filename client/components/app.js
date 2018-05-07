import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };

        this.fetchComments = this.fetchComments.bind(this);
        this.filterComments = this.filterComments.bind(this);
    }

    filterComments(e) {
        const query = e.target.value;
        let comments = [...this.comments];
        comments = comments.reduce((acc, comment) => {
            if (comment.email.toLowerCase().search(query.toLowerCase()) !== -1) {
                acc.push(comment);
            }
            return acc;
        }, []);
        
        if(!query) {
            comments = this.comments;
        }

        this.setState({
            comments
        });
    }

    async componentDidMount() {
        await this.fetchComments();
    }

    async fetchComments() {
        try {

            const { data } = await axios.get('/comments');
            this.comments = data;
            
            this.setState({
                comments: this.comments
            });

        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            })
        }
    }

    render() {
        return (
            <Container id="comment-box-app">
                <h2>Comment Box App</h2>
                <CommentBox fetchComments={this.fetchComments} />
                <CommentList
                    comments={this.state.comments}
                    filterComments={this.filterComments}
                />
            </Container>
        );
    }
}

export default App;