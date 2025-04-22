# BookNook

BookNook is a modern web application for discovering books and managing a personalized reading list. It offers a user-friendly interface with personalized onboarding, powerful search and filtering options, and a responsive design with dark mode support.

## Features

- User onboarding questionnaire to personalize the experience based on your mood, favorite genre, and reading goals.
- Browse a curated collection of books with search by title or author.
- Filter books by genre and minimum rating.
- View detailed information about each book.
- Manage your personalized reading list.
- Responsive design with support for light and dark themes.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- npm (comes with Node.js)

### Steps

1. Clone the repository or download the source code.
2. Open a terminal in the project root directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal).

## Project Structure

- `src/` - Main source code directory
  - `components/` - Reusable UI components (e.g., BookCard, BookGrid, OnboardingQuestionnaire)
  - `context/` - React context providers for user and reading list state management
  - `data/` - Static data such as books and reviews
  - `pages/` - Page components for routing (Home, BookDetailPage, ReadingListPage, etc.)
  - `services/` - API service for fetching book data
  - `types/` - TypeScript type definitions
- `public/` or `src/assets/` - Static assets like images
- Configuration files for Vite, Tailwind CSS, TypeScript, ESLint, and PostCSS

## Technologies Used

- React 18 with TypeScript
- Vite for fast development and build
- Tailwind CSS for utility-first styling with dark mode support
- React Router for client-side routing
- Context API for state management
- Lucide React and Tabler Icons for UI icons

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear messages.
4. Push your branch and open a pull request.

Please ensure your code follows the existing style and passes linting.

## License

This project is currently private. Please contact the maintainer for licensing information.
