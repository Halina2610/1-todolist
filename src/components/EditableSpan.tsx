import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string;
    onChange: (newValue: string) => void;
};

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    return editMode ? (
        <TextField value={title}
                   autoFocus={true}
                   onChange={onChangeTitleHandler}
                   onBlur={activateViewMode}
                   id="standard-basic"
                   size={"small"}
                   color={"success"}/>
    ) : (
        <span onDoubleClick={activateEditMode} style={{fontWeight: 600, color: '#1976d2', marginLeft: '20px'}}>{props.value}</span>
    );
};