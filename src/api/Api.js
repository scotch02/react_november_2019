export default class Api {
    static #BASE_URL = "http://localhost:4000";

    static async getAllItems() {
        let response = await fetch(Api.#BASE_URL + "/todoListItems");
        return await response.json();
    }
}