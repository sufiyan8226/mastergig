# mastergigv2

Clone this repository (only this branch-main)

git clone "GIT_REPO" // Not necessary for your case

1.  Server side (Backend)

        Edit the .env file based on the example with proper settings for your development environment

        Setup your PostgreSQL user, password and database and make sure it matches your .env file (see .env file in flask app-edit accordingly)

        Example : postgresql+psycopg2://postgres:123786@127.0.0.1:5432/mastergig

        POSTGRES_USER = "postgres" , Password = "123786" , DB_name = "mastergig" POSTGRES_URL = "127.0.0.0:5432" (default)

        Change the variable according to your postgres database credentials

        Create a python virtual environment with the command python -m venv venv

        Activate the virtual environment by running the following command

        venv\scripts\activate (for Windows)

        The run the following command in you pip env

        pip install -r dev-requirements.txt
        pipenv install -r requirements.txt

        Delete the previous migration folder if it exist

        Then (still within the pip ev) initialize and migrate your database, seed your database, and run your flask app(backend) by running the following command

        flask db init

        flask db migrate

        flask db upgrade

        flask seed all

        flask run (to start backend, ensure backend is started before running front-end to prevent proxy error)

2.  Client Side (Front-end)

        npm install

        npm start

        npm i react-scripts (Run this command prof if you get error during npm start )
