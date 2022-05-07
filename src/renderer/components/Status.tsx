import React from 'react';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { isEmpty } from 'lodash';

import EventDetails from './EventDetails';
import Free from './free';
import Booked from './booked';

type StatusProps = {
  // events: Array;
  currentEvent: object;
  nextEvent: object;
  // nextEventIdx: number;
  onQuickReservation: Function;
  onFinishReservation: Function;
  onShowSchedule: Function;
};

type StatusStates = {
  detailsExpanded: boolean;
};

class Status extends React.Component<StatusProps, StatusStates> {
  constructor(props: StatusProps) {
    super(props);
    this.state = {
      detailsExpanded: false,
    };
  }

  handleExpandDetails() {
    this.setState({
      detailsExpanded: !this.state.detailsExpanded,
    });
  }

  isBooked() {
    const { currentEvent } = this.props;
    const now = Date.now();

    return Object.keys(currentEvent).length > 0
      && Date.parse(currentEvent.start.dateTime) <= now
      && Date.parse(currentEvent.end.dateTime) > now;
  }

  render() {
    const {
      nextEvent,
      currentEvent,
      onQuickReservation,
      onFinishReservation,
      onShowSchedule,
    } = this.props;

    const { detailsExpanded } = this.state;
    const rootClasses = classNames({
      'status-view': true,
      expanded: detailsExpanded,
      booked: this.isBooked(),
    });

    const statusComponent = this.isBooked() ? (
      <Booked
        onClick={() => onFinishReservation(currentEvent.id)}
        currentEvent={currentEvent}
        key={1}
      />
    ) : (
      <Free
        onClick15={() => onQuickReservation(15)}
        onClick30={() => onQuickReservation(30)}
        nextEvent={nextEvent}
        key={1}
      />
    );

    const isCurrent = !isEmpty(currentEvent);

    return (
      <div className={rootClasses}>
        <TransitionGroup>
          <CSSTransition
            classNames="fade"
            appear
            timeout={{ enter: 500, exit: 300, appear: 500 }}
          >
            {statusComponent}
          </CSSTransition>
        </TransitionGroup>
        <EventDetails
          event={isEmpty(currentEvent) ? nextEvent : currentEvent}
          isCurrent={isCurrent}
          expanded={detailsExpanded}
          handleExpandDetails={this.handleExpandDetails}
          handleShowSchedule={onShowSchedule}
        />
      </div>
    );
  }
}

export default Status;
