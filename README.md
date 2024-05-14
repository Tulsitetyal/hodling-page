Step 1: Set Up Your Node.js Project
        mkdir hodling
        cd hodling
        npm init -y
Step 2: Install necessary packages:
        npm install express pg axios
step 3: Set Up PostgreSQL
        CREATE DATABASE hodling;
 
        CREATE TABLE tickers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        last NUMERIC,
        buy NUMERIC,
        sell NUMERIC,
        volume NUMERIC,
        base_unit VARCHAR(10)
      );

Step 4: Running Your Project
       nodemon server.js
