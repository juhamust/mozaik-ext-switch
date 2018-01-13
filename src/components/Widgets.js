import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Registry } from '@mozaik/ui/es'
import WidgetsRegistry from '@mozaik/ui/es/WidgetsRegistry'
import { subscribeToApi } from '@mozaik/ui/es/actions/apiActions'
import WidgetContainer from '@mozaik/ui/es/containers/WidgetContainer'

const WidgetsElement = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
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
        const { theme, transitionDuration } = this.props
        const WidgetWrapper = styled.div`
            width: 100%;
            height: 100%;
            opacity: 1;
            position: absolute;
            top: 0;
            left: 0;
            transition-duration: ${transitionDuration ? `${transitionDuration}ms` : '400ms'};
            transition-property: opacity;
        `

        // NOTE: Render all the elements to mount them: Also triggers the data fetching
        const widgetElements = this.props.widgets.map((widgetProps, index) => {
            const { extension, widget } = widgetProps
            const component = Registry.getComponent(extension, widget)

            // Subscribe to apiData
            let subscription = null
            if (typeof component.getApiRequest === 'function') {
                subscription = component.getApiRequest(widgetProps)
                this.props.dispatch(subscribeToApi(subscription))
            }

            const wrapperWidget = React.createElement(
                WidgetContainer,
                {
                    registry: WidgetsRegistry,
                    extension,
                    widget,
                    theme,
                    subscriptionId: subscription && subscription.id,
                },
                component
            )

            const wrapperStyle = {}
            if (this.state.widgetIndex !== index) {
                wrapperStyle.opacity = 0
            }

            return (
                <WidgetWrapper key={index} style={wrapperStyle}>
                    <WidgetWrapper>{wrapperWidget}</WidgetWrapper>
                </WidgetWrapper>
            )
        })

        return <WidgetsElement>{widgetElements}</WidgetsElement>
    }
}

Widgets.displayName = 'Widgets'

Widgets.propTypes = {
    dispatch: PropTypes.func.isRequired,
    apiData: PropTypes.object,
    widgets: PropTypes.array.isRequired,
    transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    duration: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    theme: PropTypes.object.isRequired,
}

Widgets.defaultProps = {
    duration: 2000,
    transitionDuration: 500,
}

export default connect()(Widgets)
