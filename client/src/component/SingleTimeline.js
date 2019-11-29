import React, {Component} from 'react'
import axios from 'axios'
import SingleEvent from './SingleEvent'

export default class SingleTimeline extends Component {
    state = {
        timeLine: {
            name: '',
            // newTimelineName: '',
            events: []
        },
        newEvent: {
            newEventName: '',
            newEventDescription: '',
            newEventCoordinate: '',
            timeline: null 
        }
    }

    componentDidMount() {
        this.refreshTimeline()
    }
    
    refreshTimeline() {
        const timelineId = this.props.match.params.timelineId
        axios.get(`/api/v1/timeline/${timelineId}`)
            .then((res) => {
                console.log(res.data)
                this.setState({timeLine: res.data})
            }
        )
    }

    onDeleteTimelineClick() {
        const timelineId = this.props.match.params.timelineId
        axios.delete(`/api/v1/timeline/${timelineId}`)
            .then((res) => {
                // res.redirect('/')
                console.log(res.data)
            }
        )
    }

    updateTimeline(timelineId) {
        axios.put(`/api/v1/timeline/${this.props.match.params.timelineId}/`, {
            name: this.state.timeLine.name
        })
            .then(() => {
                this.refreshTimeline()
            })
    }

    onTimelineNameChange = (event) => {
        const copyTimelineState = {...this.state.timeLine}
        copyTimelineState[event.target.name] = event.target.value
        this.setState({timeLine: copyTimelineState})
    }

     // create new event
     createNewEvent = () => {
        const timelineId = this.props.match.params.timelineId
        console.log(timelineId)
        const newSingleEvent = {
            name: this.state.newEvent.newEventName,
            description: this.state.newEvent.newEventDescription,
            coordinate: this.state.newEvent.newEventCoordinate,
            timeline: timelineId
        }
        console.log(newSingleEvent)

        axios.post('/api/v1/event/', newSingleEvent)
            .then(() => {
                console.log("Posting to the backend")
                this.refreshTimeline()
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
                <div>
                    <h1>{this.state.timeLine.name}</h1>
                    {/* <p>{events}</p> */}
                    <button onClick={() => {this.onDeleteTimelineClick(this.timelineId)}}>
                        delete
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
                        {/* <input
                            type="number"
                            name="timeline"
                            placeholder="Associated Timeline"
                            required="required"
                            onChange={this.onNewEventChange}
                            value={this.state.newEvent.timeline}/> */}
                        <button onClick={() => this.createNewEvent()}>
                            New Event
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}