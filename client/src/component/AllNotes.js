import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class AllNotes extends Component {
    state = {
        allNotes: []
    }

    componentDidMount() {
        this.refreshNotes()
    }

    refreshNotes() {
        axios.get('/api/v1/note/')
            .then((res) => {
                console.log(this.state.allNotes)
                console.log(res.data)
                const allNotes = res.data
                this.setState({allNotes: allNotes})
            }
        )
    }

    render() {
        return(
            <div>
                <h2 className='minor-heading'>
                    Notes
                </h2>
                {this.state.allNotes.map((note) => {
                    return(
                        <Link to={`/note/${note.id}`}>
                            <div>{note.title}</div>
                        </Link>)
                })}
            </div>
        )
    }

}