import { useEffect } from "react";
import { useState } from "react";


const ProfileStatusWithHook = (props) => {

    let [editMode, changeEditMode] = useState(false)
    let [status, changeStatus] = useState(props.status)

    useEffect(() => {
        changeStatus(props.status)
    }, [props.status])

    const activateMode = () => {
        changeEditMode(true)
    }
    const deactivateMode = () => {
        changeEditMode(false)
        props.updateStatus(status)
    }
    const onChangeInput = (e) => {
        changeStatus(e.target.value)
    }
    return <>
        {editMode ?
            <input autoFocus={true} onChange={onChangeInput} onBlur={deactivateMode} value={status} /> :
            props.authorizedUserId === props.userId ?
                <span onClick={activateMode} >{status || '----'}</span>
                : <span  >{status || '----'}</span>
        }
    </>
}

export default ProfileStatusWithHook;
