# API Documentation


Welcome to the API documentation for the /api endpoint, which interacts with a Supabase database. 

This API allows you to perform CRUD (Create, Read, Update, Delete) operations on a "person" table in the database.

## Table of Contents
- [Standard Formats for Requests and Responses](#Standard-Formats-for-Requests-and-Assumptions)
- [Sample Usage of the API](#Sample-Usage-of-the-API)
- [Testing](#Tests)
- [Known Limitations and Assumptions](#Known-Limitations-and-Assumptions)
- [Setting up and Deploying the API](#Setting-up-and-Deploying-the-API)

### Standard Formats for Requests and Responses

#### Create a Person (POST /api/)


**Request Format:**

- HTTP Method: POST
- Endpoint: /api/
- Body: JSON object representing a person


**Example Request:**

```json
POST /api/
Content-Type: application/json

{
  "name": "John Doe",
}
```

**Response Format:**

- HTTP Status Code: 201 (Created)
- Body: JSON object representing the created person


**Example Response:**

```json
{
  "id": 1,
  "name": "John Doe",
}
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
GET /api/John_Doe
```

**Response Format:**

- HTTP Status Code: 200 (OK) if found, 404 (Not Found) if not found
- Body: JSON object representing the person


**Example Response:**

```json
{
  "id": 1,
  "name": "John Doe",
}
```

#### Update a Person's Data (PUT /api/:param)


**Request Format:**

- HTTP Method: PUT
- Endpoint: /api/:param
- Parameter: param can be either an integer (person ID) or a string (person name)
- Body: JSON object representing the updated person data


**Example Request (Update by ID):**

```json
PUT /api/1
Content-Type: application/json

{
  "name": "Jane_Doe"
}
```
**Example Request (Update by Name):**

```json
PUT /api/John_Doe
Content-Type: application/json

{
  "name": "Jane_Doe"
}
```


**Response Format:**

- HTTP Status Code: 200 (OK) if updated, 404 (Not Found) if not found
- Body: JSON object representing the updated person


**Example Response:**

```json
{
  "id": 1,
  "name": "Jane_Doe",
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
- Body: JSON object representing the deleted person


**Example Response (by ID):**

```json
{
  "id": 1,
  "name": "John Doe",
}
```

**Example Response (by Name):**

```json
{
  "id": 2,
  "name": "John Doe",
}
```


### Sample Usage of the API


#### Create a Person


```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "John Doe"
}' http://domain/api/
```
#### Read One Person


```bash
# Read by ID
curl http://domain/api/1

# Read by Name
curl http://domain/api/John_Doe
```


#### Update a Person's Data
```bash
# Update by ID
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Jane_Doe"
}' http://domain/api/1

# Update by Name
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Jane_Doe"
}' http://domain/api/John_Doe
```


#### Delete a Person
```bash
# Delete by ID
curl -X DELETE http://domain/api/1

# Delete by Name
curl -X DELETE http://domain/api/John_Doe
```

### Tests

Check this postman collection for tests created for this API;

https://gold-spaceship-212378.postman.co/workspace/HNGX-Workspace~e1d36fe1-5f2f-4fdd-8633-18e7cf7c0bd2/collection/29473948-bad537f4-e3aa-4f03-986c-e5094e2b0564?action=share&creator=29473948


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
