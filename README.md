# YouTube Sharing Application

## I. Introduction

The YouTube Sharing Application is a web application that allows users to share and discover YouTube videos with others. Its main purpose is to provide a platform for users to create their playlists of favorite videos and share them with friends. The application includes a Ruby on Rails API for the backend, a ReactJS-based front end and a Redis as Message Queue for Realtime solution to do the nofication flow

Key Features:
- User registration and authentication
- Create & share video playlists
- Discover new videos
- API integration with YouTube for video fetching (Having validation)
- Notification when there is a new video
- Responsive UI

## II. Prerequisites
Before you begin, ensure you have met the following requirements:
- Docker
- Docker Compose
- Git
- Ruby 
- Node.js 
- MySQL
- Redis (for background jobs)
- A YouTube Data API key. Or could use mine: AIzaSyDQvCbxINcLBbZlwYiE9guxTFvqILkExBQ

[Important] Notes: 
    -- I did do a docker compose to just deploy to run the applications if you want to run it you could just install docker & docker compose.
    -- Because the source include both FE & BE so it will have a git sub-module (BE), You could read commits log of back-end on that sub-module.
        link: https://github.com/pbinh/ytubeshare-be/tree/d8e36517ade72f042f5f8a54e46bb3b59f6e7318

## III. Installation & Configuration

1. Clone the repository:
    Bash:
    ```
    git clone https://github.com/pbinh/ytubeshare.git
    cd ytubeshare
    
    #The command for fetching latest code of submodule (Rails Back-end)
    git submodule update --init --recursive
    ```

2. If you want to run the system:
    - go to folder ytubeshare
    - Bash: 
        ```
            #Go to folder ytubeshare
            cd ytubeshare
            sudo docker compose up  
        ```
    - Wait docker build everything
    - After success build please wait again about 15 seconds. Because I still not fix the issue that back-end will up before MySQL, this will make Back-end crash on the first launch. The waiting is for the ready of MySql database
    - Try to use:
        ```
            #This will start back-end again after mysql is ready
            sudo docker compose up 
        ```
    - Everything will be good now but not enough. There are some setup on database for things work fine (On the scaffolding database on rails commands I forgot to make some field to be text which will limit the length of some fields. For examples: youtube URL & title & description. We will need to access to mysql to fix all VARCHAR fields to TEXT)

3. If you want to run directly:
    -  Backend Setup:
        - Navigate to the ytubeshare-be directory for the Rails API.
        - Install Ruby dependencies:
            ```
                bundle install  
            ```
        - Set up MySql database configuration in the database.yml file.
        - 
    - Frontend Setup:
        - Navigate to the ytubeshare-fe directory for the ReactJS frontend.
            ```
                yarn install
                yarn start
            ```

============RAW README WILL CONTINUE UPDATE:
IV. Database Setup
Create the database and run migrations:

bash
Copy code
bin/rails db:create
bin/rails db:migrate
Seed the database with initial data if required:

bash
Copy code
bin/rails db:seed
V. Running the Application
Start the Rails API server:

bash
Copy code
bin/rails server
Start the ReactJS frontend:

bash
Copy code
yarn start
Open a web browser and navigate to http://localhost:3000 to access the application.

To run the test suite, use:

Backend tests: bin/rspec
Frontend tests: yarn test


VI. Docker Deployment
Build Docker containers:

bash
Copy code
docker-compose build
Start the application:

bash
Copy code
docker-compose up
Access the application through the appropriate Docker container URL.

VII. Usage
To use the YouTube Sharing Application:

Register an account or log in.
Create playlists and add your favorite YouTube videos.
Share your playlists with friends or explore others' playlists.
Search for new videos and enjoy sharing your YouTube discoveries.
For more information, please refer to the official documentation or contact the project maintainers.

Enjoy sharing your favorite YouTube videos with the world using the YouTube Sharing Application! If you encounter any issues or have questions, please refer to the documentation or contact the development team for assistance.

csharp
