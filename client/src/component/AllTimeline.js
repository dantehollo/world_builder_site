import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from'axios'

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
                this.setState({ allTimeline: allTimeline})
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
                {this.state.allTimeline.map((timeline) => {
                    return(
                        <Link to={`/timeline/${timeline.id}`}>
                            <div>{timeline.name}</div>
                        </Link>)
                        }
                    )
                }
                <div>
                    <input
                        type='string'
                        name='newTimelineName'
                        placeholder='New Timeline'
                        required='required'
                        onChange={this.onNewTimelineNameChange}
                        value={this.state.newTimelineName} />
                    <button onClick={() => this.createNewTimeline()}>
                        New Timeline
                    </button>
                </div>
            </div>
        )
    }
}