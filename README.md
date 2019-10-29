Docker will prepare database.
* Make sure port 35432 is empty.

```
docker-compose up
```

# Backend
* Make sure port 3063 is empty

```
cd pt-backend
yarn
yarn start
```

# Frontend

* Make sure port 5000 is empty or replace the port.

```
cd pt-frontend
yarn
yarn build
yarn global add serve
serve -s build -p 5000
```


open browser and go http://localhost:5000/login
user : test_user
pass : test_pass
