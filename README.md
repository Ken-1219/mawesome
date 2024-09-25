# mawesome

React.js and Express.js weather app. Check out [mawesome](https://mawesome-web.vercel.app/)

## Key Features

1. Get weather data for any city.
2. Built for both desktop and mobile devices.
3. Pin and unpin cities and click on their respective widgets to breeze easily through weather reports of your favorite cities.
4. Pinned cities and current city remain saved for future sessions on the same browser.
5. Used React Context API to save current session data locally on browser.
6. Customized background for every weather condition for aesthetics.
7. Minimal glassmorphism design approach to be even more worthy of your screen space.

## Prerequisites

Before you begin, ensure you have the following installed:

* Node.js (v14.0.0 or later)
* npm (v6.0.0 or later)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ken-1219/mawesome.git
cd mawesome
```

### 2. Server Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Set up server environment variables:

Create a `.env` file in the root of the server directory and add your environment variables:

```
API_KEY=your_weather_api_key_for_openweathermap
```

Run the server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

### 3. Client Setup

Navigate to the client directory:

```bash
cd ../client
```

Install dependencies:

```bash
npm install
```

Set up client environment variables:

Create a `.env` file in the root of the client directory and add your environment variables:

```
REACT_APP_API_URL=http://localhost:5000
```

Note: Replace `http://localhost:5000` with your server URL if it's different.

Run the client:

```bash
npm start
```

**mawesome** will run on `http://localhost:3000`.

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Enter a city name in the search bar to get weather information.
3. Pin your favorite cities for quick access in future sessions.
4. Click on city widgets to view detailed weather reports.
