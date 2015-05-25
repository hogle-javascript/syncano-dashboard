var React = require('react');
var classNames = require('classnames');
var Moment = require('moment');

var Icon = require('../Icon/Icon.react');

require('./Calendar.css');

module.exports = React.createClass({

  displayName: 'Calendar',

  getDefaultProps: function () {
    return {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },

  getInitialState: function () {
    var date = new Date();
    return {
      currentMonthDaysCount: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      previousMonthDaysCount: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
      nextMonthDaysCount: new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate(),
      displayedMonth: date.getMonth() + 1,
      displayedYear: date.getFullYear(),
      displayedDays: [],
      displayedHours: new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours(),
      displayedMinutes: new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes(),
      displayedSeconds: new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds(),
      displayedTimezone: new Date().getTimezoneOffset() / -60,
    };
  },

  componentDidMount: function () {
    this.getDaysOfMonth();
  },

  handleOnChange: function (fieldName, event) {
    var value = event.target.value;
    var regExp = new RegExp("^[0-9]+$");
    var regExpGMT = new RegExp("^[0-9]+$|\-");
    switch (fieldName) {
      case "hours":
        if (regExp.test(value)) {
          if (value > 23 || value == "") {
            this.setState({
              displayedHours: 23,
            });
          } else {
            this.setState({
              displayedHours: value,
            });
          }
          ;
        }
        break;

      case "minutes":
        if (regExp.test(value)) {
          if (value > 59 || value == "") {
            this.setState({displayedMinutes: 59 })
          } else {
            this.setState({displayedMinutes: value});
          }
        };
        break;

      case "seconds":
        if (regExp.test(value)) {
          if (value > 59 || value == "") {
            this.setState({displayedSeconds: 59});
          } else {
            this.setState({displayedSeconds: value});
          }
          ;
        }
        ;
        break;

      case "timezone":
        if (regExpGMT.test(value)) {
          if (value > 12 || value == "") {
            this.setState({
              displayedTimezone: 12,
            });
          } else if (value < -11) {
            this.setState({
              displayedTimezone: -11,
            });
          } else {
            this.setState({
              displayedTimezone: value,
            });
          }
          ;
        }
        ;
        break;
    }
    ;
  },

  //getDaysOfMonth: function () {
  //  var date = new Date();
  //  var dayOfWeek = new Date([this.state.displayedYear, this.state.displayedMonth, 1].join("-").toString()).getDay();
  //  var prevMonth = [];
  //  var days = [];
  //
  //  this.setState({
  //      previousMonthDaysCount: new Date(this.state.displayedYear, this.state.displayedMonth - 1, 0).getDate(),
  //  }, function () {
  //    for (var i = 0; i < this.state.previousMonthDaysCount; i++) {
  //      prevMonth.push(i + 1);
  //    }
  //    ;
  //    for (var i = (prevMonth.length - dayOfWeek); i < prevMonth.length; i++) {
  //      days.push(<div onClick={this.handleClickDay.bind(this, "previous")}
  //                     className="calendar-day-other">{prevMonth[i]}</div>);
  //    }
  //    ;
  //  });
  //  this.setState({
  //    currentMonthDaysCount: new Date(this.state.displayedYear, this.state.displayedMonth, 0).getDate(),
  //  }, function () {
  //    for (var i = 1; i <= this.state.currentMonthDaysCount; i++) {
  //      days.push(<div onClick={this.handleClickDay.bind(this, "current")} className="calendar-day">{i}</div>);
  //    }
  //    ;
  //    for (var i = 1; i <= 42 - (dayOfWeek + this.state.currentMonthDaysCount); i++) {
  //      days.push(<div onClick={this.handleClickDay.bind(this, "next")} className="calendar-day-other">{i}</div>)
  //    }
  //    ;
  //    this.setState({
  //      displayedDays: days.map(function (day, i) {
  //        return {day}
  //      }),
  //    });
  //  });
  //},

  handleClickDay: function (dayOfMonth, event) {
    var hourGMT = parseInt(this.refs.hours.getDOMNode().value) - parseInt(this.refs.timezone.getDOMNode().value);
    var dayGMT = parseInt(event.target.innerHTML);
    var monthGMT = parseInt(this.state.displayedMonth);
    var yearGMT = parseInt(this.state.displayedYear);
    if (hourGMT > 23) {
      hourGMT = "00";
      if (dayGMT == this.state.currentMonthDaysCount) {
        dayGMT = 1;
        monthGMT++;
        if (monthGMT > 12) {
          monthGMT = 1;
          yearGMT++;
        } else {
          monthGMT++;
        }
        ;
      } else {
        dayGMT++;
      }
      ;
    } else if (hourGMT < 0) {
      hourGMT = "23";
      if (dayGMT == 1) {
        dayGMT = this.state.previousMonthDaysCount;
        monthGMT--;
        if (monthGMT < 1) {
          monthGMT = 12;
          yearGMT--;
        } else {
          monthGMT--;
        }
        ;
      } else {
        dayGMT--;
      }
      ;
    }
    ;

    switch (dayOfMonth) {
      case "previous":
        if (monthGMT - 1 < 1) {
          monthGMT = 12;
          yearGMT--;
        } else {
          monthGMT--;
        }
        this.props.inputField.getDOMNode().innerHTML = yearGMT + "-" +
          monthGMT + "-" + dayGMT + "T" +
          hourGMT + ":" + this.state.displayedMinutes + ":" +
          this.state.displayedSeconds + ".000000Z";
        break;

      case "current":
        this.props.inputField.getDOMNode().innerHTML = yearGMT + "-" +
          monthGMT + "-" + dayGMT + "T" +
          hourGMT + ":" + this.state.displayedMinutes + ":" +
          this.state.displayedSeconds + ".000000Z";
        break;

      case "next":
        if (monthGMT + 1 > 12) {
          monthGMT = 1;
          yearGMT++;
        } else {
          monthGMT++;
        }
        this.props.inputField.getDOMNode().innerHTML = yearGMT + "-" +
          monthGMT + "-" + dayGMT + "T" +
          hourGMT + ":" + this.state.displayedMinutes + ":" +
          this.state.displayedSeconds + ".000000Z";
        break;
    }
    ;
  },

  handlePreviousMonthClick: function () {
    if (this.state.displayedMonth == 1) {
      this.setState({
        displayedMonth: 12,
        displayedYear: this.state.displayedYear - 1,
      }, function () {
        this.getDaysOfMonth();
      });
    } else {
      this.setState({
        displayedMonth: this.state.displayedMonth - 1,
      }, function () {
        this.getDaysOfMonth();
      });
    }
    ;
  },

  handleNextMonthClick: function () {
    if (this.state.displayedMonth == 12) {
      this.setState({
        displayedMonth: 1,
        displayedYear: this.state.displayedYear + 1,
      }, function () {
        this.getDaysOfMonth();
      });
    } else {
      this.setState({
        displayedMonth: this.state.displayedMonth + 1,
      }, function () {
        this.getDaysOfMonth();
      });
    }
    ;
  },

  increaseHMS: function (fieldName) {
    if (fieldName === "hours") {
      if (this.refs.hours.getDOMNode().value == 23) {
        this.refs.hours.getDOMNode().value = "00"
      } else if (this.refs.hours.getDOMNode().value < 9) {
        this.refs.hours.getDOMNode().value = "0" + (parseInt(this.refs.hours.getDOMNode().value) + 1);
      } else {
        this.refs.hours.getDOMNode().value = parseInt(this.refs.hours.getDOMNode().value) + 1;
      }
    }
    ;
    if (fieldName === "minutes") {
      if (this.refs.minutes.getDOMNode().value == 59) {
        this.refs.minutes.getDOMNode().value = "00"
      } else if (this.refs.minutes.getDOMNode().value < 9) {
        this.refs.minutes.getDOMNode().value = "0" + (parseInt(this.refs.minutes.getDOMNode().value) + 1);
      } else {
        this.refs.minutes.getDOMNode().value = parseInt(this.refs.minutes.getDOMNode().value) + 1;
      }
    }
    ;
    if (fieldName === "seconds") {
      if (this.refs.seconds.getDOMNode().value == 59) {
        this.refs.seconds.getDOMNode().value = "00"
      } else if (this.refs.seconds.getDOMNode().value < 9) {
        this.refs.seconds.getDOMNode().value = "0" + (parseInt(this.refs.seconds.getDOMNode().value) + 1);
      } else {
        this.refs.seconds.getDOMNode().value = parseInt(this.refs.seconds.getDOMNode().value) + 1;
      }
    }
    ;
    if (fieldName === "timezone") {
      if (this.refs.timezone.getDOMNode().value == 12) {
        this.refs.timezone.getDOMNode().value = "-11"
      } else {
        this.refs.timezone.getDOMNode().value = parseInt(this.refs.timezone.getDOMNode().value) + 1;
      }
    }
    ;
  },

  decreaseHMS: function (fieldName) {
    if (fieldName === "hours") {
      if (this.refs.hours.getDOMNode().value == 0) {
        this.refs.hours.getDOMNode().value = "23"
      } else if (this.refs.hours.getDOMNode().value < 11) {
        this.refs.hours.getDOMNode().value = "0" + (parseInt(this.refs.hours.getDOMNode().value) - 1);
      } else {
        this.refs.hours.getDOMNode().value = parseInt(this.refs.hours.getDOMNode().value) - 1;
      }
    }
    ;
    if (fieldName === "minutes") {
      if (this.refs.minutes.getDOMNode().value == 0) {
        this.refs.minutes.getDOMNode().value = "59"
      } else if (this.refs.minutes.getDOMNode().value < 11) {
        this.refs.minutes.getDOMNode().value = "0" + (parseInt(this.refs.minutes.getDOMNode().value) - 1);
      } else {
        this.refs.minutes.getDOMNode().value = parseInt(this.refs.minutes.getDOMNode().value) - 1;
      }
    }
    ;
    if (fieldName === "seconds") {
      if (this.refs.seconds.getDOMNode().value == 0) {
        this.refs.seconds.getDOMNode().value = "59"
      } else if (this.refs.seconds.getDOMNode().value < 11) {
        this.refs.seconds.getDOMNode().value = "0" + (parseInt(this.refs.seconds.getDOMNode().value) - 1);
      } else {
        this.refs.seconds.getDOMNode().value = parseInt(this.refs.seconds.getDOMNode().value) - 1;
      }
    }
    ;
    if (fieldName === "timezone") {
      if (this.refs.timezone.getDOMNode().value == -11) {
        this.refs.timezone.getDOMNode().value = "12"
      } else {
        this.refs.timezone.getDOMNode().value = parseInt(this.refs.timezone.getDOMNode().value) - 1;
      }
    }
    ;
  },
  //
  render: function () {
    var iconStyle = {fill: "#FAFAFA", width: "16px", height: "16px"};
    var hoursIconStyle = {fill: "#FAFAFA", width: "16px", height: "16px"};
    var weekDays = this.props.weekDays.map(function (weekDay, i) {
      return <div className="calendar-week-days" key={i}>{weekDay}</div>;
    });

    return (
      <div className="calendar-field">
        <div className="calendar-head">
          <div className="calendar-head-content">
            <Icon style={iconStyle} icon="navigate_before" handleClick={this.handlePreviousMonthClick}/>
          </div>
          <div className="calendar-head-date">
            <div ref="month" className="calendar-head-content">{this.props.months[this.state.displayedMonth - 1]}</div>
            <div ref="year" className="calendar-head-content">{this.state.displayedYear}</div>
          </div>
          <div className="calendar-head-content">
            <Icon style={iconStyle} icon="navigate_after" handleClick={this.handleNextMonthClick}/>
          </div>
        </div>
        <div className="calendar-week">
          {weekDays}
        </div>
        <div className="calendar-days">
          {this.state.displayedDays}
        </div>
        <div className="calendar-hours-field">
          <div className="calendar-hours">
            <div className="calendar-change-hours">
              <Icon style={hoursIconStyle} icon="arrow_up" handleClick={this.increaseHMS.bind(this, "hours")}/>
              <input ref="hours" className="calendar-input" type="text" maxLength={2}
                     onChange={this.handleOnChange.bind(this, "hours")} value={this.state.displayedHours}></input>
              <Icon style={hoursIconStyle} icon="arrow_down" handleClick={this.decreaseHMS.bind(this, "hours")}/>
            </div>
            <span className="calendar-separator">:</span>

            <div className="calendar-change-minutes">
              <Icon style={hoursIconStyle} icon="arrow_up" handleClick={this.increaseHMS.bind(this, "minutes")}/>
              <input ref="minutes" className="calendar-input" type="text" maxLength={2}
                     onChange={this.handleOnChange.bind(this, "minutes")} value={this.state.displayedMinutes}></input>
              <Icon style={hoursIconStyle} icon="arrow_down" handleClick={this.decreaseHMS.bind(this, "minutes")}/>
            </div>
            <span className="calendar-separator">:</span>

            <div className="calendar-change-seconds">
              <Icon style={hoursIconStyle} icon="arrow_up" handleClick={this.increaseHMS.bind(this, "seconds")}/>
              <input ref="seconds" className="calendar-input" type="text" maxLength={2}
                     onChange={this.handleOnChange.bind(this, "seconds")} value={this.state.displayedSeconds}></input>
              <Icon style={hoursIconStyle} icon="arrow_down" handleClick={this.decreaseHMS.bind(this, "seconds")}/>
            </div>
          </div>
          <div className="calendar-timezone">
            <div className="calendar-change-timezone">
              <Icon style={hoursIconStyle} icon="arrow_up" handleClick={this.increaseHMS.bind(this, "timezone")}/>
              <input ref="timezone" className="calendar-input" type="text" maxLength={3}
                     onChange={this.handleOnChange.bind(this, "timezone")} value={this.state.displayedTimezone}>
                GMT</input>
              <Icon style={hoursIconStyle} icon="arrow_down" handleClick={this.decreaseHMS.bind(this, "timezone")}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

});