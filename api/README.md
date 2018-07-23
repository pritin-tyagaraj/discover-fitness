# discover-fitness API

## Prepare dev environment
### 1. MondoDB
1. Install monbodb
```
brew install mongodb
```

2. Create the folder that the *mongod* process will use to store data by default
```
mkdir -p /data/db
```

## Start dev environment
### 1. MongoDB
```
mongod --config /usr/local/etc/mongod.conf
```
