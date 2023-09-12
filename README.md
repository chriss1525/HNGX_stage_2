# API Documentation


Welcome to the API documentation for the /api endpoint, which interacts with a Supabase database and queries them in postgresql. 

This API allows you to perform CRUD (Create, Read, Update, Delete) operations on a "person" table in the database.

## Table of Contents
- [Hosted API](#Hosted-API)
- [Standard Formats for Requests and Responses](#Standard-Formats-for-Requests-and-Assumptions)
- [Sample Usage of the Hosted API](#Sample-Usage-of-the-Hosted-API)
- [Testing](#Tests)
- [Known Limitations and Assumptions](#Known-Limitations-and-Assumptions)
- [Setting up and Deploying the API](#Setting-up-and-Deploying-the-API)


### Hosted API

[API](http://100.25.0.75/api)


### Standard Formats for Requests and Responses

#### Create a Person (POST /api/)


**Request Format:**

- HTTP Method: POST
- Endpoint: /api/
- Body: JSON object representing a person


**Example Request Body:**

```json

{
  "name": "John Doe",
}
```

**Response Format:**

- HTTP Status Code: 201 (Created)
- Body: JSON object representing the created person


**Example Response Body:**

```json
[
    {
        "id": 1,
        "created_at": "2023-09-12T15:14:47.67992+00:00",
        "name": "Christine"
    }
]
```
#### Read One Person (GET /api/:param)


**Request Format:**

- HTTP Method: GET
- Endpoint: /api/:param
- Parameter: param can be either an integer (person ID) or a string (person name)


**Example Request (by ID):**

```bash
GET /api/1
```


**Example Request (by Name):**

```bash
GET /api/John Doe
```

**Response Format:**

- HTTP Status Code: 200 (OK) if found, 404 (Not Found) if not found
- Body: JSON object representing the person


**Example Response Body:**

```json
    {
        "id": 1,
        "created_at": "2023-09-12T15:14:47.67992+00:00",
        "name": "Christine"
    }
```

#### Update a Person's Data (PUT /api/:param)


**Request Format:**

- HTTP Method: PUT
- Endpoint: /api/:param
- Parameter: param can be either an integer (person ID) or a string (person name)
- Body: JSON object representing the updated person data


**Example Request body (Update by ID):**

```json
{
  "name": "Jane_Doe"
}
```
**Example Request body (Update by Name):**

```json
{
  "name": "Jane_Doe"
}
```


**Response Format:**

- HTTP Status Code: 200 (OK) if updated, 404 (Not Found) if not found
- Body: JSON object representing the updated person


**Example Response Body:**

```json
{
    "message": "person updated",
    "data": {
        "id": 3,
        "created_at": "2023-09-12T15:30:12.091249+00:00",
        "name": "Jane_Doe"
    }
}
```
#### Delete a Person (DELETE /api/:param)


**Request Format:**

- HTTP Method: DELETE
- Endpoint: /api/:param
- Parameter: param can be either an integer (person ID) or a string (person name)


**Example Request (Delete by ID):**

```bash
DELETE /api/1
```
**Example Request (Delete by Name):**

```bash
DELETE /api/John_Doe
```


**Response Format:**

- HTTP Status Code: 200 (OK) if deleted, 404 (Not Found) if not found
- Body: JSON message showing person is deleted


**Example Response Body:**

```json
{
    "message": "Person deleted."
}
```

### Sample Usage of the Hosted API

#### Create a Person


```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "John_Doe"
}' http://100.25.0.75/api/
```
#### Read One Person


```bash
# Read by ID
curl http://100.25.0.75/api/1

# Read by Name
curl http://100.25.0.75/api/John_Doe
```


#### Update a Person's Data
```bash
# Update by ID
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Jane Doe"
}' http://100.25.0.75/api/1

# Update by Name
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Jane Doe"
}' http://100.25.0.75/api/John_Doe
```


#### Delete a Person
```bash
# Delete by ID
curl -X DELETE http://100.25.0.75/api/1

# Delete by Name
curl -X DELETE http://100.25.0.75/api/John_Doe
```

### Tests

Check this [postman collection](https://gold-spaceship-212378.postman.co/workspace/HNGX-Workspace~e1d36fe1-5f2f-4fdd-8633-18e7cf7c0bd2/collection/29473948-bad537f4-e3aa-4f03-986c-e5094e2b0564?action=share&creator=2947394) for tests created for this API;



### Known Limitations and Assumptions
- This API assumes that the Supabase database is properly configured and accessible.
- The API assumes that the "person" table exists in the database.
- The API assumes all users have unique names


#### Setting up and Deploying the API


To set up and deploy the API locally or on a server, follow these steps:

- Clone the repository containing the API code.

- Install the necessary dependencies using npm install or yarn install.

- Configure your Supabase database connection in the db.js file.

- Run the API locally using npm start or yarn start.

- Deploy the API to a server of your choice, ensuring that you configure environment variables for security and database access.
