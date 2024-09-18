import React from 'react';

export enum JustifyContent {
    NORMAL = 'normal',
    END = 'end',
    START = 'start',
    CENTER = 'center',
    BETWEEN = 'between',
    AROUND = 'around',
    EVENLY = 'evenly',
    STRETCH = 'stretch',
}

export enum AlignItems {
    END = 'end',
    START = 'start',
    CENTER = 'center',
    BASELINE = 'baseline',
    STRETCH = 'stretch',
}

export enum FlexDirection {
    ROW = 'row',
    COLUMN = 'column',
}

export enum FlexWrap {
    WRAP = 'wrap',
    REVERSE = 'reverse',
    NOWRAP = 'nowrap',
}

interface FlexProps {
    direction?: FlexDirection;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
    flexWrap?: FlexWrap;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const justifyContentClasses: Record<JustifyContent, string> = {
    [JustifyContent.NORMAL]: 'justify-normal',
    [JustifyContent.END]: 'justify-end',
    [JustifyContent.START]: 'justify-start',
    [JustifyContent.CENTER]: 'justify-center',
    [JustifyContent.BETWEEN]: 'justify-between',
    [JustifyContent.AROUND]: 'justify-around',
    [JustifyContent.EVENLY]: 'justify-evenly',
    [JustifyContent.STRETCH]: 'justify-stretch',
};

const alignItemsClasses: Record<AlignItems, string> = {
    [AlignItems.END]: 'items-end',
    [AlignItems.START]: 'items-start',
    [AlignItems.CENTER]: 'items-center',
    [AlignItems.BASELINE]: 'items-baseline',
    [AlignItems.STRETCH]: 'items-stretch',
};

const flexDirectionClasses: Record<FlexDirection, string> = {
    [FlexDirection.ROW]: 'flex-row',
    [FlexDirection.COLUMN]: 'flex-col',
};

const flexWrapClasses: Record<FlexWrap, string> = {
    [FlexWrap.WRAP]: 'flex-wrap',
    [FlexWrap.REVERSE]: 'flex-wrap-reverse',
    [FlexWrap.NOWRAP]: 'flex-nowrap',
};

const Flex: React.FC<FlexProps> = ({
    direction = FlexDirection.ROW,
    justifyContent = JustifyContent.BETWEEN,
    alignItems = AlignItems.CENTER,
    flexWrap = FlexWrap.NOWRAP,
    className = '',
    onClick,
    children
}) => {
    const classNames = [
        'flex',
        flexDirectionClasses[direction],
        justifyContentClasses[justifyContent],
        alignItemsClasses[alignItems],
        flexWrapClasses[flexWrap],
        className
    ].join(' ');

    return (
        <div
            onClick={onClick}
            className={classNames}
        >
            {children}
        </div>
    );
};

export default Flex;
