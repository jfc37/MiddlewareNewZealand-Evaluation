# Middleware Evaluation

## Running the API

```
npm install
npm start
```

## Running the tests

```
npm test
```

The API will be available at http://localhost:3001
SwaggerUI will be available at http://localhost:3002

## Running thoughts

1. Expose Open API specs through swagger to make exploring, testing and executing easier
   NOTE: had to change the url in openapi-xml.yaml from
   `https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/blob/main`
   to
   `https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main`

2. Jot down the general flow that the API needs to follow
   // If valid endpoint
   // Call XML API
   // If call results in error, return nice error
   // If call results in 404, return 404
   // Transform xml to json
   // Return json in response

3. Convert each comment as a higher level function, write unit tests while filling out the implementation of each

4. Rush the ending as Noah is losing his cool during bed time

## Questions I would have raised in the planning stage

1. According to the API spec, response for a 404 should include a payload of {error, error_description}.
   I'd question if the 404 response should be bodiless, and that payload should be returned for a 500 response.
   I've coded it that way, but obviously in real life I'd clarify before changing the requirements :-p
