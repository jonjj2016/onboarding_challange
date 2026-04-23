-- Postgres runs this file once on first boot via docker-entrypoint-initdb.d
-- Creates one database per mock service so they stay fully isolated

CREATE DATABASE rover_db;
CREATE DATABASE vader_db;
