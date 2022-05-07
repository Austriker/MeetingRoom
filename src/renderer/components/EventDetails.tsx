import React from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import Button from './button';
import EventDuration from './event_duration';

type EventDetailsProps = {
  event: object;
  expanded: boolean;
  isCurrent: boolean;
  // handleShowSchedule: Function;
  handleExpandDetails: Function;
};

class EventDetails extends React.Component<EventDetailsProps> {

  handleExpandDetails() {
    this.props.handleExpandDetails();
  }

  attendees() {
    const { event } = this.props;

    if (!event.attendees) {
      return null;
    }

    return event.attendees.map((attendee, index) => {
      if (attendee.resource) {
        return null;
      }
      return <li key={index}>{attendee.displayName || attendee.email}</li>;
    });
  }

  render() {
    const { event, isCurrent, expanded } = this.props;

    if (isEmpty(event)) {
      return (
        <div className="event-details flex-container">
          <h3 className="event-details-status">NO UPCOMING EVENTS</h3>
        </div>
      );
    }

    const btnClasses = classNames({
      small: true,
      'expand-btn': true,
      expanded,
    });

    return (
      <div className="event-details flex-container">
        <Button
          icon="arrow-up"
          className={btnClasses}
          handleClick={this.handleExpandDetails}
        />
        <h3 className="event-details-status">
          {isCurrent ? 'CURRENT MEETING' : 'COMING UP'}
        </h3>
        <h3 className="event-details-name">{event.summary}</h3>
        <EventDuration event={event} />
        <p className="event-details-creator">
          {event.creator.displayName || event.creator.email}
        </p>
        <ul className="event-details-attendees">{this.attendees()}</ul>
      </div>
    );
  }
}

export default EventDetails;
