#!/bin/sh

##WITH DAPHNE
#./wait-for-it.sh db:5432 && ./wait-for-it.sh redis:6379 -- daphne backend.asgi:application --bind 0.0.0.0 --port 9000

# WITH UVICORN (FOR DEVELOPMENT)
./wait-for-it.sh db:5432 && ./wait-for-it.sh redis:6379 -- uvicorn backend.asgi:application --ws websockets --host 0.0.0.0 --port 9000

# WITH GUNICORN WITH UVICORN WORKERS (BEST FOR PRODUCTION)
#./wait-for-it.sh db:5432 && ./wait-for-it.sh redis:6379 -- gunicorn backend.asgi:application --bind 0.0.0.0:9000 -w 1 -k uvicorn.workers.UvicornWorker
