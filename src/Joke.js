import React, { Component } from 'react';
import { styler } from './helpers'
import './Joke.css';

export default class Joke extends Component {
    render() {
        const styles = styler(this.props.score)
        return (
            <div className="Joke" >
                <div className="Joke-btn">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
                    <span style={{ border: `3px solid ${styles[2]}` }}>{this.props.score}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
                </div>
                <div className="Joke-text">
                    <p>{this.props.joke}</p>
                </div>
                <div className="Joke-emoji">
                    <i className={styles[0]} aria-role="presentation" aria-label={styles[1]}></i>
                </div>
            </div>
        )
    }
}