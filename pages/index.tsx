import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Button, Footer, Text, Grommet } from "grommet";
import WelcomeContainer from "../components/WelcomeContainer";

const theme = {
  global: {
    font: {
      family: "Helvetica Neue",
      size: "25px",
    },
  },
};

const Home: NextPage = () => {
  return (
    <Grommet theme={theme}>
      <Head>
        <title>Damn You Wordle</title>
        <link rel="icon" href="/wordle-icon.png" />
      </Head>
      <Box
        height={{ min: "100vh" }}
        background="light-1"
        justify="center"
        align="center"
        animation="fadeIn"
      >
        <WelcomeContainer></WelcomeContainer>
      </Box>
      <Footer background="light-3" justify="center" pad="small">
        <Text textAlign="center" size="small">
          © 2022 Copyright Stanford jk
        </Text>
      </Footer>
    </Grommet>
  );
};

export default Home;
