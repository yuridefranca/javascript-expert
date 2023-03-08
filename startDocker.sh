#!/usr/bin/env bash

FILE=./.env
if [ ! -f "$FILE" ]; then
    cp .env.example .env
fi

docker-compose up --build -d

# docker-compose logs -f
docker-compose exec app bash