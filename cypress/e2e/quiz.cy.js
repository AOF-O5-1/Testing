describe('Tech Quiz End-to-End Flow', () => {
  beforeEach(() => {
    // 1. Load the fixture data and alias it as "@questions"
    cy.fixture('questions.json').as('questions');

    // 2. Intercept the GET request to /api/questions/random and respond with our fixture
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' })
      .as('getQuestions');
  });

  it('allows a user to take the quiz and view the final score', () => {
    // 3. Visit the base URL
    cy.visit('/');

    // 4. Click the "Start Quiz" button
    cy.contains('Start Quiz').click();

    // 5. Wait until the intercept has finished fetching questions
    cy.wait('@getQuestions');

    // 6. Retrieve the fixture data from our alias
    cy.get('@questions').then((questions) => {
      // For each question in our fixture
      questions.forEach((questionObj, index) => {
        // (a) Confirm the current question text is visible:
        cy.contains(questionObj.question).should('be.visible');

        // (b) Find the correct answer from the fixture
        const correctAnswerIndex = questionObj.answers.findIndex(ans => ans.isCorrect);
        
        // (c) Click the button with the number that corresponds to the correct answer (1-based indexing)
        cy.contains('button', (correctAnswerIndex + 1).toString()).click();
      });

      // 7. After answering all questions, check final quiz completion text
      cy.contains('Quiz Completed').should('be.visible');

      // 8. Check final score message
      cy.contains('Your score:').should('be.visible');
    });
  });
  
  // A simpler test that only checks the first question
  it('tests just the first question', () => {
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    cy.get('@questions').then((questions) => {
      // Get the first question
      const firstQuestion = questions[0];
      
      // Verify question text is visible
      cy.contains(firstQuestion.question).should('be.visible');
      
      // Find the index of the correct answer (0-based)
      const correctAnswerIndex = firstQuestion.answers.findIndex(ans => ans.isCorrect);
      
      // Click the button with the corresponding number (1-based)
      const buttonNumber = correctAnswerIndex + 1;
      cy.contains('button', buttonNumber.toString()).click();
      
      // If you want to verify the next question appears or some feedback is shown
      // You could add assertions here
    });
  });
});