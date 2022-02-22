import React from "react";
import { Text, TextInput, Grid, Box, Button, Tag, List } from "grommet";


const COLORS = ['#787c7e', '#c9b458', "#6aaa64"];
const TL = ['-', 'O', 'X'];


export default function InitialGuess() {
  const [word, setWord] = React.useState("");
  const [word2, setWord2] = React.useState("");
  const [word3, setWord3] = React.useState("");
  const [bs, setBoxState] = React.useState(Array(15).fill(0));

  const [turnCounter, setTurnCounter] = React.useState(0);
  const [bestWord, setBestWord] = React.useState("");
  const [answersLeft, setAnswersLeft] = React.useState([]);
  const [allowedLeft, setAllowedLeft] = React.useState([]);

  async function postRequest(url='', data='') {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: data,
    })
    return res.json();
  }

  function TextInputBox() {
    if (turnCounter == 0) return (
        <>
          <Text margin="xsmall">Alright, what word did you guess first?</Text>
          <TextInput placeholder="type here" size="small" value={word} autoFocus
            onChange={(event) => {
              if (event.target.value.length <= 5) {
                setWord(event.target.value.trim())
              }
            }}
          />
        </>
      )
    else if (turnCounter == 1) return (
        <>
          <Text margin="xsmall">Cool, and your second guess? </Text>
          <TextInput autoFocus placeholder="type here" size="small" value={word2}
            onChange={(event) => {
              if (event.target.value.length <= 5) {
                setWord2(event.target.value.trim())
              }
            }}
          />
        </>
      )
    else return (
        <>
          <Text margin="xsmall">Awesome, need another guess? </Text>
          <TextInput autoFocus placeholder="type here" size="small" value={word3}
            onChange={(event) => {
              if (event.target.value.length <= 5) {
                setWord3(event.target.value.trim())
              }
            }}
          />
        </>
      )
  }

  const fetchWordle = () => {
    var curWord:string = "";
    var template:string = "";

    switch (turnCounter) {
      case 0: curWord = word; template=TL[bs[0]] + TL[bs[1]] + TL[bs[2]] + TL[bs[3]] + TL[bs[4]]; break;
      case 1: curWord = word2; template=TL[bs[5]] + TL[bs[6]] + TL[bs[7]] + TL[bs[8]] + TL[bs[9]]; break;
      case 2: curWord = word3; template=TL[bs[10]] + TL[bs[11]] + TL[bs[12]] + TL[bs[13]] + TL[bs[14]]; break;
    }

    console.log(turnCounter, curWord, curWord.length);
    if (curWord.length === 5) {
      const data = JSON.stringify({
        template: template,
        guess: word,
        answers_left: answersLeft,
        allowed_left: allowedLeft,
      });
      // 'https://damn-you-wordle-uykoh7fkza-uw.a.run.app/getword/'
      postRequest('http://localhost:8080/getword/', data)
        .then(result => {
          console.log(result);
          setAnswersLeft(result.answers_left); 
          setAllowedLeft(result.allowed_left);
          setBestWord(result.best_guess);
        })
        .catch((err) => console.log(err))
      
      setTurnCounter(turnCounter + 1);
    } else { 
      // TODO: Make this a state event 
    }
  }

  const areaList = Object.values(bs).map((box, i) => (
    { name: 'box'+i, start: [i%5, Math.floor(i/5)], end: [i%5, Math.floor(i/5)] }
  ))

  return (
    <Box width='medium' height='medium'>
      <TextInputBox />
      <Grid
        margin='medium' gap="xsmall" alignSelf='center'
        rows={['xxsmall', 'xxsmall', 'xxsmall']}
        columns={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
        areas={areaList}
      >
        {Object.values(bs).map((box, i) => {
          if (i < 5) var displayLetter:string = word.substring(i, i+1);
          else if (i < 10) var displayLetter:string = word2.substring(i%5, i%5+1);
          else var displayLetter:string = word3.substring(i%5, i%5+1);

          return (
            <Box key={"box" + i} focusIndicator={false} gridArea={"box" + i} 
                 background={COLORS[box]} onClick={() => { bs[i] = (box + 1) % 3; setBoxState({...bs})}}>
              <Text alignSelf='center' margin='xxxsmall' size='2xl'>{displayLetter}</Text>
            </Box>
          )
          })
        }
      </Grid>
      <Box animation='pulse' gridArea='button'>
        <Button primary color='orange' label="Submit" alignSelf='center' onClick={fetchWordle}/>
      </Box>
      {bestWord !== "" 
        ? <Box><Tag alignSelf='center' name="Best next guess" value={bestWord} /></Box>
        : <Box />
      }
    </Box>
  );
}
