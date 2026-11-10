# E-Commerce Website

A modern e-commerce web application built with **Next.js** and **React**, featuring a component-based architecture and Material UI for building the user interface.

## Overview

This project is an e-commerce website developed using Next.js. It focuses on building a structured and maintainable shopping application with reusable components and a separate data layer.

The project uses JSON Server as a lightweight REST API for local development and data management.

## Tech Stack

- **Next.js 16** – React framework for building the application.
- **React 19** – Component-based UI development.
- **Material UI (MUI)** – UI components and styling.
- **Emotion** – CSS-in-JS styling.
- **JSON Server** – Mock REST API for local data.
- **JavaScript** – Application logic.
- **ESLint** – Code quality and linting.

## Project Structure

```text
e-commerce-website-next.js/
│
├── app/                 # Application pages and routing
├── components/          # Reusable UI components
├── lib/                 # Shared utilities and logic
├── messages/            # Application messages
├── public/              # Static assets
│
├── db.json              # Local JSON database
├── eslint.config.mjs    # ESLint configuration
├── next.config.mjs     # Next.js configuration
├── jsconfig.json        # JavaScript configuration
├── package.json         # Dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ahmed-Azaz/e-commerce-website-next.js.git
```

2. Navigate to the project directory:

```bash
cd e-commerce-website-next.js
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Mock API

In a separate terminal, start JSON Server:

```bash
npx json-server db.json --port 3001
```

The local API will be available at:

```text
http://localhost:3001
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

## Development

The project uses reusable React components to keep the application organized and easier to maintain. Material UI provides the building blocks for the interface, while JSON Server provides a local API during development.

## License

This project is available for personal and educational use.
