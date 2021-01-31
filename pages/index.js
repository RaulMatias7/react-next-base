import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
// eslint-disable-next-line import/no-named-as-default
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>React & Next js - Projecto Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Guardiões da Galáxia</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(infoDoEvento) => {
              infoDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Submetendo');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infoDoEvento) => { setName(infoDoEvento.target.value); }}
                placeholder="Diz aí seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
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
