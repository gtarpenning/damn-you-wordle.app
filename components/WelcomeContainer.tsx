import React, { useState } from "react";
import { Box, Button, Heading, Text } from "grommet";
import InitialGuess from "../components/InitialGuess";

export default function WelcomeContainer() {
  const [isClicked, setClicked] = useState(false);
  return (
    <Box
      round
      align="center"
      border={{
        side: "all",
        size: "medium",
        color: "#6aaa64",
        style: "solid",
      }}
      pad="medium"
    >
      {!isClicked ? (
        <>
          <Heading alignSelf="center" margin="medium" >
            The Wordle Helper
          </Heading>
          <Box animation='pulse'>
            <Button
              label=">"
              size="small"
              color="dark-2"
              hoverIndicator
              onClick={() => {
                setClicked(true);
              }}
              tip={{
                plain: true,
                dropProps: {
                  overflow: { horizontal: "auto" },
                },
                content: (
                  <Text size="xsmall" weight="bold" margin="xsmall">
                    this is cheating you know...
                  </Text>
                ),
              }}
            ></Button>
          </Box>
        </>
      ) : (
        <div>
          <InitialGuess></InitialGuess>
        </div>
      )}
    </Box>
  );
}
