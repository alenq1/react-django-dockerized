# React Django Docker-Compose project template

   - This project is made for build and fast deploying of React frontend and Django Backend
   - It counts with the following stack:
  
     ## Frontend Side
       - React 16.8
         - Redux
         - Selectors, Thunk
         - Bootstrap
         - React Router
         - Other libarires like Axios, momentjs
         - Animated and some display additional tools like rating, icons, spinners
      
     ## Backend Site
       - Django 2.2.1
           - Django Rest Framework
         - BackGround and Scheduled Tasks
           - Celery 4
           - Celery Beat
           - Celery with Redis
         - Websocket Streaming Data
           - Django Channels
           - Redis channels layer
         - Scraping Data
           - BeautifulSoup
           - Requests
         - Concurrent Requests
           - Multi-threads or Multi-process
         - Other Tools
           - uvicorn for Websockets
           - Cors Headers
           - Optional Heroku Settings
        
     ## Additional Stack
       - Database backend with postgres or sqlite
       - Proxy with nginx
       - Celery Flower for Monitor tasks

        
     ## Deploy tools
       - Docker 
       - Docker Compose
       - Custom entrypoints
       - Custom Enviroments Variables
       - HealthChecks and Wait for Ready Services
       - Optional procfile Heroku

# How to run

  ## Docker way
  
  The docker compose file has a base template image for backend services, and proxy for serve static files, redis for channels and celery tasks, and optional postgres database to save the data if it needed 

  You need to have installed docker and docker-compose to run this project
     
  if you have docker and docker-compose installed you need to build images in docker-compose and custom Dockerfiles in the backend and frontend folders

    docker-compose build 
      
  After download and build the images just run the app with the command.

    docker-compose up -d
  
  If you encounter a error like this on starting containers 

    for frontend  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)

  Just restart the container affected (Frontend) or set this on the shell console On Linux and MAC

    export DOCKER_CLIENT_TIMEOUT=120
    export COMPOSE_HTTP_TIMEOUT=120

  
# Services Check

  Once all containers are up and running just check the services status on the home page site http://localhost:3000/, and now you can see the service check page


  This is the initial page for check the services which our app will interact and do the following checks

  - Backend root api endpoint
  - Make a request to api backend which makes another request to external api
  - Websocket client send a PING message to the server and awaits for PONG response
  - A button link to the celery flower monitor for scheduled tasks running (see backend/backend/celery.py to disable/enable)
  - A button link to the django admin page for manage your models
  
  If you want to use a database, need create superuser on app container

    docker-compose exec app python manage.py createsuperuser
 
  

  ## Stand Alone (Buscar Nombre)
  - TODO
  - []
  
# Site Description


  ## TODO
  - [] improve UI display 
  - [] add more schedule tasks and delayed tasks
  - [] define model for saving data from scheduled taks
  - [] set enviroment variables deploy more flexible
  - [] use redis-commander for managing redis service
  