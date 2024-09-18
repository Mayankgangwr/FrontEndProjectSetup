import {
    Button,
} from "@fluentui/react-components";
import { Calendar } from "@fluentui/react-calendar-compat";
import { FilterOperationsEnum, IFilterPopoverProps } from "../Interface";
import { FC, useEffect, useState } from "react";
import Styles from "../Table.module.scss";

const DatePopverContent: FC<IFilterPopoverProps> = ({
    column,
    appliedFilter,
    handleFilter,
    dataType = 'string',
    handleClearFilter
}) => {
    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | null>(null);
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        if (appliedFilter && appliedFilter.value) {
            try {
                const dates = JSON.parse(appliedFilter.value);
                const firstDate = new Date(dates[0]);
                const secondDate = dates[1] ? new Date(dates[1]) : null;
                setFirstSelectedDate(firstDate);
                setSecondSelectedDate(secondDate);
            } catch (error) {
                console.error('Error parsing dates:', error);
            }
        }
    }, [appliedFilter]);

    const handleFirstCalendarSelect = (date: Date) => {
        setFirstSelectedDate(date);
        // Ensure the second selected date is reset if it's before the new first selected date
        if (secondSelectedDate && date >= secondSelectedDate) {
            setSecondSelectedDate(null);
        }
    };

    const handleSecondCalendarSelect = (date: Date) => {
        setSecondSelectedDate(date);
    };

    const getNextDate = (date: Date): Date => {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate;
    };

    const getPrevDate = (date: Date): Date => {
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 1);
        return prevDate;
    };

    return (
        <div key={"Content" + column} className={Styles.FiterPopoverContent}>
            <div className={Styles.DateRange}>
                <Calendar
                    showGoToToday={false}
                    isMonthPickerVisible={false}
                    value={firstSelectedDate ? new Date(firstSelectedDate) : undefined}
                    maxDate={secondSelectedDate ? getPrevDate(secondSelectedDate) : undefined}
                    onSelectDate={(date: Date, _selectedDateRangeArray?: Date[]) => {
                        handleFirstCalendarSelect(date);
                        console.log('First calendar date selected:', date);
                    }}
                />
                <Calendar
                    showGoToToday={false}
                    isMonthPickerVisible={false}
                    minDate={firstSelectedDate ? getNextDate(firstSelectedDate) : new Date()}
                    value={secondSelectedDate ? secondSelectedDate : undefined}
                    onSelectDate={(date: Date, _selectedDateRangeArray?: Date[]) => {
                        handleSecondCalendarSelect(date);
                        console.log('Second calendar date selected:', date);
                    }}
                />
            </div>
            <div className={Styles.ActionBtnBox}>
                <Button
                    appearance="secondary"
                    className={Styles.Clear}
                    onClick={() => handleClearFilter(column)}
                >
                    Clear
                </Button>
                <Button
                    appearance="primary"
                    className={Styles.Apply}
                    disabled={firstSelectedDate === null}
                    onClick={() => {
                        if (secondSelectedDate === null) {
                            handleFilter(column, JSON.stringify([firstSelectedDate, firstSelectedDate]), FilterOperationsEnum.EQUAL_TO, dataType);
                        } else {
                            handleFilter(column, JSON.stringify([firstSelectedDate, secondSelectedDate]), FilterOperationsEnum.EQUAL_TO, dataType);
                        }
                    }}
                >
                    Ok
                </Button>
            </div>
        </div>
    );
};

export default DatePopverContent;