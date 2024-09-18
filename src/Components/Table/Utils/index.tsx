import { ArrowBidirectionalUpDownRegular, ArrowDownRegular, ArrowUpRegular } from "@fluentui/react-icons";
import { FilterOperationsEnum, IAppliedFilter, IFilterOperations, ISort, ISortState, ITableItemSearchState, ITableRow } from "../Interface";
import moment from "moment";

// its handling sorting of all columns if sort method to be update 
export const handleSort = async (key: string, isSort: ISortState, tableRows: ITableRow[] | null): Promise<{
    isSort: ISortState;
    tableRows: ITableRow[] | null;
}> => {
    const newSortBy = (isSort.key === key && isSort.sortBy === ISort.ASC) ? ISort.DESC : ISort.ASC;
    const newIsSort = { key, sortBy: newSortBy };
    if (!tableRows) return { isSort: newIsSort, tableRows: tableRows };
    const sortedTableRows = handleSortTable(newIsSort, tableRows);
    return { isSort: newIsSort, tableRows: sortedTableRows };
};


//its handling sorting of all columns 
export const handleSortTable = ({ key, sortBy }: { key: string; sortBy: ISort }, tableRows: ITableRow[] | null): ITableRow[] => {
    if (!tableRows) return tableRows || [];

    const sortedTableRows = [...tableRows].sort((row1, row2) => {
        const value1 = row1[key]?.key || '';
        const value2 = row2[key]?.key || '';

        if (value1 < value2) return sortBy === ISort.ASC ? -1 : 1;
        if (value1 > value2) return sortBy === ISort.ASC ? 1 : -1;
        return 0;
    });

    return sortedTableRows;
};
export const handleFilter = (tableRows: ITableRow[], column: string, value: string, operation: FilterOperationsEnum, dataType: "string" | "number" | "date"): ITableRow[] => {
    let filteredRows: ITableRow[] = tableRows;
    if (dataType === 'string') {
        if (operation === FilterOperationsEnum.CONTAINS) {
            filteredRows = [...tableRows].filter(row => String(row[column].key).toLowerCase().includes(value.toLowerCase()));
        }
        if (operation === FilterOperationsEnum.STARTS_WITH) {
            filteredRows = [...tableRows].filter(row => String(row[column].key).toLowerCase().startsWith(value.toLowerCase()));
        }
        if (operation === FilterOperationsEnum.ENDS_WITH) {
            filteredRows = [...tableRows].filter(row => String(row[column].key).toLowerCase().endsWith(value.toLowerCase()));
        }
        if (operation === FilterOperationsEnum.EQUAL_TO) {
            filteredRows = [...tableRows].filter(row => String(row[column].key).toLowerCase() === value.toLowerCase());
        }
    }
    if (dataType === "number") {
        if (operation === FilterOperationsEnum.EQUAL_TO) {
            filteredRows = [...tableRows].filter(row => Number(row[column].key) === Number(value));
        }
        if (operation === FilterOperationsEnum.LESS_THAN) {
            filteredRows = [...tableRows].filter(row => Number(row[column].key) < Number(value));
        }
        if (operation === FilterOperationsEnum.GREATER_THAN) {
            filteredRows = [...tableRows].filter(row => Number(row[column].key) > Number(value));
        }
    }
    if (dataType === 'date') {
        const dates = JSON.parse(value);
        const firstSelectedDate = moment(dates[0]).unix();
        const secondSelectedDate = moment(dates[1]).unix();
        filteredRows = tableRows.filter(row => {
            const rowDate = Number(row[column].key);
            return rowDate >= firstSelectedDate && rowDate <= secondSelectedDate;
        });
    }
    return filteredRows;
};

export const handleClearFilter = (column: string, appliedFilter: Map<string, IAppliedFilter>, initialTableRows: ITableRow[]): { appliedFilter: any, filteredRows: ITableRow[] } => {
    let filteredRows = initialTableRows;
    const newMap = new Map(appliedFilter);
    newMap.delete(column);
    if (newMap.size > 0) {
        newMap.forEach(({ column, value, operation, dataType }: any) => {
            filteredRows = handleFilter(filteredRows, column, value, operation, dataType);
        });
    }
    return { appliedFilter: newMap, filteredRows: filteredRows };
};

// its providing only icon as per sorting method
export const getSortIcon = (key: string, isSort: ISortState) => {
    if (!isSort.key || isSort.key !== key) {
        return <ArrowBidirectionalUpDownRegular fontSize={20} />;
    }
    switch (isSort.sortBy) {
        case ISort.ASC:
            return <ArrowUpRegular fontSize={16} />;
        case ISort.DESC:
            return <ArrowDownRegular fontSize={16} />;
        default:
            return <ArrowBidirectionalUpDownRegular fontSize={20} />;
    }
};

// its providing only operation type
export const FilterOperations: IFilterOperations[] = [
    { value: FilterOperationsEnum.STARTS_WITH, text: 'Starts With' },
    { value: FilterOperationsEnum.ENDS_WITH, text: 'Ends With' },
    { value: FilterOperationsEnum.CONTAINS, text: 'Contains' },
    { value: FilterOperationsEnum.EQUAL_TO, text: 'Equal To' },
    { value: FilterOperationsEnum.LESS_THAN, text: 'Less Than' },
    { value: FilterOperationsEnum.GREATER_THAN, text: 'Greater Than' }
];

// its phandling  table item search function
export const handleItemSearch = (searchVal: string, tableRows: ITableRow[], searchItemBy: ITableItemSearchState[]) => {
    let newFilteredRows = tableRows;
    if (searchItemBy) {
        newFilteredRows = newFilteredRows.filter(row =>
            searchItemBy.some(searchCol => {
                if (searchCol.dataType === "number") {
                    const rowdata = Number(row[searchCol.key].key);
                    return rowdata === Number(searchVal)
                } else {
                    const searchLower = searchVal.toLowerCase();
                    const rowdata = String(row[searchCol.key].key).toLowerCase();
                    return rowdata.includes(searchLower);
                }
            })
        );
    }
    return newFilteredRows;

};

// to count number of page as per max rows in page
export const getNumberOfPage = (totalRows: number, maxRowsInPage: number): number => {
    let numberOfPages = 0;
    numberOfPages = Math.ceil(totalRows / maxRowsInPage);
    return numberOfPages;
}