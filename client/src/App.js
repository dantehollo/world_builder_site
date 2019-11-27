import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import './App.css';
import AllTimeline from './component/AllTimeline'
import SingleTimeline from './component/SingleTimeline'
import AllEvents from './component/AllEvents';

class App extends React.Component {
  render() {
    
    
    return(
      <Router>
        <div>
          <div className="header">

          </div>

          <Switch>
            <Route exact path="/" component={AllTimeline} />
            <Route exact path="/timeline/:timelineId" component={SingleTimeline} />
          </Switch>
          <Switch>
            <Route exact path="/" component={AllEvents} />
            <Route exact path="/event/:eventId" component={SingleTimeline} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
