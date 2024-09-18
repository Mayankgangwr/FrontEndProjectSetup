import { Input } from "@fluentui/react-components";
import Styles from "../Table.module.scss";
import { DismissRegular } from "@fluentui/react-icons";
import { ITableItemSearchProps } from "../Interface";
import { FC, useState, useEffect, useRef } from "react";

const TableItemSearch: FC<ITableItemSearchProps> = ({ tableRows, searchBy, handleItemSearch }) => {
    const [searchVal, setSearchVal] = useState<string>("");
    const debounceTimeout = useRef<any>(null);

    useEffect(() => {
        // Clear the timeout if searchVal changes (debouncing effect)
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout
        debounceTimeout.current = setTimeout(() => {
            handleItemSearch(searchVal);
        }, 300); // Adjust the delay as necessary (300ms in this example)

        // Cleanup function to clear the timeout if the component unmounts or if searchVal changes again before the delay
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchVal, handleItemSearch]);

    return (
        <div className={Styles.TableOuterBox}>
            <span className={Styles.TableItemCount}>{`${tableRows ? tableRows.length : 0} Items`}</span>
            {searchBy ? (
                <Input
                    defaultValue={searchVal}
                    value={searchVal}
                    className={Styles.TableSearchField}
                    placeholder="Search by title or description"
                    onChange={(_ev, data) => setSearchVal(data.value)}
                    contentAfter={searchVal !== "" ? (
                        <DismissRegular onClick={() => {
                            setSearchVal("")
                        }} />
                    ) : null}

                />
            ) : (
                <></>
            )}
        </div>
    )
}

export default TableItemSearch;
