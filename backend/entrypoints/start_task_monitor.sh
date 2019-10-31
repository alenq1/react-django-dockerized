#!/bin/sh

./wait-for-it.sh redis:6379 -- celery flower -A backend --url_prefix=flower --broker=redis://redis:6379/0 --address=0.0.0.0 --port=8888
