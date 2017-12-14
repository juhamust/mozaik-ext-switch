import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Registry } from '@mozaik/ui/es'
// import Widget from '@mozaik/ui/lib/components/widget/Widget'

const WidgetsElement = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const WidgetWrapper = styled.div.attrs({
    transitionDuration: props =>
        props.transitionDuration ? `${props.transitionDuration}ms` : '400ms',
})`
    width: 100%;
    height: 100%;
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: ${props => props.transitionDuration};
    transition-property: opacity;
`

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
            const widget = React.createElement(
                Registry.getComponent(widgetProps.extension, widgetProps.widget),
                widgetProps
            )

            const wrapperStyle = {}
            if (this.state.widgetIndex !== index) {
                wrapperStyle.opacity = 0
            }

            return (
                <WidgetWrapper key={index} style={wrapperStyle}>
                    <WidgetWrapper>{widget}</WidgetWrapper>
                </WidgetWrapper>
            )
        })

        return <WidgetsElement>{widgetElements}</WidgetsElement>
    }
}

Widgets.displayName = 'Widgets'

Widgets.propTypes = {
    widgets: PropTypes.array.isRequired,
    transitionDuration: PropTypes.integer,
    duration: PropTypes.integer,
}

Widgets.defaultProps = {
    duration: 2000,
    transitionDuration: 500,
}

export default Widgets
