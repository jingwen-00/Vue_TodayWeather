# Today's Weather

## Description

Today's Weather is a web application built using Vue.js. The application serves as a weather information hub, allowing users to check the current weather of various cities or countries. Users can also utilize its search feature to explore weather details for specific locations.

<br/>

## Features

- <b>Search Weather Information:</b> Users can search for weather information for a specific city or country. After searching, the weather details are displayed.

- <b>Search History:</b> The application maintains a search history list. Each time a user searches for weather information, it gets added to this history list.

- <b>Delete History:</b> Users have the option to delete weather records from the search history list.

-<b>Responsive Design:</b> The application is designed to be responsive and work well on various devices, adapting its layout accordingly.

<br/>

## Installation

To run the project locally, follow these steps:

#### Install dependencies

```
npm install
```

#### Run the development server

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

<br/>

## Usage

1. Default (Geo Location): It will automatically uses the user's geolocation to display the weather of their current location.

2. Search Bar: Users can manually input the name of a city or country into the search bar to get weather information for that location. The search button remains disabled until there's a non-empty input.

3. Delete Search Record: Users can remove a specific weather search record from the search history list by clicking the delete icon.

4. Search History List: Users can revisit previous searches by clicking on the search icon.
