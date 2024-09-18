import React from "react";
import { TabList, Tab } from "@fluentui/react-components";
import Styles from "./TabLists.module.scss";

interface ITabList {
    value: string;
    title: string;
}
interface TabListsProps {
    tabList: ITabList[];
    defaultSelectedValue: ITabList;
    orderStatusCards: any[];
    setOrderStatus: (status: string) => void;
}

const TabLists: React.FC<TabListsProps> = ({ tabList, defaultSelectedValue, orderStatusCards, setOrderStatus }) => {
    return (
        <div className={Styles.TabListContainer}>
            <TabList className="pt-3 pb-2" defaultSelectedValue={defaultSelectedValue.value} onTabSelect={(_event: any, data: any) => {
                const value = data.value !== "total" ? data.value : "";
                setOrderStatus(value);
            }}>
                {tabList.map((tab: ITabList, index) => {
                    const count = tab.value !== "total"
                        ? orderStatusCards.filter(el => el.status === tab.value).length
                        : orderStatusCards.length;
                    return (
                        <Tab
                            key={index}
                            className={Styles.Tabs}
                            value={tab.value}
                            children={`${tab.title}(${count})`}
                        />
                    )
                })}
            </TabList>
        </div>
    );
};

export default TabLists;
