# To-Do App (Vue.js)

A simple To-Do application built with Vue.js, Vuex for state management, and a JSON-server backend.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14+)
- npm (v6+)

## Setup & Installation

1. **Install dependencies**:

npm install vuex axios json-server @fortawesome/fontawesome-free

## Running the Application
Terminal 1 (API Server):
cd db
json-server --watch db.json --port 3000

Terminal 2 (Frontend):
npm run serve

## Access the App
Frontend: http://localhost:8080

API: http://localhost:3000/Tasks

