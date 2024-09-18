import Styles from "../Table.module.scss";
import { ArrowLeftRegular, ArrowRightRegular } from "@fluentui/react-icons";
import { FC, useEffect, useState } from "react";
import { IPaginationProps } from "../Interface";
import { Dropdown, Option } from "@fluentui/react-components";

const Pagination: FC<IPaginationProps> = ({ pagination, handleNumberOfRows, handlePagination }) => {
    const [pageList, setPageList] = useState<number[]>([]);
    useEffect(() => {
        const pages = Array.from({ length: pagination.total }, (_, index) => index + 1);
        setPageList(() => pages);
    }, [pagination]);
    return (
        <div className={Styles.PaginationContainer}>
            <span
                className={Styles.Button}
                onClick={() => pagination.currPage > 1 && handlePagination(pagination.currPage - 1)}
            >
                <ArrowLeftRegular />
            </span>
            {pageList.map((page) =>
                <span
                    className={`${Styles.Button} ${pagination.currPage === page && Styles.CurrentPage}`}
                    onClick={() => handlePagination(page)}
                >
                    {page}
                </span>)
            }
            <span className={Styles.Button}
                onClick={() => pagination.total > pagination.currPage && handlePagination(pagination.currPage + 1)}
            >
                <ArrowRightRegular />
            </span>
            <Dropdown
                className={Styles.Dropdown}
                value={`${pagination.rowsPerPage} Rows`}
                onOptionSelect={(_event, data) => handleNumberOfRows(Number(data.optionValue))}
                placeholder="Select Value"
            >
                {pagination.paginationOptions.map((rows: number, index: number) => (
                    <Option
                        className={Styles.DropdownOption}
                        key={`${rows}+${index}`}
                        value={String(rows)}
                        text={String(rows)}
                        children={rows}
                    />
                ))}
            </Dropdown>
        </div>
    )
}

export default Pagination;
