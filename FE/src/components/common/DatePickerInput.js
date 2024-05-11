import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerInput(props) {
    const { title, value, setValue } = props;
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 2);
    maxDate.setHours(0, 0, 0, 0);
    return (
        <div className='flex flex-col'>
            <h2>{title}</h2>
            <DatePicker className='outline outline-offset-2 outline-1' selected={value} dateFormat="yyyy-MM-dd" maxDate={maxDate} onChange={date => setValue(date)} />
        </div>
    );
}

export default DatePickerInput;
