import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import './App.css';
import AllTimeline from './component/AllTimeline';
import SingleTimeline from './component/SingleTimeline';
import AllEvents from './component/AllEvents';
import SingleEvent from './component/SingleEvent';
import AllNotes from './component/AllNotes';
import SingleNote from './component/SingleNote';

class App extends React.Component {
  render() {
    
    
    return(
      <Router>
        <div className='wrapper'>
          <div className="header">
            <h1>World Builder</h1>
            <p>Make it your own</p>
          </div>
          <div>
            <h1 className='welcome'>
              Welcome
            </h1>
          </div>
          <div className='three-column'>
            <div className='column'>
              <Switch>
                <Route exact path="/" component={AllTimeline} />
                <Route exact path="/timeline/:timelineId" component={SingleTimeline} />
              </Switch>
            </div>
            <div className='column'>
              <Switch>
                <Route exact path="/" component={AllEvents} />
                <Route exact path="/event/:eventId" component={SingleEvent} />
              </Switch>
            </div>
            <div className='column'>
              <Switch>
                <Route exact path="/" component={AllNotes} />
                <Route exact path="/note/:noteId" component={SingleNote} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
