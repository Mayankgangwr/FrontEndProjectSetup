export enum ISort {
    ASC,
    DESC,
    NONE
}

export enum FilterOperationsEnum {
    EQUAL_TO = "equalTo",
    STARTS_WITH = "startsWith",
    ENDS_WITH = "endsWith",
    CONTAINS = "contains",
    LESS_THAN = "lessThan",
    GREATER_THAN = "greaterThan"
}

export interface IFilterOperations {
    value: FilterOperationsEnum;
    text: string;
}

export interface ITableHeaderOptions {
    value: string | number;
    text: string;
}

export interface ITableHeader {
    key: string;
    title: string;
    dataType?: 'string' | 'number' | 'date';
    isSort?: boolean;
    isFilter?: boolean;
    options?: ITableHeaderOptions[];
    isSearch?: boolean;
}

export interface ITableRow {
    [key: string]: {
        key: string | number;
        value: string | number | JSX.Element | null;
    }
}

export interface ISortState {
    key: string | null;
    sortBy: ISort | null;
}

export interface ITableProps {
    tableHeader: any[];
    tableRows: any[];
    initialSort?: {
        key: string;
        sortBy: ISort;
    };
    rowsPerPage?: number[];
}

export interface IAppliedFilter {
    column: string;
    value: string;
    operation: FilterOperationsEnum;
    dataType: 'string' | 'number' | 'date';
}

export interface IFilterPopoverProps {
    column: string;
    options?: ITableHeaderOptions[];
    handleFilter: (column: string, value: string, operation: FilterOperationsEnum, dataType: 'string' | 'number' | 'date') => void;
    handleClearFilter: (column: string) => void;
    dataType?: 'string' | 'number' | 'date';
    appliedFilter?: IAppliedFilter;
}

export interface ITableItemSearchState {
    key: string;
    dataType: 'string' | 'number' | 'date';
}

export interface ITableItemSearchProps {
    tableRows: ITableRow[];
    searchBy?: ITableItemSearchState[];
    handleItemSearch: (searchVal: string) => void;
}

export interface IPagination {
    currPage: number;
    total: number;
    rowsPerPage: number;
    paginationOptions: number[];
}

export interface IPaginationProps {
    pagination: IPagination;
    handleNumberOfRows: (numberOfRows: number) => void;
    handlePagination: (pageNumber: number) => void;
}
