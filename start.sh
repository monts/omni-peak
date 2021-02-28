#!/bin/bash
directory=$(dirname -- $(readlink -fn -- "$0"))
compose="$directory/docker-compose.yml"
env_file="$directory/.env"

docker-compose -f "$compose" --env-file "$env_file" down
docker-compose -f "$compose" --env-file "$env_file" build --no-cache --force-rm
docker-compose -f "$compose" --env-file "$env_file" up -d