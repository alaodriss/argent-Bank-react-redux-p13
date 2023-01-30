/**
 * @Axios get data with axios
 * Axios used to create a new instance with a custom configuration. With axios.create, 
 * we can generate a client for any API and reuse the configuration for any calls using the same client, 
 * as we will see in the example below.
 */

import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:3001'
})

export default Axios