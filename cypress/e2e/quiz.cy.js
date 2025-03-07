describe('Tech Quiz End-to-End Flow', () => {
  beforeEach(() => {
    // 1. Load the fixture data and alias it as "@questions"
    cy.fixture('questions.json').as('questions');

    // 2. Intercept the GET request to /api/questions/random and respond with our fixture
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' })
      .as('getQuestions');
  });

  it('allows a user to take the quiz and view the final score', () => {
    // 3. Visit the base URL (adjust if needed, e.g., '/quiz' or '/')
    cy.visit('/');

    // 4. Click the "Start Quiz" button
    cy.contains('Start Quiz').click();

    // 5. Wait until the intercept has finished fetching questions
    cy.wait('@getQuestions');

    // 6. Retrieve the fixture data from our alias
    cy.get('@questions').then((questions) => {
      // For demonstration, we’ll assume the quiz shows all 10 (or more) questions 
      // in the same order as the fixture. We'll loop through them:

      questions.forEach((questionObj, index) => {
        // (a) Confirm the current question text is visible:
        cy.contains(questionObj.question).should('be.visible');

        // (b) Find the correct answer from the fixture
        const correctAnswer = questionObj.answers.find((ans) => ans.isCorrect);

        // (c) Click the button whose text matches the correct answer
        // Adjust your selector if needed; here we look for any button with that text
        cy.contains('button', correctAnswer.text).click();
      });

      // 7. After answering all questions, check final quiz completion text
      cy.contains('Quiz Completed').should('be.visible');

      // 8. Check final score message
      // If you answered all questions, your score might be "20/20" or "10/10" etc.
      // For example, if your quiz only selects 10 from the fixture, adapt as needed:
      cy.contains('Your score:').should('be.visible');
    });
  });
});
