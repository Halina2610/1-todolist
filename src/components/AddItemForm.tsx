import React, {memo} from "react";
import { Fab, TextField } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import useAddItemForm from "../hooks/useAddItemForm";

type AddItemFormProps = {
    addItem: (title: string) => void;
};

export const AddItemForm = memo((props: AddItemFormProps) => {
    const {
        title,
        error,
        addItem,
        onChangeHandler,
        onKeyPressHandler
    } = useAddItemForm(props.addItem)
    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                id="standard-basic"
                label="Type value:"
                variant="standard"
                size={"medium"}
            />

            <Fab onClick={addItem} size="small" color="info" aria-label="edit">
                <EditIcon />
            </Fab>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
});