import React, { memo } from "react";
import { TextField } from "@mui/material";
import useEditableSpan from "../../hooks/useEditableSpan";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
  entityStatus?: string;
};

export const EditableSpan = memo((props: EditableSpanPropsType) => {
  const { editMode, title, changeTitle, activateViewMode, activateEditMode } =
    useEditableSpan(props.value, props.onChange);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  return editMode ? (
    <TextField
      value={title}
      onChange={changeTitle}
      autoFocus={true}
      onBlur={activateViewMode}
      onKeyPress={handleKeyPress}
      id="standard-basic"
      size={"small"}
      color={"success"}
      disabled={props.entityStatus === "loading"}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
