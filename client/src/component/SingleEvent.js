import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class SingleEvent extends Component {
    state = {
        eventState: {
            name: '',
            description: '',
            coordinate: '',
        },
        reDirHome: false
    }

    componentDidMount() {
        this.refreshSingleEvent()
    }

    refreshSingleEvent() {
        const eventId = this.props.match.params.eventId
        axios.get(`/api/v1/event/${eventId}/`)
            .then((res) => {
                this.setState(res.data)
            }
        )
    }

    onDeleteEventClick() {
        const eventId = this.props.match.params.eventId
        axios.delete(`/api/v1/event/${eventId}/`)
            .then((res) => {
                this.setState({reDirHome: true})
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

    render() {
        if (this.state.reDirHome == true) {
            return (<Redirect to={'/'}/>)
        }
        return(
            <div className='not-hidden'>
                <h1 className='major-heading'>{this.state.name}</h1>
                <h2 className='center-field'>{this.state.description}</h2>
                {/* <p>{this.state.coordinate}</p> */}
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
                    <button onClick={() => {this.onDeleteEventClick(this.eventId)}}>
                        Delete Event
                    </button>
                </div>
            </div>
        )
    }
}