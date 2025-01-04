#!/bin/bash

# https://docs.turso.tech/local-development

echo "Deleting local database files..."
rm dump.sql
rm local*
echo "✅ Deletion successful!"

echo "Creating local database..."
turso db shell budgt .dump > dump.sql
cat dump.sql | sqlite3 local.db
echo "✅ Database creation successful!"
echo "If you want to see the database, update the DATABASE_URL in .env to file:local.db. Preferably, pull environment variables from Vercel by running 'pnpm dlx vercel env pull --environment development'."
