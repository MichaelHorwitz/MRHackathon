# Stack Choices
Our whole team was most familiar with the typescript family of stacks. On top of this we were given permission to use libraries like Nest and Next that helped us elevate what we could do in the short time frame.
# Setup Instructions
## ENV
Copy .env.example to .env and change the values to be more secure and unique
## Dependencies
Install docker: https://docs.docker.com/engine/install/
In frontend and mr-backend folders run:
```
npm install -g yarn
yarn
```
## Running
In root: 
```
docker compose up -d
```
This is for the database
In mr-backend
```
yarn start:dev --env-file ../.env # unix
yarn start:dev --env-file ..\.env # windows

```
In frontend:
```
yarn dev
```

The frontend can then be accessed on http://localhost:3000

Future plans are to dockerize all services