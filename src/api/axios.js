import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "ebab96c5f26a5d9eeac7fe2250797044",
        language: "ko-KR"
    }
});

export default instance;