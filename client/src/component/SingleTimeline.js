import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import SingleEvent from './SingleEvent'
// import SingleNote from './SingleNote'
// import AllTimeline from './AllTimeline'

export default class SingleTimeline extends Component {
    state = {
        timeLine: {
            name: '',
            events: [],
            notes: []
        },
        newEvent: {
            newEventName: '',
            newEventDescription: '',
            newEventCoordinate: '',
            timeline: null 
        },
        newNote: {
            newNoteTitle: '',
            newNoteArticle: '',
            timeline: null
        }
    }

    // get all information
    componentDidMount() {
        this.refreshTimeline()
    }
    
    refreshTimeline() {
        const timelineId = this.props.match.params.timelineId
        axios.get(`/api/v1/timeline/${timelineId}`)
            .then((res) => {
                // console.log(res.data)
                this.setState({timeLine: res.data})
            }
        )
    }

    getEvents() {
        const timelineId = this.props.match.params.timelineId
        axios.get(`/api/v1/event/${timelineId}`)
            .then((res) => {
                console.log(res.data)
            }
        )
    }

    // delete the timeline
    onDeleteTimelineClick() {
        const timelineId = this.props.match.params.timelineId
        axios.delete(`/api/v1/timeline/${timelineId}`)
            .then((res) => {
                // res.redirect('/')
                console.log(res.data)
            }
        )
    }

    // update the timeline
    updateTimeline() {
        axios.put(`/api/v1/timeline/${this.props.match.params.timelineId}/`, {
            name: this.state.timeLine.name
        })
            .then(() => {
                this.refreshTimeline()
            }
        )
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

        axios.post('/api/v1/event/', newSingleEvent)
            .then(() => {
                console.log("Posting to the backend")
                this.refreshTimeline()
            }
        )
    }

    onNewEventChange = (event) => {
        const copyEventState = {...this.state.newEvent}
        copyEventState[event.target.name] = event.target.value
        this.setState({newEvent: copyEventState})
    }

    // create new note
    createNewNote = () => {
        const timelineId = this.props.match.params.timelineId
        const newSingleNote = {
            title: this.state.newNote.newNoteTitle,
            article: this.state.newNote.newNoteArticle,
            timeline: timelineId
        }

        axios.post('/api/v1/note/', newSingleNote)
            .then(() => {
                this.refreshTimeline()
            }
        )
    }

    onNewNoteChange = (event) => {
        const copyNoteState = {...this.state.newNote}
        copyNoteState[event.target.name] = event.target.value
        this.setState({newNote: copyNoteState})
    }

    render() {
        return(
            <div className='wrapper'>
                <div className='headline'>
                    <h1>{this.state.timeLine.name}</h1>
                    <div className='timeline'>
                        Timeline goes here
                    </div>
                    <button onClick={() => {this.onDeleteTimelineClick(this.timelineId)}}>
                        delete
                    </button>
                </div>
                <div className='event-container'>
                    <h2>
                        Events
                    </h2>
                    {this.state.timeLine.events.map((event) => {
                    return(
                        <Link to={`/event/${event.id}`}>
                            <div className='Note'>
                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                            </div>
                        </Link>)
                    })}
                </div>
                <div className='note-container'>
                    <h2>
                        Notes
                    </h2>
                    {this.state.timeLine.notes.map((note) => {
                    return(
                        <Link to={`/note/${note.id}`}>
                            <div className='note'>
                                <h3>{note.title}</h3>
                                <p>{note.article}</p>
                            </div>
                        </Link>)
                    })}
                </div>
                <div className='form'>
                    <input
                        type='string'
                        name='name'
                        placeholder='Update Name'
                        // required='required  x'
                        onChange={this.onTimelineNameChange}
                        value={this.state.timeLine.name}/>
                    <button onClick={() => this.updateTimeline()} className='button'>
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
                        <button onClick={() => this.createNewEvent()} className='button'>
                            New Event
                        </button>
                    </div>
                    <div className='form'>
                        <input
                            type='string'
                            name='newNoteTitle'
                            placeholder='Note Title'
                            onChange={this.onNewNoteChange}
                            value={this.state.newNote.newNoteTitle}/>
                        <input
                            type='textfield'
                            name='newNoteArticle'
                            placeholder='Text Here'
                            onChange={this.onNewNoteChange}
                            value={this.state.newNote.newNoteArticle}/>
                        <button onClick={() => this.createNewNote()} className='button'>
                            New Note
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}