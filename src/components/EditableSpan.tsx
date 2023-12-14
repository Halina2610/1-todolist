import React, {memo} from 'react';
import {TextField} from "@mui/material";
import useEditableSpan from "../App/hooks/useEditableSpan";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {

    const {
        editMode,
        title,
        changeTitle,
        activateViewMode,
        activateEditMode
    } = useEditableSpan(props.value, props.onChange)

    return editMode
        ?    <TextField value={title}
                        onChange={changeTitle}
                        autoFocus={true}
                        onBlur={activateViewMode}
                        id="standard-basic"
                        size={"small"}
                        color={"success"}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
