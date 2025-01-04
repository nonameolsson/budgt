#!/bin/bash

# https://docs.turso.tech/local-development

if [ -z "$1" ]; then
  echo "Usage: $0 <database_name>"
  exit 1
fi

DB_NAME=$1

echo "Deleting local database files..."
rm dump.sql
rm local*
echo "✅ Deletion successful!"

echo "Creating local database..."
turso db shell $DB_NAME .dump > dump.sql
cat dump.sql | sqlite3 local.db
echo "✅ Database creation successful!"
echo "If you want to see the database, update the DATABASE_URL in .env to file:local.db. Preferably, pull environment variables from Vercel by running 'pnpm dlx vercel env pull --environment development'."
