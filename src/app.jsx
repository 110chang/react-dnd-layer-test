//app.jsx

import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Box from './box'
import Layer from './layer'

class App extends Component {
  render() {
    return (
      <div>
        <Box width={100} height={100} />
        <Layer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);