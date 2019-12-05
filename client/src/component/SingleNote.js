import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class SingleNote extends Component {
    state = {
        noteState: {
            title: '',
            article: ''
        },
        reDirHome: false
    }

    componentDidMount() {
        this.refreshSingleNote()
    }

    refreshSingleNote() {
        const noteId = this.props.match.params.noteId
        axios.get(`/api/v1/note/${noteId}`)
            .then((res) => {
                this.setState(res.data)
            }
        )
    }

    onDeleteNoteClick() {
        const noteId = this.props.match.params.noteId
        axios.delete(`/api/v1/note/${noteId}`)
            .then(() => {
                this.setState({reDirHome: true})
            }
        )
    }

    updateNote() {
        const noteId = this.props.match.params.noteId
        axios.put(`/api/v1/note/${noteId}/`, {
            title: this.state.noteState.title,
            article: this.state.noteState.article,
        }
    )
            .then(() => {
                this.refreshSingleNote()
            }
        )       
    }

    onNoteChange = (event) => {
        const copyNoteState = {...this.state.noteState}
        copyNoteState[event.target.name] = event.target.value
        this.setState({noteState: copyNoteState})
    }

    render() {
        if(this.state.reDirHome === true){
            return <Redirect to={'/'} />
        }
        return(
            <div className='not-hidden'>
                <div>
                    <h1 className='major-heading'>{this.state.title}</h1>
                    <p className='bottom-space'>{this.state.article}</p>
                </div>
                <div className='center-field'>
                    <input
                        type='string'
                        name='title'
                        placeholde='Note Title'
                        onChange={this.onNoteChange}
                        value={this.state.noteState.title}/>
                    <input
                        type='string'
                        name='article'
                        placeholde='Note Article'
                        onChange={this.onNoteChange}
                        value={this.state.noteState.article}/>
                    <button onClick={() => this.updateNote()}>
                            Update Note
                    </button>
                    <button onClick={() => this.onDeleteNoteClick()}>
                            Delete Note
                    </button>
                </div>
            </div>
        )
    }
}