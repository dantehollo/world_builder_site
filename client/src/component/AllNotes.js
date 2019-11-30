import React, {Component} from 'react'
import {Link} from 'react'
import axios from 'axios'

export default class AllNotes extends Component {
    state = {
        allNotes: [],
        newNote: {
            title: '',
            article: ''
        }
    }

    componentDidMount() {
        this.refreshNotes()
    }

    refreshNotes() {
        axios.get('/api/v1/note/')
            .then((res) => {
                // const allNotes = res.data
                this.setState({allNotes: res.data})
            }
        )
    }

    render() {
        return(
            <div>
                {this.state.allNotes.map((note) => {
                    return(
                        <Link to={`/note/${note.id}`}>
                            <div>{note.name}</div>
                        </Link>)
                })}
            </div>
        )
    }

}