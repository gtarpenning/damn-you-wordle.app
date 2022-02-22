import React from "react";
import { Text, TextInput, Grid, Box, Button, Tag, List } from "grommet";


const COLORS = ['#787c7e', '#c9b458', "#6aaa64"];
const TL = ['-', 'O', 'X'];


export default function InitialGuess() {
  const [word, setWord] = React.useState("");
  const [word2, setWord2] = React.useState("");
  const [word3, setWord4] = React.useState("");

  const [bestWord, setBestWord] = React.useState("");
  const [answersLeft, setAnswersLeft] = React.useState([]);
  const [allowedLeft, setAllowedLeft] = React.useState([]);

  const [boxState, setBoxState] = React.useState(Array(15).fill(0));

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
      const template = TL[boxState[0]] + TL[boxState[1]] + TL[boxState[2]] + TL[boxState[3]] + TL[boxState[4]];

      const data = JSON.stringify({
        template: template,
        guess: word,
        answers_left: answersLeft,
        allowed_left: allowedLeft,
      });

      postRequest('http://localhost:8080/getword/', data)
        .then(result => {
          console.log(result);
          setAnswersLeft(result.answers_left); 
          setAllowedLeft(result.allowed_left);
          setBestWord(result.best_guess);
        })
        .catch((err) => console.log(err))
    } else {
      // TODO: Make this a state event
    }
  }

  const areaList = [
    { name: 'box0', start: [0, 0], end: [1, 0] },
    { name: 'box1', start: [1, 0], end: [2, 0] },
    { name: 'box2', start: [2, 0], end: [3, 0] },
    { name: 'box3', start: [3, 0], end: [4, 0] },
    { name: 'box4', start: [4, 0], end: [4, 0] },
    { name: 'box5', start: [0, 1], end: [1, 1] },
    { name: 'box6', start: [1, 1], end: [2, 1] },
    { name: 'box7', start: [2, 1], end: [3, 1] },
    { name: 'box8', start: [3, 1], end: [4, 1] },
    { name: 'box9', start: [4, 1], end: [4, 1] },
    { name: 'box10', start: [0, 2], end: [1, 2] },
    { name: 'box11', start: [1, 2], end: [2, 2] },
    { name: 'box12', start: [2, 2], end: [3, 2] },
    { name: 'box13', start: [3, 2], end: [4, 2] },
    { name: 'box14', start: [4, 2], end: [4, 2] },
  ]

  return (
    <Box width='medium' height='medium'>
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
      <Grid
        margin='medium'
        alignSelf='center'
        rows={['xxsmall', 'xxsmall', 'xxsmall']}
        columns={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
        gap="xsmall"
        areas={areaList}
      >
        {Object.values(boxState).map((box, i) => {
          let displayWord:string = word.substring(i, i+1);

          if (5 < i && i < 10) {
            displayWord = word2.substring(i%5, i%5+1);
          } else {
            displayWord = word3.substring(i%5, i%5+1);
          }
          return (
            <Box key={"box" + i} focusIndicator={false} gridArea={"box" + i} background={COLORS[box]} onClick={() => { boxState[i] = (box + 1) % 3; setBoxState({...boxState})}}>
              <Text alignSelf='center' margin='xxxsmall' size='2xl'>{word.substring(i, i+1)}</Text>
            </Box>
          )
          })
        }
      </Grid>
      <Box animation='pulse' gridArea='button'>
        <Button primary color='orange' label="Submit" alignSelf='center' onClick={fetchWordle}/>
      </Box>
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
    </Box>
  );
}
