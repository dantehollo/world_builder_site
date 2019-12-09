import React, {Component} from 'react'
import axios from'axios'
import AllTimelines from './AllTimeline'
import AllEvents from './AllEvents'
import AllNotes from './AllNotes'

export default class HomePage extends Component {
    state = {
        allTimeline: [],
        newTimelineName: ''
    }

    componentDidMount() {
        this.refreshHomePage()
    }

    refreshHomePage() {
        axios.get('/api/v1/timeline')
            .then((res) => {
                const allTimeline = res.data
                this.setState({allTimeline: allTimeline})
            }
        )
    }

    createNewTimeline = (e) => {
        e.preventDefault()
        const newTimeline = {
            name: this.state.newTimelineName
        }
        axios.post('/api/v1/timeline/', newTimeline)
            .then(() => {
                this.refreshHomePage()
                this.setState({newTimelineName: ''})
            }
        )
    }

    onNewTimelineNameChange = (event) => {
        const newTimelineName = event.target.value
        this.setState({newTimelineName: newTimelineName})
    }

    render(){
        return(
            <div>
                <div>
                    <h1 className='welcome'>
                        Welcome
                    </h1>
                </div>
                <div className='center-field'>
                    <form className='clear-form' onSubmit={this.createNewTimeline}>
                        <input
                            type='string'
                            name='newTimelineName'
                            placeholder='New Timeline'
                            required='required'
                            onChange={this.onNewTimelineNameChange}
                            value={this.state.newTimelineName} />
                        <button>
                            New Timeline
                        </button>
                    </form>
                </div>
                <div className='three-column'>
                    <AllTimelines />
                    <AllEvents />
                    <AllNotes />
                </div>
            </div>

        )
    }
}

