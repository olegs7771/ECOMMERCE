import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

export default function OrderCalendar({ showCalendar, date_time }) {
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueTime, onChangeTime] = useState(new Date());
  const [showDateDelivery, setShowDateDelivery] = useState(false);

  const _pickDate = (e) => {
    setShowDateDelivery(true);
    console.log('pickdate e', e);
    date_time(valueDate);
  };

  //HIDE CALENDAR AND DELIVERY DATE
  useEffect(() => {
    if (!showCalendar) {
      setShowDateDelivery(false);
    }
  }, [showCalendar]);

  return (
    <div
      className={
        showCalendar
          ? 'order__buyer__address__date order__buyer__address__date--visible mb-sm'
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
          <div className="order__buyer__address__date__delivery__date">
            {valueDate && (
              <span className="order__buyer__address__date__delivery__date--date">
                {valueDate.toDateString()}
              </span>
            )}
          </div>
          <div className="order__buyer__address__date__delivery__time">
            <TimePicker
              onChange={onChangeTime}
              value={valueTime}
              disableClock={true}
              clearIcon={null}
              className="order__buyer__address__date__delivery__time--time"
              clockClassName="order__buyer__address__date__delivery__time--elements"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
