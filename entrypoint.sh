#!/bin/sh

if [ "$DB_TYPE" = "mysql" ]
then
    echo "Waiting for MySQL..."

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "MySQL started"
fi

npm run migrate && npm run start:prod

exec "$@"
