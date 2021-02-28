import React, { PureComponent } from 'react'

export class Timer extends PureComponent {
  state = {
    currentTime: Date.now()
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ currentTime: Date.now() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const comparisonTime = this.props.endTime || this.state.currentTime
    const duration = comparisonTime - this.props.startTime
    const seconds = Math.floor(duration / 1000) % 60
    const secondsString = seconds.toString().padStart(2, '0')
    const minutes = Math.floor(duration / (60 * 1000)) % 60
    const minutesString = minutes.toString().padStart(2, '0')
    const hours = Math.floor(duration / (60 * 60 * 1000))
    const hoursString = hours != 0 ? `${hours}:` : ''

    return (
      <div className="mr-3">
        <p className="float-right">
          {`${hoursString}${minutesString}:${secondsString}`}
        </p>
      </div>
    )
  }
}

export default Timer
