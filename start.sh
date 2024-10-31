#!/bin/bash

ENV_ARGS=""
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ $key =~ ^#.*$ ]] && continue
    [[ -z $key ]] && continue
    
    # Remove quotes from value if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Add each env var as a build arg
    ENV_ARGS="$ENV_ARGS -e $key=$value"
done < .env

docker run $ENV_ARGS -p 3001:3000 website