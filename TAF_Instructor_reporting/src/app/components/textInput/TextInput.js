// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';

class TextInput extends PureComponent {
  static propTypes = {
    label:    PropTypes.string.isRequired,
    id:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value:    PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    delay:    PropTypes.number
  };

  static defaultProps = {
    delay: 200
  };

  state = { stateValue: '' };

  timer = null;

  componentWillReceiveProps(nextProps) {
    const { stateValue } = this.state;
    const { value } = nextProps;

    if ((value !== stateValue) && stateValue.length === 0) {
      this.setState({stateValue: value});
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    const {label, id} = this.props;
    const { stateValue } = this.state;

    return (
      <div className="form-group">
        <label
          className="control-label"
          htmlFor={id}>
          {label}
        </label>
        <div>
          <input
            className="form-control"
            id={id}
            type="text"
            // value={value}
            defaultValue={stateValue}
            // onChange={this.handlesOnChange} // IE11 misses some keys entered... yes I know what you think...
            onInput={this.handlesOnChange}
          />
        </div>
      </div>
    );
  }

  handlesOnChange = (event) => {
    event.preventDefault();
    this.setState({stateValue: event.target.value});
    this.setTimerBeforeCallback(event.target.value);
  }
  // hack to prevent bad user xp when huge forms and callback each onChange to parent or store like redux:
  setTimerBeforeCallback(value) {
    const { onChange, delay } = this.props;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(
      () => onChange(value),
      delay
    );
  }
}

export default TextInput;
