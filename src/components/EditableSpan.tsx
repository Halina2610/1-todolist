import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string;
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
        setTitle(props.title);
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
                   color={"info"}/>
    ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};