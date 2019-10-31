#!/bin/sh

### ADDED SUPPORT FOR BEAT WITH OPTION -B
./wait-for-it.sh redis:6379 -- celery -A backend worker -B -l info
