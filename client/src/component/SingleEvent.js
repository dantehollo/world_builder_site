import React, {Component} from 'react'
import axios from 'axios'

export default class SingleEvent extends Component {
    state = {
        eventState: {
            name: '',
            desctription: '',
            coordiate: '',
            timeline: ''},
        notes: []
    }

    componentDidMount() {
        this.refreshSingleEvent()
    }

    refreshSingleEvent() {
        const eventId = this.props.match.params.eventId
        axios.get(`/api/v1/event/${eventId}`)
            .then((res) => {
                console.log(res.data)
                console.log(this.state.events)
                this.setState(res.data)
            }
        )
    }

    onDeleteEventClick() {
        const eventId = this.props.match.params.eventId
        axios.delete(`/api/v1/event/${eventId}`)
            .then((res) => {
                console.log(res.data)
            }
        )
    }

    updateEvent(event) {
        axios.put(`api/v1/event/${this.props.match.params.event}/`, {
            name: this.state.newEvent.newEventName,
            description: this.state.newEvent.newEventDescription,
            coordinate: this.state.newEvent.newEventCoordinate,
            timeline: this.state.newEvent.timeline
            }
        )
            .then(() => {
                this.refreshSingleEvent()
            }
        )
    }

    onEventChange = (event) => {
        const copyEventState = {...this.state.eventState}
        copyEventState[event.target.name] = event.target.value
        this.setState({eventState: copyEventState})
    }

    render() {
        return(
            <div>
                <h1>{this.state.name}</h1>
                <p>{this.state.desctription}</p>
                <p>{this.state.coordiate}</p>
                <button onClick={() => {this.onDeleteEventClick(this.eventId)}}>
                    Delete Event
                </button>
                <input
                    type='string'
                    name='name'
                    placeholder='Update Name'
                    // required='required  x'
                    onChange={this.onChange}
                    value={this.state.eventState.name}/>
                <button onClick={() => this.updateEvent()}>
                    Update Timeline
                </button>
                <input
                    type='string'
                    name='name'
                    placeholder='Update Name'
                    // required='required  x'
                    onChange={this.onTimelineNameChange}
                    value={this.state.timeLine.name}/>
                <button onClick={() => this.updateTimeline()}>
                    Update Timeline
                </button>
                <input
                    type='string'
                    name='name'
                    placeholder='Update Name'
                    // required='required  x'
                    onChange={this.onTimelineNameChange}
                    value={this.state.timeLine.name}/>
                <button onClick={() => this.updateTimeline()}>
                    Update Timeline
                </button>
            </div>
        )
    }
}