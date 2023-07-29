import { useState } from 'react';
import classNames from 'classnames';
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import styles from './collapsible.module.scss';

function Collapsible({ label, collapsed = false, className, children }) {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const handleClick = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div className={classNames(className, styles.collapseContainer)}>
            <button type="button" onClick={handleClick}>
                <span>
                    {label}
                    {!isCollapsed && <MdOutlineKeyboardArrowUp />}
                    {isCollapsed && <MdOutlineKeyboardArrowDown />}
                </span>
            </button>
            {!isCollapsed && children}
        </div>
    );
}

export default Collapsible;
