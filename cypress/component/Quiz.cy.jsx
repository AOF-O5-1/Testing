
import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../src/components/Quiz';
import * as questionApi from '../../src/services/questionApi';

// Use a subset of your pythonQuestions.json for testing.
const sampleQuestions = [
  {
    question: "What is the output of print(2 ** 3)?",
    answers: [
      { text: "6", isCorrect: false },
      { text: "8", isCorrect: true },
      { text: "9", isCorrect: false },
      { text: "12", isCorrect: false },
    ],
  },
  {
    question: "Which of the following is a mutable data type in Python?",
    answers: [
      { text: "str", isCorrect: false },
      { text: "tuple", isCorrect: false },
      { text: "list", isCorrect: true },
      { text: "int", isCorrect: false },
    ],
  },
  {
    question: "What is the keyword used to define a function in Python?",
    answers: [
      { text: "function", isCorrect: false },
      { text: "func", isCorrect: false },
      { text: "def", isCorrect: true },
      { text: "define", isCorrect: false },
    ],
  },
];

describe('Quiz Component', () => {
  beforeEach(() => {
    // Stub getQuestions to immediately return our sampleQuestions.
    cy.stub(questionApi, 'getQuestions').resolves(sampleQuestions);
  });

  it('displays the Start Quiz button initially', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').should('be.visible');
  });

  it('loads the first question after starting the quiz', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();

    // Expect the first question text to appear.
    cy.contains('What is the output of print(2 ** 3)?').should('be.visible');
  });

  it('handles answering questions and shows quiz completion', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();

    // First question: "What is the output of print(2 ** 3)?"
    // The correct answer is "8" which is at index 1 => button labeled "2".
    cy.contains('What is the output of print(2 ** 3)?').should('be.visible');
    cy.get('button.btn.btn-primary').contains('2').click();

    // Second question: "Which of the following is a mutable data type in Python?"
    // The correct answer "list" is at index 2 => button labeled "3".
    cy.contains('Which of the following is a mutable data type in Python?').should('be.visible');
    cy.get('button.btn.btn-primary').contains('3').click();

    // Third question: "What is the keyword used to define a function in Python?"
    // The correct answer "def" is at index 2 => button labeled "3".
    cy.contains('What is the keyword used to define a function in Python?').should('be.visible');
    cy.get('button.btn.btn-primary').contains('3').click();

    // After answering all questions, the quiz should be complete.
    cy.contains('Quiz Completed').should('be.visible');
    // The score should now be 3/3.
    cy.contains('Your score: 3/3').should('be.visible');
  });
});