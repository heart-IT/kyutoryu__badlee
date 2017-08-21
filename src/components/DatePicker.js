/**
 * @chill- What does it mean, to lie? I'll keep doing as i have been: Laughing when i am happy, Crying when i am sad- Ryokan
 */

"use strict";
import React, { Component } from "react";
import DatePicker from "react-native-datepicker";

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "1991/01/01" };
  }
  dateChange(date) {
    this.props.onDateChange(date);
    this.setState({ date: date });
  }
  render() {
    return (
      <DatePicker
        date={this.state.date}
        ref={d => {
          this.datePicker = d;
        }}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        maxDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={this.dateChange.bind(this)}
      />
    );
  }
}
