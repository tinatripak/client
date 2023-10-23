import React, { useEffect, useState } from "react";
import { answerToQuestion, getQuestionById } from '../../../../services/QuestionService'

import { useParams } from "react-router-dom";
import classes from "./AnswerQuestion.module.scss";

const AnswerQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchQuestionData()
  }, [question]);

  const fetchQuestionData = () => {
    getQuestionById(id)
      .then((data) => {
        setQuestion(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    answerToQuestion(question?._id, question?.email, question?.question, answer)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Answer to the question</h2>
      <div>
        <div>
          <h4>To: {question?.email}</h4>
        </div>
        <div>
          <p>
            <u>{question?.name}'s message:</u>
          </p>
          <p>— {question?.question}</p>
        </div>
        {question?.answer && (
          <div>
            <p>
              <u>Answer:</u>
            </p>
            <p>— {question?.answer}</p>
          </div>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">The answer</label>
          <br />
          <textarea
            defaultValue={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={classes.answer__textarea}
          />
          <button type="submit" className={classes.answer__button}>SEND</button>
        </form>
      </div>
    </div>
  );
};

export default AnswerQuestion;
