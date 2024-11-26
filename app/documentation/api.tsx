export default function Api() {
    return (
        <section className="documentation-section">
            <h2>The API</h2>

            <h2>Overview</h2>
            <p>
                The API provides basic functionalities for managing commands. It
                allows you to retrieve commands from the database with options
                for pagination.
            </p>

            <h2>Endpoints</h2>

            <h3>GET /api/v1/commands</h3>
            <p>This endpoint retrieves a list of commands from the database.</p>

            <h4>Query Parameters</h4>
            <ul>
                <li>
                    <strong>limit</strong> (optional): Specifies the maximum
                    number of records to return. For example, to retrieve only
                    one command, you can use:
                </li>
            </ul>
            <code>
                https://main.d1eqaycl2z5gxr.amplifyapp.com/api/v1/commands?limit=1
            </code>

            <h4>Response</h4>
            <p>
                The response will include the requested commands and a{' '}
                <code>nextToken</code> if there are more commands available. You
                can use this token to fetch the next set of commands.
            </p>

            <p>
                Example response for a request with <code>limit=1</code>:
            </p>
            <code>{`
"data": {
"commands": [
{
"id": "1",
"action": "ROBOT-ANIMATION_SMILE",
"value": 10,
"createdAt": "2024-05-10T17:21:00Z"
}
],
"nextToken": "eyJ2ZXJzaW9uIjozLCJ0b2tlbiI6IkFnVjR1RXQxVWVlU2NhNGJVMDF3N3BBc0NYTEp6YXBYTGZQTzR..."
}
`}</code>

            <h3>Pagination</h3>
            <p>
                To retrieve the next command, use the <code>nextToken</code>{' '}
                provided in the previous response. For example:
            </p>
            <code>
                https://main.d1eqaycl2z5gxr.amplifyapp.com/api/v1/commands?limit=1&nextToken=eyJ2ZXJzaW9uIjozLCJ0b2tlbiI6IkFnVjR1RXQxVWVlU2NhNGJVMDF3N3BBc0NYTEp6YXBYTGZ...
            </code>
            <p>
                This will return the next command along with a new{' '}
                <code>nextToken</code> for further pagination.
            </p>

            <h3>POST /api/v1/commands</h3>
            <p>
                This endpoint allows you to create a new command in the
                database. To send data, make a POST request to the following
                URL:
                <code>
                    https://main.d1eqaycl2z5gxr.amplifyapp.com/api/v1/commands
                </code>
            </p>

            <h4>Request Body</h4>
            <p>The request body should include the following fields:</p>
            <ul>
                <li>
                    <strong>action</strong>: The action associated with the
                    command (e.g., "ROBOT-ANIMATION_SMILE").
                </li>
                <li>
                    <strong>value</strong>: An integer value associated with the
                    command.
                </li>
            </ul>
            <p>Example request body:</p>
            <code>{`
{
    "action": "FORWARD",
    "value": 11
}`}</code>

            <h4>Example using curl</h4>
            <p>You can use the following curl command to send a request:</p>
            <code>
                {`
            curl --location 'https://main.d1eqaycl2z5gxr.amplifyapp.com/api/v1/commands' \
--header 'Content-Type: application/json' \
--data '{
    "action": "FROM_TERM",
    "value": 11
}'
`}
            </code>

            <h4>Response</h4>
            <p>
                Upon successful creation, the API will return the created
                command object.
            </p>
            <p>Example response:</p>
            <code>{`  
"data": {
"id": "2",
"action": "FROM_TERM",
"value": 11,
"createdAt": "2024-05-10T17:25:00Z"
}
`}</code>
        </section>
    )
}
