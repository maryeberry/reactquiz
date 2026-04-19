// Quiz: How well do you know Cinnamoroll?
//
// Correct answers:
// Q1 - March 6 (index 1)
// Q2 - False (index 1)  — Cinnamoroll is a puppy, not a bunny
// Q3 - Blue (index 3)
// Q4 - Charming, Friendly, Shy (indices 0, 2, 5)
// Q5 - True (index 0)

const questions = [
  {
    prompt: "What is Cinnamoroll's birthday?",
    type: "multiple-choice",
    choices: ["November 1", "March 6", "October 31", "January 18", "April 16"],
    correct: 1,
  },
  {
    prompt: "Is Cinnamoroll a bunny?",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1,
  },
  {
    prompt: "What is Cinnamoroll's favorite color?",
    type: "multiple-choice",
    choices: ["Black", "Brown", "Red", "Blue", "Green", "Pink"],
    correct: 3,
  },
  {
    prompt: "What are Cinnamoroll's traits?",
    type: "multiple-answer",
    choices: ["Charming", "Cheeky", "Friendly", "Lazy", "Curious", "Shy"],
    correct: [0, 2, 5],
  },
  {
    prompt: "Is Cinnamoroll the best Sanrio character?",
    type: "true-false",
    choices: ["True", "False"],
    correct: 0,
  },
];

export default questions;
