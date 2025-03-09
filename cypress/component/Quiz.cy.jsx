import React from 'react';
import { mount } from 'cypress/react';
import Quiz from "../../client/src/components/Quiz";

// Sample questions for testing
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
    // Intercept all variations of question API endpoints
    cy.intercept('GET', '**/api/questions**', {
      statusCode: 200,
      body: sampleQuestions
    }).as('getQuestions');
    
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: sampleQuestions
    }).as('getQuestionsRandom');
    
    cy.intercept('POST', '**/api/questions**', {
      statusCode: 200,
      body: sampleQuestions
    }).as('postQuestions');
  });

  it('displays the Start Quiz button initially', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').should('be.visible');
  });

  it('loads the first question after starting the quiz', () => {
    // Mount the component
    mount(<Quiz />);
    
    // Print the initial DOM for debugging
    cy.log('Initial DOM structure:');
    cy.get('body').then(($body) => {
      cy.log($body.html());
    });
    
    // Click the start button
    cy.contains('Start Quiz').click();
    
    // Add a timeout to give the component time to update
    cy.wait(1000);
    
    // Print the DOM after clicking for debugging
    cy.log('DOM after clicking Start Quiz:');
    cy.get('body').then(($body) => {
      cy.log($body.html());
    });
    
    // Look for the first question text with a generous timeout
    cy.contains('What is the output of print(2 ** 3)?', { timeout: 10000 })
      .should('be.visible');
  });
});