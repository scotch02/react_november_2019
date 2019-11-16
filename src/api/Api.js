const REST_SERVICE_PROTOCOL = process.env.REACT_APP_REST_SERVICE_PROTOCOL;
const REST_SERVICE_HOST = process.env.REACT_APP_REST_SERVICE_HOST;
const REST_SERVICE_PORT = process.env.REACT_APP_REST_SERVICE_PORT;

const baseUrl = `${REST_SERVICE_PROTOCOL}://${REST_SERVICE_HOST}:${REST_SERVICE_PORT}`;

export default class Api {
/*
curl --include --header "Content-Type: application/json"  --request GET http://localhost:4000/todos?isDone=false
HTTP/1.1 200 OK
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 1200
ETag: W/"4b0-kvjqr61/gSmbvEAUMhbm0Yz/BqI"
Date: Sat, 16 Nov 2019 18:41:41 GMT
Connection: keep-alive

[
  {
    "isDone": false,
    "summary": "Put camerasfs osfdsn charger",
    "id": 3
  },
  {
    "isDone": false,
    "summary": "SURE Выучить React",
    "id": 4
  },
  {
    "isDone": false,
    "summary": "Убить кота",
    "id": 9
  },
  {
    "isDone": false,
    "summary": "rfeee",
    "id": 13
  },


*/
    static async getItems(filter) /* ATTENTION. THROWS ERROR ... */ {
        const url = new URL("/todos" ,baseUrl);
        if(filter) {
            const {field, value} = filter;
            url.searchParams.set(field, value);
        }

        const requestUrl = url.toString();
        //  "it will only reject on network failure or if anything prevented the request from completing"
        //  from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // ...
        // and in "await case" throw Error
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if(!response.ok) {
            const { status, statusText } = response;
            throw new Error({
                requestUrl,
                method: 'GET', 
                status,
                statusText
            });
        }

        return await response.json();
    }

/*
curl --include --header "Content-Type: application/json"  --request POST --data '{"summary": "yyyy"}' http://localhost:4000/todos
HTTP/1.1 201 Created
X-Powered-By: Express
Vary: Origin, X-HTTP-Method-Override, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
Access-Control-Expose-Headers: Location
Location: http://localhost:4000/todos/36
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-3A2XFompNYNeU6OueDzAjfsk4cg"
Date: Sat, 16 Nov 2019 19:57:57 GMT
Connection: keep-alive

{
  "summary": "yyyy",
  "id": 36
}
*/
    static async addNewItem(newItem) /* ATTENTION. THROWS ERROR ... */ {
        const url = new URL("/todos" ,baseUrl);
        const requestUrl = url.toString();
        //  "it will only reject on network failure or if anything prevented the request from completing"
        //  from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // ...
        // and in "await case" throw Error
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(newItem)
        });

        if(!response.ok) {
            const { status, statusText } = response;
            throw new Error({
                requestUrl,
                method: 'POST', 
                status,
                statusText
            });
        }
            
        return await response.json();    
    }
/*
curl --include --header "Content-Type: application/json"  --request PUT --data '{"id": 36, "summary": "zzzz"}' http://localhost:4000/todos/36
HTTP/1.1 200 OK
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-5bZxnNmm0JWW2QqcYvvBq3Gdp5k"
Date: Sat, 16 Nov 2019 20:01:30 GMT
Connection: keep-alive

{
  "id": 36,
  "summary": "zzzz"
}

curl --include --header "Content-Type: application/json"  --request PUT --data '{"id": 36, "sxxx": "zzzz"}' http://localhost:4000/odos/36
HTTP/1.1 200 OK
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 32
ETag: W/"20-z4l4VZUPQbSqiLAYE+Wby+NjUms"
Date: Sat, 16 Nov 2019 20:03:19 GMT
Connection: keep-alive

{
  "id": 36,
  "sxxx": "zzzz"
}

curl --include --header "Content-Type: application/json"  --request GET http://localhost:4000/todos/36
HTTP/1.1 200 OK
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 32
ETag: W/"20-z4l4VZUPQbSqiLAYE+Wby+NjUms"
Date: Sat, 16 Nov 2019 20:05:52 GMT
Connection: keep-alive

{
  "id": 36,
  "sxxx": "zzzz"
}

curl --include --header "Content-Type: application/json"  --request PUT --data '{"id": 100, "summary": "zzzz"}' http://localhost:4000/todos/100
HTTP/1.1 404 Not Found
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 2
ETag: W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Date: Sat, 16 Nov 2019 20:06:58 GMT
Connection: keep-alive

{}


*/
    static async updateItem(item) /* ATTENTION. THROWS ERROR ... */ {
        const url = new URL(`/todos/${item.id}`, baseUrl);
        const requestUrl = url.toString();
        //  "it will only reject on network failure or if anything prevented the request from completing"
        //  from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // ...
        // and in "await case" throw Error
        const response = await fetch(requestUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(item)
        });

        if(!response.ok) {
            const { status, statusText } = response;
            throw new Error({
                requestUrl,
                method: 'PUT', 
                status,
                statusText
            });
        }
            
        return await response.json();    
    }
/*
curl --include --header "Content-Type: application/json"  --request DELETE  http://localhost:4000/todos/36
HTTP/1.1 200 OK
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 2
ETag: W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Date: Sat, 16 Nov 2019 20:09:20 GMT
Connection: keep-alive

{}


curl --include --header "Content-Type: application/json"  --request DELETE  http://localhost:4000/todos/36
HTTP/1.1 404 Not Found
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 2
ETag: W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Date: Sat, 16 Nov 2019 20:10:09 GMT
Connection: keep-alive

{}

*/
    static async deleteItemById(id) /* ATTENTION. THROWS ERROR ... */ {
        const url = new URL(`/todos/${id}`, baseUrl);
        const requestUrl = url.toString();
        //  "it will only reject on network failure or if anything prevented the request from completing"
        //  from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // ...
        // and in "await case" throw Error
        const response = await fetch(requestUrl, {
            method: 'DELETE'
        });

        if(!response.ok) {
            const { status, statusText } = response;
            throw new Error({
                requestUrl,
                method: 'DELETE', 
                status,
                statusText
            });
        }
    }
}