import * as React from 'react'
// import styles from './styles.module.css'

interface Props {
  containerClass?: string,
  dropDownClass?: string,
  startDate?: Date
  endDate?: Date,
  required?: boolean,
  reverse?: boolean
}

export const DateComponent = ({ containerClass, dropDownClass, startDate, endDate, required = false, reverse = false}: Props) => {
    const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [selectedMonth, setSelectedMonth] = React.useState(0);
    const [selectedYear, setSelectedYear] = React.useState(1990);

    const renderYearOptions = () => {
        let startYear: number, endYear: number;
        if(!startDate) {
            startYear = new Date(new Date().getFullYear() - 90).getFullYear();
        }
        else {
            startYear = startDate.getFullYear();
        }
        if(!endDate) {
            endYear = new Date().getFullYear();
        }
        else {
            endYear = endDate.getFullYear();
        }

        let years = [];
        if (startYear <= endYear) {
            for (let i = startYear; i <= endYear; ++i) {
                years.push(i);
            }
        } else {
            for (let i = endYear; i >= startYear; --i) {
                years.push(i);
            }
        }
        if(reverse) {
            years = years.reverse();
        }
        return (
            <React.Fragment>
                {years.map((year, index) => (<option key={index} value={year}>{year}</option>))}
            </React.Fragment>
        )
    }
        
    const renderMonthOptions = () => {
        return (
            <React.Fragment>
                {months.map((month, index) => (<option key={index} value={month}>{month}</option>))}
            </React.Fragment>
        )
    }

    const renderDayOptions = () => {
        const numberOfDays: number = daysInMonth(selectedMonth, selectedYear || 1990);
        const days: Array<number> = [];
        for (let i = 1; i <= numberOfDays; i++) {
            days.push(i);
        }
        return (
            <React.Fragment>
                {days.map((day, index) => (<option key={index} value={day}>{day}</option>))}
            </React.Fragment>
        )
    }

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    }



    const changeYear = (event: any) => {
        console.log(event.target.value);
        setSelectedYear(event.target.value);
        renderDayOptions();
    }    

    const changeMonth = (event: any) => {
        console.log(event.target.value);
        setSelectedMonth(months.indexOf(event.target.value));
        renderDayOptions();
    }

    const changeDay = (event: any) => {
        console.log(event.target.value);
    }

    return (
    <div className={containerClass}>
        <select name='year' className={dropDownClass} required={required} onChange={(event) => changeYear(event)}>
           {renderYearOptions()}
        </select>
        <select name='month' className={dropDownClass} required={required} onChange={(event) => changeMonth(event)}>
           {renderMonthOptions()}
        </select>
        <select name='day' className={dropDownClass} required={required} onChange={(event) => changeDay(event)}>
           {renderDayOptions()}
        </select>
    </div>
    )
}
