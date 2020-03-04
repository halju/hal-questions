import React from 'react';
import './App.css';
import QuizQuestion from './components/QuizQuestion';
import questions from './questions.json';

const TITLE_STATE = 0
const QUESTION_STATE = 1
const TIME_LIMIT = 5
const FINAL_STATE = 2

class TitlePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      titleText: "Welcome to the Rat Quiz!",
      counter: 0,
      currentState: TITLE_STATE,
      currentQuestion: 0
    }
    this.timeLimit = TIME_LIMIT
  }
  nextQuestion(correct) {
    console.log("BUTTON PRESSED")
    if(correct) {
      this.setState({score: this.state.score+1})
    }
    if(this.state.currentQuestion === questions.length - 1) {
      console.log("DONE")
    } else {
      clearInterval(this.timer)
      console.log(this.state.currentQuestion)
      this.setState({
        titleText:"You answered x",
        currentState: QUESTION_STATE,
        currentQuestion: this.state.currentQuestion + 1
      })
    }
  }
  countdown() {
      console.log("INTERVAL CALLED")
      console.log(this.state.counter)
      if(this.state.counter < this.timeLimit) {
        this.setState({titleText:'Starting the quiz',
        counter: this.state.counter + 1
        })
      } else {
        this.setState({titleText:"Beginning quiz!",
        currentState: QUESTION_STATE,
        counter: 0
        })
        if(this.state.currentState === TITLE_STATE) {
          this.timer = setInterval(() => this.countdown(), 1000)
          clearInterval(this.timer)
        } else {
          this.setState({titleText:"You answered!"})
        }
    }
  }
  start() {
    console.log("Starting!")
    this.setState({titleText: "Starting the quiz!", counter:0})
    this.timer = setInterval(() => this.countdown(), 1000)
  }
  render() {
    return (
      <>
      <div className='App'>
        <p>{this.timeLimit - this.state.counter}</p>
        {((this.state.currentState === TITLE_STATE) ?
        <>
        <h2>{this.state.titleText}</h2>
        <input id="startButton" type="button" value="start" onClick={()=>this.start()}
        />
        </>
        :
        <QuizQuestion answers={questions[0].possibleAnswers} question=
        {questions[0].question} nextQuestion={(correct) => this.nextQuestion()}
        ></QuizQuestion>)}
        <p>Score: {this.state.score}</p>
      </div>
      </>)
  }
}
function App() {
  return (
    <div className="App">
      <TitlePage />
    </div>
  );
}

export default App;
