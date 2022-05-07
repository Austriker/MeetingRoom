import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  icon: string;
  handleClick: Function;
  disabled?: boolean;
};

type ButtonStates = {
  clicked: boolean;
};

class Button extends React.Component<ButtonProps, ButtonStates> {

  constructor(props: ButtonProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      clicked: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.clickedTimer);
  }

  handleClick(e) {
    this.setState({ clicked: true });
    this.clickedTimer = setTimeout(
      () => this.setState({ clicked: false }),
      1000
    );
    this.props.handleClick(e);
  }

  render() {
    const { icon, disabled, className } = this.props;
    const { clicked } = this.state;
    const iconClasses = classNames('icon', `icon-${icon}`);
    const btnClasses = classNames(
      {
        clicked,
        disabled,
      }, this.props.className);

    return (
      <button
        onClick={this.handleClick}
        className={btnClasses}
        disabled={clicked}
      >
        <i className={iconClasses} />
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
}

export default Button;
