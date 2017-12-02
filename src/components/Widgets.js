import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Registry } from '@mozaik/ui/lib'
import Widget from '@mozaik/ui/lib/components/widget/Widget.js'

class Widgets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            widgetIndex: 0,
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            let nextWidgetIndex = this.state.widgetIndex + 1
            if (nextWidgetIndex >= this.props.widgets.length) {
                nextWidgetIndex = 0
            }

            if (this.mounted) {
                this.setState({
                    widgetIndex: nextWidgetIndex,
                })
            }
        }, this.props.duration)
        this.mounted = true
    }

    componentWillUnmount() {
        this.mounted = false
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    }

    render() {
        // NOTE: Render all the elements to mount them: Also triggers the data fetching
        const widgetElements = this.props.widgets.map((widgetProps, index) => {
            const widget = <div>widget {index}</div>
            //const widget = React.createElement(Registry.getComponent.get(widgetProps.type), widgetProps);

            const wrapperStyle = {}
            if (this.state.widgetIndex !== index) {
                wrapperStyle.display = 'none'
            }

            return (
                <div key={index} style={wrapperStyle}>
                    <div>{widget}</div>
                </div>
            )
        })

        return <div>{widgetElements}</div>
    }
}

Widgets.displayName = 'Widgets'

Widgets.propTypes = {
    widgets: PropTypes.array.isRequired,
    duration: PropTypes.integer,
}

Widgets.defaultProps = {
    duration: 1000,
}

export default Widgets
