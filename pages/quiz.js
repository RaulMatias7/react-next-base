/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../src/components/Button';
import db from '../db.json';
// eslint-disable-next-line import/no-named-as-default
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        |Desafio do Loading|
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  questions, totalQuestions, questionsIndex, onSubmit,
}) {
  const questionId = `questions__${questionsIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionsIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={questions.image}
      />
      <Widget.Content>
        <h2>
          {questions.title}
        </h2>
        <p>
          {questions.description}
        </p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
          }}
        >
          {questions.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>

            );
          })}

          {/*
        <pre>
          {JSON.stringify(questions, null, 4)}
        </pre>
      */}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionsIndex = currentQuestion;
  const totalQuestions = db.questions.length;
  const questions = db.questions[questionsIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenState.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionsIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionsIndex + 1);
    } else {
      setScreenState(screenState.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        { screenState === screenStates.QUIZ
        && (
        <QuestionWidget
          questions={questions}
          questionsIndex={questionsIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X quesões, Parabéns!</div>}

      </QuizContainer>
    </QuizBackground>
  );
}
