import React from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';

// import React from 'react';
// import { Link } from 'react-router-dom'
// import { ipcRenderer } from 'electron';
// import { currentEvent, nextEvent, nextEventIdx } from './util';
import { currentEvent, nextEvent, nextEventIdx } from './duration.utils';
import { STATUS_UPDATE_INTERVAL_MS } from './constants';
import Footer from './components/Footer';

function currentHash() {
  return window.location.hash;
}

function isStatusView() {
  return /status/.test(currentHash());
}

const isCheckConnectionView = () => {
  return /check_connection/.test(currentHash());
};

// // Disable pinch zooming
// require('electron').webFrame.setVisualZoomLevelLimits(1, 1);

type AppProps = {
  events: object;
};

type AppStates = {
  events: object;
};

class App extends React.Component<AppProps, AppStates> {
  constructor(props: AppProps) {
    super(props);
    this.state = { events: [] };
  }

  // componentDidMount() {
  //   ipcRenderer.send('calendar:list-events');
  //   this.setUpdateDisplayedEventsInterval();

  //   ipcRenderer.on('calendar:list-events-success', (event, events) => {
  //     if (isCheckConnectionView()) {
  //       window.location.hash = 'status';
  //     }
  //     events = this.processEvents(events);
  //     this.setState({events})
  //   });
  //   ipcRenderer.on('calendar:list-events-failure', (event, error) => {
  //     window.location.hash = 'check_connection';
  //   });

  //   ipcRenderer.on('calendar:quick-reservation-success', (event, events) => this.setState({ events }));
  //   ipcRenderer.on('calendar:quick-reservation-failure', (event, error) => console.error(error));

  //   ipcRenderer.on('calendar:finish-reservation-success', (event, events) => this.setState({ events }));
  //   ipcRenderer.on('calendar:finish-reservation-failure', (event, error) => console.error(error));
  // }

  // componentWillUnmount() {
  //   ipcRenderer.removeAllListeners();
  //   clearInterval(this.updateEventsInterval);
  // }

  // processEvents(events) {
  //   events = this.markAllDayEvents(events);
  //   events = this.removeUnconfirmedEvents(events);
  //   return events
  // }

  // markAllDayEvents(events) {
  //   return events.map((event) => {
  //     if (event.start.dateTime) {
  //       return {
  //         ...event,
  //         isAllDay: false,
  //       }
  //     } else {  // all day events received from api call don't have the dateTime field
  //       const start = new Date(event.start.date);
  //       start.setHours(0);
  //       const end = new Date(event.end.date);
  //       end.setHours(0);
  //       return {
  //         ...event,
  //         start: {...event.start, dateTime: start},
  //         end: {...event.end, dateTime: end},
  //         isAllDay: true,
  //       }
  //     }
  //   })
  // }

  // removeUnconfirmedEvents(events) {
  //   return events.filter(event => {
  //     return event.status === 'confirmed';
  //   });
  // }

  // handleQuickReservation(duration) {
  //   // duration is in minutes
  //   // if (duration * MILLISECONDS_PER_MINUTE > this.timeToNextEvent()) {
  //   //   return
  //   // }
  //   ipcRenderer.send('calendar:quick-reservation', duration);
  // }

  // handleFinishReservation(id) {
  //   ipcRenderer.send('calendar:finish-reservation', id);
  // }

  handleShowSchedule() {
    window.location.hash = 'schedule';
  }

  // setUpdateDisplayedEventsInterval() {
  //   this.updateEventsInterval = setInterval(() => {
  //     ipcRenderer.send('calendar:list-events');
  //   }, STATUS_UPDATE_INTERVAL_MS);
  // }

  render() {
    const { events } = this.state;
    console.log(events);
    const footerText = isStatusView() ? (
      <span>
        full schedule <i className="icon icon-arrow-right" />
      </span>
    ) : (
      <span>
        <i className="icon icon-arrow-left" /> back to booking
      </span>
    );

    return (
      <div id="app">
        {/* {React.cloneElement(this.props.children, {
          events,
          currentEvent: currentEvent(events),
          nextEvent: nextEvent(events),
          nextEventIdx: nextEventIdx(events),
          onQuickReservation: this.handleQuickReservation,
          onFinishReservation: this.handleFinishReservation,
          onShowSchedule: this.handleShowSchedule})
        }
        {this.drawFooter(footerText)} */}
        <p>Hello</p>
        <Footer text={footerText} statusView={isStatusView()} />
      </div>
    );
  }
}

export default App;
