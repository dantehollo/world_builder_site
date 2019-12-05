import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from'axios'

export default class AllEvents extends Component {
    state = {
        allEvents: []
    }
    // load components
    componentDidMount() {
        this.refreshEvents()
    }

    refreshEvents() {
        axios.get('/api/v1/event')
        .then((res) => {
            const allEvents = res.data
            this.setState({allEvents: allEvents})
            }
        )  
    }

    render() {
        return(
            <div>
                <h2 className='minor-heading'>
                    Events
                </h2>
                {this.state.allEvents.map((event) => {
                    return(
                        <Link to={`/event/${event.id}`} key={event.id}>
                            <div>
                                {event.name}
                            </div>
                        </Link>)
                })}  
            </div>
        )
    }
}