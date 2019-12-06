import React from 'react'
import { render } from 'react-dom'
import HighchartsWrapper from './HighchartsWrapper'

class Chart extends React.Component {
  state = {
    series: [{
      data: [1,2,3]
    }]
  }

  onClick = () => {
    this.setState({
      series: [{
        data: [1,2,3]
      },
      {
        data: [2,3,1]
      },
      {
        data: [3,2,1]
      }]
    })
  }

  render () {
    return (
      <div>
      <HighchartsWrapper
        chartData={this.state.series}
      />
      <button onClick={this.onClick}>update</button>
      </div>
    )
  }
}

export default Chart;