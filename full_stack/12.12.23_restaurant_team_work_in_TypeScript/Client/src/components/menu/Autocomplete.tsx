import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { dishInventory, IInventory } from "@/dataTypes/inventory";


type Props = {
  value: string | { id: number; name: string } | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  options: IInventory[];
  display: dishInventory[];
};

const AutocompleteDropDown: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  options,
  display,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      value={(display.find((item) => item.inventory_name === value) || {}).inventory_name || ""}
      onChange={(_, newValue) => {
        if (newValue && typeof newValue !== "string") {
          onChange({
            target: { value: newValue.name },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          style={{
            width: "120px",
          }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            style: {
              height: "30px",
              backgroundColor: "#e0e0e0",
              paddingTop: "0px",
            },
          }}
        />
      )}
      freeSolo
      disableClearable
      PaperComponent={({ children }) => (
        <Paper
          style={{
            maxHeight: "190px",
            overflowY: "auto",
            direction: "rtl",
          }}
        >
          {children}
        </Paper>
      )}
    />
  );
};

export default AutocompleteDropDown;
