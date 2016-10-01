import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ComponentRegistry from 'mozaik/src/browser/component-registry';
import Widget from 'mozaik/src/browser/components/Widget.jsx';


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

      console.log('Next widdget', nextWidgetIndex);
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
    const childProps = this.props.widgets[this.state.widgetIndex];
    const { type } = this.props.widgets[this.state.widgetIndex];
    const widget = React.createElement(ComponentRegistry.get(type), childProps);

    // Set class according to component type
    const cssClass = `widget ${ type.replace('_', '-').replace('.', '__') }`;

    return (
      <div className="widget__wrapper">
        <div className={cssClass}>{widget}</div>
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
