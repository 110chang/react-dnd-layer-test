import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'

import { ItemTypes } from './constants'

import Arrow from './arrow'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

function getInnerStyles(props) {
  const { currentOffset, initialOffset } = props
  const { width, height } = props.item
  if (!currentOffset || !initialOffset) {
    return {
      display: 'none'
    }
  }
  let x0 = initialOffset.x
  let y0 = initialOffset.y
  let x = currentOffset.x
  let y = currentOffset.y

  let left = x0 + width
  let top = y0 + height
  let w = x - x0 - width
  let h = y - y0 - height

  if (x < left) {
    left = x
    w = width - x + x0
  }
  if (y < top) {
    top = y
    h = height - y + y0
  }

  return {
    position: 'absolute',
    left: left,
    top: top,
    zIndex: 0,
    width: w,
    height: h,
    background: 'rgba(0,255,255,0.1)'
  }
}

function getOuterStyles(props) {
  const { currentOffset, initialOffset } = props
  const { width, height } = props.item
  if (!currentOffset || !initialOffset) {
    return {
      display: 'none'
    }
  }
  let x0 = initialOffset.x
  let y0 = initialOffset.y
  let x = currentOffset.x
  let y = currentOffset.y

  let left = x0
  let top = y0
  let w = x - x0 + width
  let h = y - y0 + height

  return {
    position: 'absolute',
    left: left,
    top: top,
    zIndex: 1,
    width: w,
    height: h,
    background: 'rgba(255,255,0,0.1)',
    textAlign: 'right'
  }
}

class Layer extends Component {
  calcPos(props) {
    const { currentOffset, initialOffset } = props
    const { width, height } = props.item

    let x0 = initialOffset.x
    let y0 = initialOffset.y
    let x = currentOffset.x
    let y = currentOffset.y

    let x0_ = x0 + width
    let y0_ = y0 + height
    let x_ = x + width
    let y_ = y + height

    if (x < x0_) {
      x0_ = x - x0
    }
    if (y < y0_) {
      y0_ = y - y0
    }
    return {
      outerLeft: x0,
      outerTop: y0,
      outerRight: x_,
      outerBottom: y_,
      innerLeft: x0_,
      innerTop: y0_,
      innerRight: x,
      innerBottom: y
    }
  }
  renderItem(type, item) {
    switch (type) {
    case ItemTypes.BOX:
      return (
        <div>this is layer</div>
      )
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props
    if (!isDragging) {
      return null;
    }
    const pos = this.calcPos(this.props)

    return (
      <div style={layerStyles}>
        <div style={getInnerStyles(this.props)}>
          This is inner
        </div>
        <div style={getOuterStyles(this.props)}>
          This is outer
        </div>
        <Arrow
          offset={10}
          x0={pos.outerLeft}
          y0={pos.outerTop}
          x1={pos.innerRight}
          y1={pos.outerBottom}
        />
      </div>
    );
  }
}

function collect(monitor) {
  console.log(monitor)
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

export default DragLayer(collect)(Layer)