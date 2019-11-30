import React, {Component} from 'react'
import axios from 'axios'

export default class SingleEvent extends Component {
    state = {
        eventState: {
            name: '',
            description: '',
            coordinate: '',
            // timeline: ''
        },
        newNote: {
            newNoteTitle: '',
            newNoteArticle: '',
            event: null
        },
        notes: []
    }

    componentDidMount() {
        this.refreshSingleEvent()
    }

    refreshSingleEvent() {
        const eventId = this.props.match.params.eventId
        axios.get(`/api/v1/event/${eventId}/`)
            .then((res) => {
                console.log(res.data)
                console.log(this.state.events)
                this.setState(res.data)
            }
        )
    }

    onDeleteEventClick() {
        const eventId = this.props.match.params.eventId
        axios.delete(`/api/v1/event/${eventId}/`)
            .then((res) => {
                console.log(res.data)
            }
        )
    }

    updateEvent(event) {
        axios.put(`/api/v1/event/${this.props.match.params.eventId}/`, {
            name: this.state.eventState.name,
            description: this.state.eventState.description,
            coordinate: this.state.eventState.coordinate,
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

    createNewNote = () => {
        const eventId = this.props.match.params.eventId
        const newSingleNote = {
            title: this.state.newNote.newNoteTitle,
            article: this.state.newNote.newNoteArticle,
            event: eventId
        }

        axios.post('/api/v1/note/', newSingleNote)
            .then(() => {
                this.refreshSingleEvent()
            })
    }

    onNewNoteChange = (event) => {
        const copyNoteState = {...this.state.newNote}
        copyNoteState[event.target.name] = event.target.value
        this.setState({newNote: copyNoteState})
    }

    render() {
        return(
            <div>
                <h1>{this.state.name}</h1>
                <h2>{this.state.description}</h2>
                <p>{this.state.coordinate}</p>
                <button onClick={() => {this.onDeleteEventClick(this.eventId)}}>
                    Delete Event
                </button>
                <div>
                    <input
                        type='string'
                        name='name'
                        placeholder='Update Name'
                        // required='required  x'
                        onChange={this.onEventChange}
                        value={this.state.eventState.name}/>
                    <input
                        type='string'
                        name='description'
                        placeholder='Change Description'
                        // required='required  x'
                        onChange={this.onEventChange}
                        value={this.state.eventState.description}/>
                    <input
                        type='number'
                        name='coordinate'
                        placeholder='Change Coordinate'
                        // required='required  x'
                        onChange={this.onEventChange}
                        value={this.state.eventState.coordinate}/>
                    <button onClick={() => this.updateEvent()}>
                        Update Event
                    </button>
                </div>
                <div>
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
                    <button onClick={() => this.createNewNote()}>
                        New Note
                    </button>
                </div>
            </div>
        )
    }
}