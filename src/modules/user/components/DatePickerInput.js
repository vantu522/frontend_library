// DatePickerInput.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import './DatePickerInput.css';

const DatePickerInput = ({ selectedDate, onChangeDate, placeholder }) => {
  return (
    <div className="date-input">
      <DatePicker
        selected={selectedDate}
        onChange={onChangeDate}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
      />
      <FaCalendarAlt className="calendar-icon" />
    </div>
  );
};

export default DatePickerInput;
