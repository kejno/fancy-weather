import React from 'react'
import { WeatherContext } from '../Weather'

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };

    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <WeatherContext.Consumer>
                {
                    ({ store }) => {
                        return (
                            <span>
                                {' ' + this.state.date.toLocaleTimeString('en-US', { timeZone: store.timezone, hour12: false })}
                            </span>
                        );
                    }
                }
            </WeatherContext.Consumer>
        )
    }
}