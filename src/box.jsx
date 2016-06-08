//app.jsx

import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './constants'

const dragSource = {
  beginDrag(props) {
    return props
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Box extends Component {
  constructor() {
    super()
    this.style = {
      background: '#FCC'
    }
  }
  render() {
    const { width, height, connectDragSource, isDragging } = this.props
    return connectDragSource(
      <p style={{...this.style,
        width: width,
        height: height
      }}>Hello react</p>
    )
  }
}

export default DragSource(ItemTypes.BOX, dragSource, collect)(Box)