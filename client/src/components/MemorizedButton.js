import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const MemorizedButton = (props) => {
  const { checked, onChange } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          name="memorized"
          checked={checked}
          onChange={onChange}
        />
      }
      label="Memorized"
    />
  );
};

export default MemorizedButton;
