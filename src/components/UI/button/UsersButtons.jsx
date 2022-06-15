import React from 'react';
import styles from "../../Users/Users.module.css"

const UsersButtons = ({ selectedSort, currentPage, changeCurrentPages, buttons, ...props }) => {
    return (
        <>
            {selectedSort !== "choose" ? <div {...props}> {buttons.map((b, i) => {
                return <span key={i} className={currentPage === b ? styles.actived : ""}
                    onClick={(e) => { changeCurrentPages(b) }}>{b}</span>
            })}
            </div> : ""}
        </>
    )
}

export default UsersButtons;