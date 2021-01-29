import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import {useRouter} from 'next/router';
// eslint-disable-next-line import/no-named-as-default
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

// CRIANDO MEUS COMPONENTES
export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>React & Next js - Projecto Base</title>
      </Head>
      <QuizContainer>

        <Widget>
          <Widget.Header>
            <h1>Guardiões da Galáxia</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (infoDoEvento) {
              infoDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Submetendo');
            }}
            >
           <input 
           onChange={function (infoDoEvento) {
             console.log(infoDoEvento.target.value);
            // name = infoDoEvento.target.value;
            setName(infoDoEvento.target.value);
           }}
           placeholder="Diz aí seu nome" />
            <button type="submit" disabled={name.length === 0}> 
              Jogar {name}
            </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Meus Quizes</h1>
            <p>Teste lari jsdbaids...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/RaulMatias7" />
    </QuizBackground>
  );
}
