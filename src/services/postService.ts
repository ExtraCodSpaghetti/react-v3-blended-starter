import axios from "axios";
import type {Post} from "../types/post"

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface ApiFetchResponce{
    posts: Post[],
    totalCount: number
}

export const fetchPosts = async (searchText: string, page: number):Promise<ApiFetchResponce> => {
    const response = await axios.get<Post[]>("/posts", {
        params: {
            q: searchText,
            _page: page,
            _limit: 8,
        }
    });
    const totalCount = Number(response.headers["x-total-count"]);
    return {
        posts: response.data,
        totalCount
    }
};

export const createPost = async(newPost: {title:string, body:string}) => {
    const { data } = await axios.post<Post>(`/posts`, newPost)
    
    return data
 };

export const editPost = async (newDataPost: Post) => {
    const { data } = await axios.patch<Post>(`/posts/${newDataPost.id}`, newDataPost)
    
    return data
 };

export const deletePost = async (postId: number) => {
    const { data } = await axios.delete<Post>(`/posts/${postId}`)
    
    return data
 };
