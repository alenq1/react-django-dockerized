#!/bin/sh





case $SCENARIO in
    "local")
        ./wait-for-it.sh db:5432 -- python manage.py migrate
        python manage.py collectstatic --noinput
        python manage.py runserver 0.0.0.0:8000
        ;;
    "production")
        ./wait-for-it.sh db:5432 -- gunicorn backend.wsgi:application
        ;;
esac
