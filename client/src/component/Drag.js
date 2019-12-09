import React, {Component} from 'react'

export default class Drag extends Component ({
    getDefaultProps = () => {
        return {
            initialPos: {x: 0, y: 0}
        }
    },
    
    
    getInitalState = () => {
        return {
            pos: this.props.initialPos,
            dragging: false,
            rel: null
        }
    },
    
    
    componentDidUpdate = (props, state) => {
        if(this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    },
    
    
    onMouseDown = (e) => {
        if(e.button !== 0) return
        let pos = $(this.getDonNode()).offset()
        this.setState({
            dragging: true,
            rel: {
                x: e.pageS - pos.left,
                y: e.pageY - pos.top
            }
        })
        e.stopPropagation()
        e.preventDefault()
    },
    
    
    onMouseUp = (e) => {
        this.setState({dragging: false})
        e.stopPropagation()
        e.preventDefault()
    },
    
    
    onMouseMove = (e) => {
        if (!this.state.dragging) return
        this.setState({
            pos: {
                x: e.pageX - this.state.rel.x,
                y: e.pageY - thisstate.rel.y
            }
        })
        e.stopPropagation()
        e.preventDefault()
    },
    
    
    render = () => {
        return this.transferPropsTo(React.DOM.div({
            onMouseDown: this.onMouseDown,
            style: {
                left: this.state.x + 'px',
                top: this.state.y + 'px'
            }
        }, this,props.children))
    }
})