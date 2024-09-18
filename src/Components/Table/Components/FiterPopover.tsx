
import {
  Button,
  Dropdown,
  Input,
  Option,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import { FilterRegular } from "@fluentui/react-icons";
import { FilterOperationsEnum, IFilterOperations, IFilterPopoverProps, ITableHeaderOptions } from "../Interface";
import { FC, useEffect, useState } from "react";
import { FilterOperations } from "../Utils";
import Styles from "../Table.module.scss";
import DatePopverContent from "./DatePopverContent";

const FiterPopoverContent: FC<IFilterPopoverProps> = ({
  column,
  handleFilter,
  options = undefined,
  dataType = 'string',
  handleClearFilter,
  appliedFilter
}) => {
  const [filterValue, setFilterValue] = useState<{ value: string | undefined; text: string | undefined } | undefined>(undefined);
  const [operation, setOperation] = useState<{ value: FilterOperationsEnum; text: string | undefined }>({
    value: FilterOperationsEnum.EQUAL_TO,
    text: 'Equal To'
  });
  const [columnName, setColumnName] = useState<string>(column);

  useEffect(() => {
    if (options) {
      setOperation({ value: FilterOperationsEnum.EQUAL_TO, text: 'Equal To' });
    }
    setColumnName(column);
    if (appliedFilter) {
      const selectedOperation = FilterOperations.find(op => op.value === appliedFilter.operation);
      if (selectedOperation) {
        setOperation({ value: selectedOperation.value, text: selectedOperation.text });
      }
      setFilterValue({ value: appliedFilter.value, text: appliedFilter.value });
    }
  }, [column, options, appliedFilter]);

  const handleOperationSelect = (_event: any, data: any) => {
    const selectedOperation = FilterOperations.find(op => op.text === data.optionText);
    if (selectedOperation) {
      setOperation({ value: selectedOperation.value, text: selectedOperation.text });
    }
  };

  const handleValueChange = (_event: any, data: any) => {
    setFilterValue({ value: data.value, text: undefined });
  };

  return (
    <div key={"Content" + columnName} className={Styles.FiterPopoverContent}>

      {options ?
        (
          <div className={Styles.FieldBox}>
            <Dropdown
              key={"Dropdown" + columnName}
              className={Styles.Dropdown}
              value={filterValue?.value}
              onOptionSelect={(_event, data) => setFilterValue({ value: data.optionValue, text: data.optionText })}
              placeholder="Select Value"
            >
              {options.map(({ value, text }: ITableHeaderOptions, index: number) => (
                <Option
                  className={Styles.DropdownOption}
                  key={`${value}+${index}`}
                  value={String(value)}
                  text={String(text)}
                  children={text}
                />
              ))}
            </Dropdown>
          </div>
        ) : (
          <div className={Styles.FieldBox}>
            <Dropdown
              className={Styles.Dropdown}
              key={"Dropdown" + column}
              value={operation.text}
              onOptionSelect={handleOperationSelect}
              placeholder="Select Operation"
            >
              {(dataType === "string" ? FilterOperations.slice(0, 4) : FilterOperations.slice(3)).map(({ value, text }: IFilterOperations, index: number) => (
                <Option
                  className={Styles.DropdownOption}
                  key={`${value}+${index}`}
                  value={value}
                  text={text}
                  children={text}
                />
              ))}
            </Dropdown>

            <Input
              className={Styles.Input}
              value={filterValue?.value || ""}
              onChange={handleValueChange}
              placeholder="Enter value"
            />
          </div>
        )}
      <div className={Styles.ActionBtnBox}>
        <Button
          appearance="secondary"
          className={Styles.Clear}
          children="Clear"
          onClick={() => {
            handleClearFilter(column);
            setFilterValue(undefined);
            setOperation({
              value: FilterOperationsEnum.EQUAL_TO,
              text: 'Equal To'
            })
          }
          }
        />
        <Button
          appearance="primary"
          className={Styles.Apply}
          children="Ok"
          disabled={!filterValue?.value || !operation.value}
          onClick={() => {
            if (operation.value && filterValue?.value) {
              handleFilter(column, String(filterValue.value), operation.value, dataType);
            }
          }}
        />
      </div>
    </div>
  );
};

const FiterPopover: FC<IFilterPopoverProps> = ({
  column,
  handleFilter,
  options = undefined,
  dataType = "string",
  handleClearFilter,
  appliedFilter
}) => (
  <Popover key={column}>
    <PopoverTrigger disableButtonEnhancement>
      {appliedFilter ?
        <div className={Styles.FiterPopoverBtn}>
          <FilterRegular fontSize={20} />
        </div>
        :
        <FilterRegular fontSize={20} />
      }
    </PopoverTrigger>
    <PopoverSurface className={Styles.PopoverSurface} tabIndex={-1}>
      {dataType === "date" ?
        (
          <DatePopverContent
            column={column}
            dataType={dataType}
            options={options}
            handleFilter={handleFilter}
            handleClearFilter={handleClearFilter}
            appliedFilter={appliedFilter}
          />
        ) : (
          <FiterPopoverContent
            column={column}
            dataType={dataType}
            options={options}
            handleFilter={handleFilter}
            handleClearFilter={handleClearFilter}
            appliedFilter={appliedFilter}
          />
        )
      }
    </PopoverSurface>
  </Popover>
);

export default FiterPopover;