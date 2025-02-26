#!/bin/bash

# Read .env file and create build args string
BUILD_ARGS=""
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ $key =~ ^#.*$ ]] && continue
    [[ -z $key ]] && continue
    
    # Remove quotes from value if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Add each env var as a build arg
    BUILD_ARGS="$BUILD_ARGS --build-arg $key=$value"
done < .env

# Run docker build with the build args
docker build $BUILD_ARGS --tag website  .
