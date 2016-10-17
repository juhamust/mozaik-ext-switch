import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ComponentRegistry from 'mozaik/src/browser/component-registry';
import Widget from 'mozaik/src/browser/components/Widget.jsx';
import classNames from 'classnames';


class Widgets extends Component {
  constructor() {
    super();
    this.state = {
      widgetIndex: 0
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      let nextWidgetIndex = this.state.widgetIndex + 1;
      if (nextWidgetIndex >= this.props.widgets.length) {
        nextWidgetIndex = 0;
      }

      if (this.mounted) {
        this.setState({
          widgetIndex: nextWidgetIndex
        });
      }
    }, this.props.duration);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    // NOTE: Render all the elements to mount them: Also triggers the data fetching
    const widgetElements = this.props.widgets.map((widgetProps, index) => {
      const widget = React.createElement(ComponentRegistry.get(widgetProps.type), widgetProps);
      const typeClass = widgetProps.type.replace('_', '-').replace('.', '__');

      let widgetClass = classNames({
        'widget': true,
        [typeClass]: true,
        'switch__widgets': true,
        'switch__widgets--hidden': this.state.widgetIndex !== index
      });

      return (
        <div className="widget__wrapper">
          <div className={widgetClass}>{widget}</div>
        </div>
      );
    });

    return (
      <div className="widget__wrapper">
        {widgetElements}
      </div>
    );
  }
}

Widgets.displayName = 'Widgets';

Widgets.propTypes = {
  widgets: PropTypes.array.isRequired,
  duration: PropTypes.integer
};

Widgets.defaultProps = {
  duration: 8000
};

export default Widgets;
