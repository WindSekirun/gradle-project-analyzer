#!/bin/bash
set -e

echo "Running entrypoint script..."

echo "cloc version:"
cloc --version

echo "python3 version:"
python3 --version

if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL is not set."
  exit 1
fi

echo "DATABASE_URL is set to $DATABASE_URL"

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting the application with dumb-init..."
exec dumb-init node dist/main.js