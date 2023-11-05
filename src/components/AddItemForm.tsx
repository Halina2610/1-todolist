import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react";
import { Fab, TextField } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

type AddItemFormProps = {
    addItem: (title: string) => void;
};

export const AddItemForm = memo((props: AddItemFormProps) => {
    let [taskTitle, setTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            props.addItem(taskTitle.trim());
            setTaskTitle("");
        } else {
            setError("Title is required");
        }
    };

    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setTaskTitle(e.currentTarget.value);
        },
        []
    );

    const onKeyPressHandler = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null);
            }
            if (e.charCode === 13) {
                addTaskHandler();
            }
        },
        []
    );

    console.log("AddItemForm");
    return (
        <div>
            <TextField
                value={taskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                id="standard-basic"
                label="Type value:"
                variant="standard"
                size={"medium"}
            />

            <Fab onClick={addTaskHandler} size="small" color="info" aria-label="edit">
                <EditIcon />
            </Fab>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
});