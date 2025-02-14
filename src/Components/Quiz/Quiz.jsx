import React, { useRef, useState } from 'react'
import './Quiz.css' 
import { data } from '../../data';
const Quiz = () => {
    
   let[index,setIndex]=useState(0);
   let[question,setQuestion]=useState(data[index]);
   let[lock,setLock]=useState(false);
   let[score,setScore]=useState(0);
   let[result,setResult]=useState(false);
   
   let Option1 = useRef(null);
   let Option2 = useRef(null);
   let Option3 = useRef(null);
   let Option4 = useRef(null);
   let optionArray = [Option1,Option2,Option3,Option4];


   const checkAns = (e,ans) => {
    if(lock === false)
        {
            if(question.ans===ans)
                {
                   e.target.classList.add("correct");
                   setLock(true);
                   setScore(prev=>prev+1);
                }
              else{
                e.target.classList.add("wrong");
                setLock(true);
                // highlight the correct ans when select ans is wrong
                optionArray[question.ans-1].current.classList.add("correct");
              }
        }
   }
   
   const next = () => {
    if(lock===true)
        {
            if(index === data.length-1)
                {
                    setResult(true);
                    return 0;
                }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            optionArray.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
   }
   
   const restart = () => {
       setIndex(0);
       setQuestion(data[0]);
       setLock(false);
       setScore(0);
       setResult(false);
   }
   const finalres = () => {
      if(score > data.length/2)
      return true;
      else
      return false;
   }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result?<></>:<><h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index+1} of {data.length} Questions</div></>}
        
        {result?<><h2><b>Score is : </b> {score} out of {data.length} </h2>
        <h2><b>Result is : </b> {finalres() ? "Passed" : "Fail" }</h2>
        <button onClick={restart}>Restart</button>
        </>:<></>}
    </div>
  )
}

export default Quiz
