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
                const allTimeline = res.data
                this.setState({allTimeline: allTimeline})
            }
        )
    }
    
    // create new timeline

    render() {
        return(
            <div>
                <div className='three-column'>
                    <div>
                        <h3 className='minor-heading'>
                            Timelines
                        </h3>
                        {this.state.allTimeline.map((timeline) => {
                            return(
                                <Link to={`/timeline/${timeline.id}`} key={timeline.id}>
                                    <div>
                                        {timeline.name}
                                    </div>
                                </Link>)
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}