```
https://example.com/events?name=PolyConf
  ^         ^          ^      ^
  ^         ^          ^      ^
protocol   domain    path    query

```

### Domain: The place on the web, where we should go to have that interaction.

### Path: A location within that place, the path describes the resource.

### Query string: A way to provide some criteria, or a way to be more specific about how we want to interact with this particular resource. 

### request ==> computation ==> response

### CRUD: Create=>POST, Read=>GET, Update=>PUT, Delete=>DELETE

### What is lib folder
The lib folder in Node.js is short for “library” and is used to store the source code of the library or module. This folder contains the actual implementation of the module and is where most of the work is done.

### What is the utils folder?
The utils folder in Node.js is short for “utilities” and is used to store utility functions that can be used across different modules. These functions are usually small and reusable and are used to perform common tasks such as string manipulation, date formatting, etc.


## JWT

### What is JWT?
- _JWT_ is an abbreviation for __JSON Web Token__
- JWT Can be conceder to be a form fo user identification that is issued after the initial user authentication takes place.

- When the user completed the login process and they are authenticated, our rest API will issue the client application an access token and a refresh token.

- The access token is given a short time before expires e.g. 5 - 15 min.
- The refresh token gives a longer duration before it expires e.g. several hours a day.

### JWT Hazards
- XSS: Cross-Site scripting
- CSRF: Cross-Site request forgery.
- To prevent these hazards it is recommended for front-end client to only store access tokens in memory. So it will be automatically lost when the app is closed. It should not be stored in local storage or in a cookie.

### How to use refresh token
- Our API will issue our application with a refresh token in an HTTP-only cookie, this type of cookie is not accessible with Javascript.
- Refresh tokens do need to have an expiration, which will then require the user to login in again.
- Refresh tokens should not have the ability to issue new refresh tokens, because that essentially grants indefinite access. 

- Overall access token process involves issuing an access token during user authorization. So the access token allow the user to access our API's until it expires and our API will verify the access token with a middleware every time the access token used to make a request.
- When the access token does expire, the user's application will need to send their refresh token to our API's refresh endpoint to get a new access token 