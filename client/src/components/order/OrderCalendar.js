import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

export default function OrderCalendar({
  showCalendar,
  setDate,
  setTime,
  showDate,
  hideCalendar,
}) {
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueTime, onChangeTime] = useState(new Date());
  const [showDateDelivery, setShowDateDelivery] = useState(false);
  const [confimedTime, setConfirmedTime] = useState(false);
  const [timeSet, setTimeSet] = useState(false);

  const _pickDate = (e) => {
    setShowDateDelivery(true);
    showDate(true);
    console.log('pickdate e', e);
    setDate(valueDate);
  };
  const _onChangeTime = (e) => {
    onChangeTime(e);
    console.log('picktime', e);
    setTimeSet(true);
  };

  //HIDE CALENDAR AND DELIVERY DATE
  useEffect(() => {
    if (!showCalendar) {
      setShowDateDelivery(false);
      // showDate(false);
    }
  }, [showCalendar, showDate]);

  //CONFIRM TIME Of Delivery
  const _confirmTime = () => {
    setConfirmedTime(!confimedTime);
    setTime(valueTime);
    setShowDateDelivery(false);
    hideCalendar(false);
  };

  return (
    <div
      className={
        showCalendar
          ? 'order__buyer__address__date order__buyer__address__date--visible '
          : 'order__buyer__address__date  mb-sm'
      }
    >
      <div className="order__buyer__address__date__title">
        <span className="order__buyer__address__date__title--title">
          Pick Date and Time of Delivery
        </span>
      </div>
      <Calendar
        onChange={onChangeDate}
        onClickDay={_pickDate}
        value={valueDate}
        // activeStartDate={new Date()}
        minDate={new Date()}
        tileClassName="order__buyer__address__date__calendar-tile"
      />
      <div
        className={
          showDateDelivery
            ? 'order__buyer__address__date__delivery order__buyer__address__date__delivery--visible'
            : 'order__buyer__address__date__delivery'
        }
      >
        <div className="order__buyer__address__date__delivery__wrapper">
          <div className="order__buyer__address__date__delivery__time">
            <TimePicker
              amPmAriaLabel={'Select AM/PM'}
              onChange={_onChangeTime}
              value={valueTime}
              disableClock={true}
              clearIcon={null}
              className="order__buyer__address__date__delivery__time--time"
              clockClassName="order__buyer__address__date__delivery__time--elements"
            />
          </div>

          <button className="btn" onClick={_confirmTime} disabled={!timeSet}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
