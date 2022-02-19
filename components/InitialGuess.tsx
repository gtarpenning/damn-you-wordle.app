import React, { useState } from "react";
import { Text, TextInput } from "grommet";

export default function InitialGuess() {
  const [value, setValue] = React.useState("");
  return (
    <>
      <Text margin="xsmall">Alright, what word did you guess first?</Text>
      <TextInput
        placeholder="type here"
        size="small"
        value={value}
        onChange={(event) => setValue(event.target.value)} // TODO: Query the API for the word
      />
    </>
  );
}
