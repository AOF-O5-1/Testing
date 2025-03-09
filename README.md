# Tech Quiz Application

## Description

The Tech Quiz Application is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to test their technical knowledge through an interactive quiz. Users can start a quiz, answer multiple-choice questions, and view their final score upon completion. This application demonstrates the implementation of comprehensive testing strategies using Cypress for both component and end-to-end testing.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing with Cypress](#testing-with-cypress)
  - [Component Testing](#component-testing)
  - [End-to-End Testing](#end-to-end-testing)
- [Project Structure](#project-structure)
- [Tutorial Video](#video)
- [User Story](#user-story)
- [Contact](#contact)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive quiz interface with multiple-choice questions
- Random selection of questions from a database
- Real-time scoring
- Ability to restart the quiz after completion
- Comprehensive test coverage with Cypress

## Technologies Used

- **Frontend**: React.js, Bootstrap for styling
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Cypress (for both component and E2E testing)
- **Other Tools**: Vite (for frontend bundling), ESLint (for code quality)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tech-quiz-app.git
   cd tech-quiz-app
   ```

2. Install dependencies for both the server and client:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. Set up your MongoDB connection:
   - Create a `.env` file in the root directory
   - Add your MongoDB URI: `MONGODB_URI=your_mongodb_connection_string`

4. Install Cypress as a dev dependency:
   ```bash
   npm install cypress --save-dev
   ```

## Usage

1. Start the development server:
   ```bash
   npm run develop
   ```

2. Open your browser and navigate to `http://localhost:3001` to access the application.

3. Click the "Start Quiz" button to begin the quiz.

4. Answer the questions by selecting one of the multiple choice options.

5. After completing all questions, view your final score and restart the quiz if desired.

## Testing with Cypress

This application uses Cypress for both component testing and end-to-end testing to ensure reliability and robustness.

### Component Testing

Component tests focus on testing individual React components in isolation.

1. Running component tests:
   ```bash
   npx cypress run --component
   ```

2. Select the component test you wish to run from the Cypress interface.

The Quiz component tests verify that:
- The initial state shows the "Start Quiz" button
- Questions load correctly after starting the quiz
- Answering questions navigates to the next question
- The final score is displayed correctly upon completion

### End-to-End Testing

End-to-end tests simulate real user interactions with the entire application.

1. Running E2E tests:
   ```bash
   npx cypress run --e2e
   ```

2. Select the E2E test you wish to run from the Cypress interface.

The E2E tests verify the complete user journey:
- Navigating to the application
- Starting a quiz
- Answering all questions
- Viewing the final score
- Restarting the quiz

## Project Structure

```
tech-quiz-app/
│
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service functions
│   │   └── ...
│   │
│   └── cypress/             # Cypress tests
│       ├── component/       # Component tests
│       ├── e2e/             # End-to-end tests
│       ├── fixtures/        # Test data
│       └── support/         # Test helpers and commands
│
├── server/                  # Backend Node.js/Express application
│   ├── config/              # Database configuration
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── ...
│
└── README.md                # Project documentation
```

## Tutorial Video

*[Include screenshots of the application here]*

## User Story

```
AS AN aspiring developer
I WANT to take a tech quiz
SO THAT I can test my knowledge and improve my skills
```

## Contact
For questions, suggestions, or contributions, please reach out:

GitHub: [github.com/AOF-O5-1](https://github.com/AOF-O5-1)
Email: marcusfajemisin@gmail.com
Feel free to open an issue or submit a pull request with any improvements!

## Contributing

Contributions to improve the application or test coverage are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)

---

This application was developed to demonstrate the importance of testing in modern web development. By implementing comprehensive test suites with Cypress, we ensure that the application remains reliable and robust, even as new features are added or existing ones are modified.