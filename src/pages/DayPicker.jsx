import DayPicker from 'react-day-picker';
import React from 'react';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';



class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartDayChange = this.handleStartDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
    this.state = {
      startDay: undefined,
      endDay: undefined
    }
  }

  handleStartDayChange(day) {
    this.setState({ startDay: day });
  }

  handleEndDayChange(day) {
    this.setState({ endDay: day });
  }

  get startDay(){
    return this.startDay;
  }

  get endDay(){
    return this.endDay;
  }

  render() {
    const { startDay } = this.state;
    const { endDay } = this.state;
    return (
      <div className="date-container" style={{color: "black"}}>
        {startDay && <p style={{color: "white"}}>Check In: {startDay.toLocaleDateString()}</p>}
        {!startDay && <p style={{color: "white"}}> Check In: </p>}
        <DayPickerInput onDayChange={this.handleStartDayChange} />
        <p> </p>
        {endDay && <p style={{color: "white"}}>Check Out: {endDay.toLocaleDateString()}</p>}
        {!endDay && <p style={{color: "white"}}> Check Out:</p>}
        <DayPickerInput onDayChange={this.handleEndDayChange} />
      </div>
    );
  }
}


export default DatePicker;