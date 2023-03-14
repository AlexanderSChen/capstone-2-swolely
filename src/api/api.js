import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API class.
 * 
 * Static class tying in methods to get/send to the backend API.
 * 
 */

class SwolelyApi {
    // the token for interacting with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method="get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${SwolelyApi.token}`};
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers})).data;
        } catch(err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Inidividual API routes

    /** Get current user */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get posts  */
    static async getPosts(title) {
        let res = await this.request("posts", {title});
        return res.posts;
    }

    /** Post a new post */
    static async addPost(data) {
        let res = await this.request("posts", data, "post");
        console.log(res);
        return res.post;
    }

    /** Update a post by id */
    static async updatePost(id, data) {
        let res = await this.request(`posts/${id}`, data, "patch");
        return res.post;
    }

    /** Delete a post by id */
    static async deletePost(id) {
        let res = await this.request(`posts/${id}`, {}, "delete");
        return res.message;
    }

    /** Upvote a post */
    // static async upvotePost(id) {
    //     let res = await this.request(`posts/${id}/upvote`, {}, "post");
    //     return res.post;
    // }

    // /** Downvote a post */
    // static async downvotePost(id) {
    //     let res = await this.request(`posts/${id}/downvote`, {}, "post");
    //     return res.post;
    // }

    /** Get comments */
    static async getComments(postId) {
        let res = await this.request("comments", {postId});
        return res.comments;
    }

    /** get token for login from username, password */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site. */
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile page. */
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }
}

export default SwolelyApi;