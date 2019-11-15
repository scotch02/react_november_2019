const baseUrl = "http://localhost:4000/todos";

export default class Api {

    static async getItems(filter) {
        const url = new URL(baseUrl);
        if(filter) {
            const {field, value} = filter;
            url.searchParams.set(field, value);
        }

        const requestUrl = url.toString();
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
        return await response.json();
    }



/*
curl --header "Content-Type: application/json"  --request GET http://localhost:4000/todos
[
  {
    "id": 0,
    "summary": "Review chapters 7",
    "description": ""
  },
  {
    "id": 1,
    "summary": "Vacuum the living room",
    "description": ""
  },

  ....

]  
*/    
    static async getAllItems() {
        const requestUrl = baseUrl;
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },

        });
        return await response.json();
    }

/*
curl --header "Content-Type: application/json"  --request POST --data '{"xxx": "yyyy"}' http://localhost:4000/todos
{
  "xxx": "yyyy",
  "id": 12
}
*/
    static async addNewItem(newItem) {
        const requestUrl = baseUrl;
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(newItem)
        });
            
        return await response.json();    
    }
/*
curl --header "Content-Type: application/json"  --request PUT --data '{"id": 11, "xxx": "zzzz"}' http://localhost:4000/todos/11
{
  "id": 11,
  "xxx": "zzzz"
}
*/
    static async updateItem(item) {
        const requestUrl = baseUrl + "/" + item.id;
        const response = await fetch(requestUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(item)
        });
            
        return await response.json();    
    }
/*
curl --header "Content-Type: application/json"  --request DELETE  http://localhost:4000/todos/12
{}
curl --header "Content-Type: application/json"  --request DELETE  http://localhost:4000/todos/12
{}
curl --header "Content-Type: application/json"  --request GET  http://localhost:4000/todos/12
{}
curl --header "Content-Type: application/json"  --request GET  http://localhost:4000/todos/11
{
  "id": 11
}
curl --request DELETE  http://localhost:4000/todos/11
{}
curl --request DELETE  http://localhost:4000/todos/11
{}

*/
    static async deleteItemById(id) {
        const requestUrl = baseUrl + "/" + id;
        await fetch(requestUrl, {
            method: 'DELETE'
        });
    }


}