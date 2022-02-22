import React from "react";
import { Text, TextInput, Grid, Box, Button, Tag } from "grommet";


const COLORS = ['#787c7e', '#c9b458', "#6aaa64"];
const TL = ['-', 'O', 'X'];


export default function InitialGuess() {
  const [word, setWord] = React.useState("");
  const [bestWord, setBestWord] = React.useState("");
  const [sessionID, setSessionID] = React.useState("");

  const [boxState, setBoxState] = React.useState({
    box1: 0,
    box2: 0,
    box3: 0,
    box4: 0,
    box5: 0,
  });

  async function postRequest(url='', data='') {
    console.log("Posting:", data);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
      // mode: 'no-cors',
    })

    return res.json();
  }

  const fetchWordle = () => {
    if (word.length === 5) {
      const template = TL[boxState.box1] + TL[boxState.box2] + TL[boxState.box3] + TL[boxState.box4] + TL[boxState.box5]

      const data = JSON.stringify({
        id: "",
        sessionID: "",
        template: template,
        guess: word,
      });

      postRequest('http://localhost:8080/getword/', data)
        .then(result => {
          console.log(result);
          setSessionID(result.sessionID); 
          setBestWord(result['best_guesses'][0][0])
        })
        .catch((err) => console.log(err))
    } else {
      // TODO: Make this a state event
    }
  }

  return (
    <>
      <Text margin="xsmall">Alright, what word did you guess first?</Text>
      <TextInput
        placeholder="type here"
        size="small"
        value={word}
        onChange={(event) => {
          if (event.target.value.length <= 5) {
             setWord(event.target.value.trim())
          }
        }}
      />
      <br />
      <Grid
        margin='medium'
        alignSelf='end'
        rows={['xxsmall', 'xxsmall']}
        columns={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
        gap="xsmall"
        areas={[
          { name: 'box1', start: [0, 0], end: [1, 0] },
          { name: 'box2', start: [1, 0], end: [2, 0] },
          { name: 'box3', start: [2, 0], end: [3, 0] },
          { name: 'box4', start: [3, 0], end: [4, 0] },
          { name: 'box5', start: [4, 0], end: [4, 0] },
          { name: 'button', start: [0, 1], end: [4, 1]}
        ]}
      >
        <Box focusIndicator={false} gridArea="box1" background={COLORS[boxState.box1]} onClick={() => { boxState.box1 = (boxState.box1 + 1) % 3; setBoxState({...boxState})}}>
          <Text alignSelf='center' margin='xxxsmall' size='2xl'>{word.substring(0, 1)}</Text>
        </Box>
        <Box focusIndicator={false} gridArea="box2" background={COLORS[boxState.box2]} onClick={() => { boxState.box2 = (boxState.box2 + 1) % 3; setBoxState({...boxState})}}>
          <Text alignSelf='center' margin='xxxsmall' size='2xl'>{word.substring(1, 2)}</Text>
        </Box>
        <Box focusIndicator={false} gridArea="box3" background={COLORS[boxState.box3]} onClick={() => { boxState.box3 = (boxState.box3 + 1) % 3; setBoxState({...boxState})}}>
          <Text alignSelf='center' margin='xxxsmall' size='2xl'>{word.substring(2, 3)}</Text>
        </Box>
        <Box focusIndicator={false} gridArea="box4" background={COLORS[boxState.box4]} onClick={() => { boxState.box4 = (boxState.box4 + 1) % 3; setBoxState({...boxState})}}>
          <Text alignSelf='center' margin='xxxsmall' size='2xl'>{word.substring(3, 4)}</Text>
        </Box>
        <Box focusIndicator={false} gridArea="box5" background={COLORS[boxState.box5]} onClick={() => { boxState.box5 = (boxState.box5 + 1) % 3; setBoxState({...boxState})}}>
          <Text alignSelf='center' margin='xxxsmall' size='2xl'>{word.substring(4, 5)}</Text>
        </Box>
        <Box animation='pulse' gridArea='button'>
          <Button primary color='orange' label="Submit" alignSelf='center' onClick={fetchWordle}/>
        </Box>
      </Grid>
      {bestWord !== "" ? (
        <Box>
          <Tag
            alignSelf='center'
            name="Best next guess"
            value={bestWord}
          ></Tag>
        </Box>
        ) : (
          <div></div>
        )
      }
    </>
  );
}
