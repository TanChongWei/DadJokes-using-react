import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './Dadjokes.css'

export default class Dadjokes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(localStorage.getItem("jokes") || "[]"),
            loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke))
        this.getJokes = this.getJokes.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes();
        }
    }

    async getJokes() {
        this.setState({ loading: true })
        const jokes = [];
        while (jokes.length < 10) {
            const res = await axios.get("https://icanhazdadjoke.com/", { headers: { accept: "application/json" } });
            const { id, joke } = res.data;
            if (!this.seenJokes.has(joke)) {
                jokes.push({ id, joke, score: 0 })
                this.seenJokes.add(joke)
            }
        }
        this.setState(st => ({ jokes: [...st.jokes, ...jokes], loading: false }),
            () => localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    }

    handleVote(id, delta) {
        this.setState(st => {
            return { jokes: st.jokes.map(j => j.id === id ? { ...j, score: j.score + delta } : j) }
        }, () => localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    }

    render() {
        const jokes = this.state.jokes.map((j, idx) => (<Joke
            key={j.id}
            joke={j.joke}
            score={j.score}
            upvote={() => this.handleVote(j.id, 1)}
            downvote={() => this.handleVote(j.id, -1)}
        />))

        const loader = (<div className="Dadjokes-spinner">
            <i className="far fa-8x fa-laugh fa-spin" />
            <h1 className="Dadjokes-title">Loading...</h1>
        </div>)

        const jokeList = (<div className="Dadjokes-container">
            {jokes}
        </div>)
        return (
            <div className="Dadjokes" >
                <div className="Dadjokes-sidebar">
                    <h1 className="Dadjokes-title"><span>Dad</span> Jokes!</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                    <button onClick={this.getJokes} className="Dadjokes-btn">New Jokes</button>
                </div>
                {this.state.loading ? loader : jokeList}
            </div>
        )
    }
}