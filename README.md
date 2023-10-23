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
        - Set up MySql database configuration in the database.yml file. If you find hard to install MySql please use my bash script to pull a MySql image:
        ``` 
            # This line will pull a MySql image and build to container then create database 
            # The database username/password is setup in this file and it's the same to dev env and prod env
            # SQL_CONTAINER_NAME="ytubeshare"
            # SQL_PORT="3306"
            # SQL_ROOT_PASSWORD="YtubeSh@re"
            ./setup_db_local.sh create_new
        ```
        - Redis is more way ezier to install so please install it first then set up the Redis connection at cable.yml
        - If everything is ok please use:
        ```
            #For generate database schemas
            rails db:create
        ```
    - Frontend Setup:
        - Navigate to the ytubeshare-fe directory for the ReactJS frontend. ReactJs is quite ez to start just run these lines.
            ```
                yarn install
            ```

## IV. Database Setup:
    - Please kindly do some more steps (Sr so much, Due to the lack of time I couldn't resolve these inconvient issues):
        1. Database:
            - Install a Database management tool like phpadmin or Dbeaver (Recommended)
            - Connect to our local MySql by these config:
                # SQL_CONTAINER_NAME="ytubeshare"
                # SQL_PORT="3306"
                # SQL_ROOT_PASSWORD="YtubeSh@re"
                # HOST="localhost"
            - Now go to ytubeshare database, then go to videos table => Change all VARCHAR Fields into TEXT. They are: title, description, url, metadata
            - Please save them all to persist to database
        2. Front-end:
            - Please find all: "35.240.222.156" and replace to "localhost" (The IP 35.240.222.156 is the back-end I deployed, now we are using the localhost so need to change before running)
## V. Running the Application
    1. Running:
        - Start the Rails API server:
            ```
                rails server
            ```
        - Start ReactJs:
            ```
                yarn start
            ```
    2. To run the test suite, use:
        - Backend tests: 
            ```
                rails test
            ```
        - Frontend tests: 
            ```
                yarn test
            ```
## VI. Docker Deployment
    I has mentioned this section before:
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

## VII. Usage
    - To use the YouTube Sharing Application:
        1. Register an account.
        2. Login 
        3. Add your favorite YouTube videos.
        4. If you want to test the notification feature. Please kindly create some others account and login them into seperated web browser profile then try to share the notifications will show them up
        5. 
    - Thank you for take a look and consider the whole project 
    - Notes: 
        - If you encounter any issues, Please kindly ping me on zalo : 0901993159 (Phan Binh) or drop me some message on email: phb.aslan@gmail.com 
