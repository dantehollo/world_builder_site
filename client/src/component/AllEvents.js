import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from'axios'

export default class AllEvents extends Component {
    state = {
        allEvents: [],
        newEvent: {
            newEventName: '',
            newEventDescription: '',
            newEventCoordinate: '',
            timeline: ''
        }
    }
    // load components
    componentDidMount() {
        this.refreshEvents()
    }

    refreshEvents() {
        axios.get('/api/v1/event')
        .then((res) => {
            console.log(res.data)
            const allEvents = res.data
            this.setState({allEvents: allEvents})
            }
        )  
    }

    // create new event
    createNewEvent = () => {
        const newSingleEvent = {
            name: this.state.newEvent.newEventName,
            description: this.state.newEvent.newEventDescription,
            coordinate: this.state.newEvent.newEventCoordinate,
            timeline: this.state.newEvent.timeline
        }
        axios.post('api/v1/event/', newSingleEvent)
            .then(() => {
                console.log("Posting to the backend")
                this.refreshEvents()
            })
    }

    onNewEventChange = (event) => {
        const copyEventState = {...this.state.newEvent}
        copyEventState[event.target.name] = event.target.value
        this.setState({newEvent: copyEventState})
        // console.log("changes made")
    }

    render() {
        return(
            <div>
                {this.state.allEvents.map((event) => {
                    return(
                        <Link to={`/event/${event.id}`}>
                            <div>{event.name}</div>
                        </Link>)
                })}
                <div>
                    <input
                        type="string"
                        name="newEventName"
                        placeholder="New Event Name"
                        required="required"
                        onChange={this.onNewEventChange}
                        value={this.state.newEvent.newEventName}/>
                    <input
                        type="string"
                        name="newEventDescription"
                        placeholder="Description"
                        required="required"
                        onChange={this.onNewEventChange}
                        value={this.state.newEvent.newEventDescription}/>
                    <input
                        type="number"
                        name="newEventCoordinate"
                        placeholder="New Event Coordinate"
                        required="required"
                        onChange={this.onNewEventChange}
                        value={this.state.newEvent.newEventCoordinate}/>
                    <input
                        type="number"
                        name="timeline"
                        placeholder="Associated Timeline"
                        required="required"
                        onChange={this.onNewEventChange}
                        value={this.state.newEvent.timeline}/>
                    <button onClick={() => this.createNewEvent()}>
                        New Event
                    </button>
                </div>
            </div>
        )
    }
}