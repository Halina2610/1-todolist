import React, { memo } from "react";
import { Fab, TextField } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import useAddItemForm from "../../hooks/useAddItemForm";
import { RequestStatusType } from "state/reducers/appSlice";

type AddItemFormProps = {
  addItem: (title: string) => void;
  entityStatus?: RequestStatusType;
};

export const AddItemForm = memo((props: AddItemFormProps) => {
  const { title, error, addItem, onChangeHandler, onKeyPressHandler } =
    useAddItemForm(props.addItem);
  return (
    <div style={{margin: '10px'}}>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        id="standard-basic"
        label="Type value:"
        variant="standard"
        size={"medium"}
        disabled={props.entityStatus === "loading"}
      />

      <Fab
        onClick={addItem}
        size="small"
        color="info"
        aria-label="edit"
        disabled={props.entityStatus === "loading"}
      >
        <EditIcon aria-disabled={props.entityStatus === "loading"} />
      </Fab>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
});
