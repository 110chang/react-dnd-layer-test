//app.jsx

import React, { Component } from 'react'

const THICKNESS = 1
const FONT_SIZE = 10

export default class Arrow extends Component {
  constructor(props) {
    super(props)
  }
  getPath(size, offset) {
    const t = THICKNESS
    const f = FONT_SIZE

    let path = ''
    let x0 = t / 2 + offset
    let x1 = size - t / 2
    let y = t / 2 + offset

    path += `M ${x0 + f} ${y + f} `
    path += `L ${x0    } ${y    } `
    path += `L ${x1    } ${y    } `
    path += `L ${x1 - f} ${y + f} `

    return path
  }
  getViewBox(W, H, Wj, Hj) {
    return `0 0 ${W + Math.abs(Wj)} ${H + Math.abs(Hj)}`
  }
  getAngle(theta, Wj, Hj) {
    const angle = theta * 180 / Math.PI
    const x = Wj < 0 ? Math.abs(Wj) : 0
    const y = Hj < 0 ? Math.abs(Hj) : 0
    return [angle, x, y]
  }
  render() {
    const { x0, y0, x1, y1, offset } = this.props

    const W = x1 - x0
    const H = y1 - y0
    const L = Math.sqrt(W * W + H * H)
    const theta = Math.atan2(H, W)
    const Wj = offset * Math.sin(theta) * -1
    const Hj = offset * Math.cos(theta) *  1

    const width = W + Math.abs(Wj)
    const height = H + Math.abs(Hj)
    const left = Wj < 0 ? Wj : 0
    const top = Hj < 0 ? Hj : 0

    console.log(W, H, Wj, Hj)
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={this.getViewBox(W, H, Wj, Hj)}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          left: x0 + left,
          top: y0 + top,
          zIndex: 9999,
          width: width,
          height: height
        }}
      >
        <g transform={`rotate(${this.getAngle(theta, Wj, Hj).join(',')})`}>
          <path d={this.getPath(L, offset)}
            stroke={"#000"}
            strokeWidth={THICKNESS}
            fill={"transparent"}
          />
          <text
            x={0} y={0} fontSize={FONT_SIZE} textAnchor={'middle'}
            fill={'#000'} stroke={'none'}
          >{`currentOffset.x: ${width}px`}</text>
        </g>
      </svg>
    )
  }
}

