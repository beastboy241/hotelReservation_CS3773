import DayPicker from 'react-day-picker';
import React from 'react';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';



export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartDayChange = this.handleStartDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
    this.state = {
      startDay: undefined,
      endDay: undefined
    };
  }

  handleStartDayChange(day) {
    this.setState({ startDay: day });
  }

  handleEndDayChange(day) {
    this.setState({ endDay: day });
  }


  render() {
    const { startDay } = this.state;
    const { endDay } = this.state;
    return (
      <div>
        {startDay && <p>Day: {startDay.toLocaleDateString()}</p>}
        {!startDay && <p>Choose a day</p>}
        <DayPickerInput onDayChange={this.handleStartDayChange} />

        {endDay && <p>Day: {endDay.toLocaleDateString()}</p>}
        {!endDay && <p>Choose a day</p>}
        <DayPickerInput onDayChange={this.handleEndDayChange} />
      </div>
    );
  }
}