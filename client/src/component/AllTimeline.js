import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from'axios'
import AllEvents from './AllEvents'
import AllNotes from './AllNotes'


export default class AllTimeline extends Component {
    state = {
        allTimeline: [],
        newTimelineName: ''
    }
    
    // get all
    componentDidMount() {
        this.refreshTimelines()
    }

    refreshTimelines() {
        axios.get('/api/v1/timeline/')
            .then((res) => {
                console.log(res.data)
                const allTimeline = res.data
                this.setState({allTimeline: allTimeline})
            }
        )
    }
    
    // create new timeline
    createNewTimeline() {
        const newTimeline = {
            name: this.state.newTimelineName
        }
        axios.post('/api/v1/timeline/', newTimeline)
            .then(() => {
                this.refreshTimelines()
            }
        )
    }

    onNewTimelineNameChange = (event) => {
        const newTimelineName = event.target.value
        this.setState({newTimelineName: newTimelineName})
    }

    render() {
        return(
            <div>
                <div>
                    <h1 className='welcome'>
                        Welcome
                    </h1>
                </div>
                <div className='center-field'>
                    <div>
                        <input
                            type='string'
                            name='newTimelineName'
                            placeholder='New Timeline'
                            required='required'
                            onChange={this.onNewTimelineNameChange}
                            value={this.state.newTimelineName} />
                    </div>
                    <button onClick={() => this.createNewTimeline()}>
                        New Timeline
                    </button>
                </div>
                <div className='three-column'>
                    <div>
                        <h3 className='minor-heading'>
                            Timelines
                        </h3>
                        {this.state.allTimeline.map((timeline) => {
                            return(
                                <Link to={`/timeline/${timeline.id}`}>
                                    <div>{timeline.name}</div>
                                </Link>)
                                }
                            )
                        }
                    </div>
                    <AllEvents />
                    <AllNotes />
                </div>
            </div>
        )
    }
}