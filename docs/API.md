# REST API

The application provides an API, with the following endpoints:

## `/users`
**GET**:
Access to all users registered. 

**POST**:
Add a user to the database providing the following information in the POST body:

```
{
    username: <chosen username>,
    name: <actual name>
}
```

### `/users/:userId`

**GET**:
Request a single user using it's `userId`

**DELETE**:
Delete user with `userId`

#### `/users/:userId/following`
**GET**:
Show the series user with `userId` is following. 

**POST**:
Add a new series to the series user with `userId` is following. 

## `/series`
**GET**:
Access to all series on the platform

**POST**:
Add a series to the platform providing the following information: 

```
{
    name: <name of the series>
}
```
### `/series/:seriesId`
**GET**:
Show series with ID `seriesId`

### `/series/:seriesId/episodes`
**GET**
Show all episodes published for season with `seasonId`

**POST**:
Add an episode to the series giving the following information:

```
{
    name: <name of the epsiode>,
    url: <URL to the episodes audio stream>, 
    date: <date the episode was published> (optional)
}
```


