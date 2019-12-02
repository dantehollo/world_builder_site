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
            <div>
                <div className='title-block'>
                    <div className='headline'>
                        <h1>{this.state.timeLine.name}</h1>
                    </div>
                    <div>
                        <input
                            type='string'
                            name='name'
                            placeholder='Update Name'
                            onChange={this.onTimelineNameChange}
                            value={this.state.timeLine.name}/>
                        <button onClick={() => this.updateTimeline()}>
                            Change Name
                        </button>
                        <button onClick={() => {this.onDeleteTimelineClick(this.timelineId)}}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className='timeline'>
                    Timeline goes here
                </div>
                <div className='info-block'>
                    <div className='note-container'>
                        <h2 className='minor-heading'>
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
                        <div className='note-form'>
                            <h4 className='form-field'>Title</h4>
                            <input
                                type='string'
                                name='newNoteTitle'
                                placeholder='Note Title'
                                onChange={this.onNewNoteChange}
                                value={this.state.newNote.newNoteTitle}/>
                            <h4 className='form-field'>Article</h4>
                            <input
                                className='text-field'
                                type='string'
                                name='newNoteArticle'
                                placeholder='Text Here'
                                onChange={this.onNewNoteChange}
                                value={this.state.newNote.newNoteArticle}/>
                            <div className='button'>
                                <button onClick={() => this.createNewNote()}>
                                    New Note
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='event-container'>
                        <h2 className='minor-heading'>
                            Events
                        </h2>
                        {this.state.timeLine.events.map((event) => {
                            const eventDiv = document.createElement("div")
                            const timelineContainer = document.getElementsByClassName('timeline')[0]
                            timelineContainer.appendChild(eventDiv)

                            console.log(timelineContainer)
                            return(
                                <Link to={`/event/${event.id}`}>
                                    <div className='note'>
                                        <h3>{event.name}</h3>
                                        <p>{event.description}</p>
                                    </div>
                                </Link>)
                        })}
                        <div>
                            <h4 className='form-field'>Name</h4>
                            <input
                                type="string"
                                name="newEventName"
                                placeholder="New Event Name"
                                required="required"
                                onChange={this.onNewEventChange}
                                value={this.state.newEvent.newEventName}/>
                            <h4 className='form-field'>Description</h4>
                            <input
                                type="string"
                                name="newEventDescription"
                                placeholder="Description"
                                required="required"
                                onChange={this.onNewEventChange}
                                value={this.state.newEvent.newEventDescription}/>
                            <h4 className='form-field'>Coordinate</h4>
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
                    </div>
                </div>
            </div>
        )
    }
}