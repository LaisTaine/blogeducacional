import axios, { AxiosResponse } from 'axios';
import { Post, CreatePostBody, UpdatePostBody } from '../types/post';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string; 
}

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000'
});

export const getPostById = (id: number | string): Promise<AxiosResponse<Post>> => {
    return apiClient.get(`/posts/${id}`);
};

export const createPost = (postData: CreatePostBody): Promise<AxiosResponse<Post>> => {
  return apiClient.post('/posts', postData);
};

export const updatePost = (id: number | string, postData: UpdatePostBody): Promise<AxiosResponse<Post>> => {
  return apiClient.patch(`/posts/${id}`, postData);
};

export const deletePost = (id: number | string): Promise<AxiosResponse<void>> => {
    return apiClient.delete(`/posts/${id}`);
};

export const login = (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> => {
  return apiClient.post('/auth/login', credentials);
};


export const getPublishedPosts = () => {
  return apiClient.get('/posts/published');
};


export const getAdminPosts = (page: number, limit: number) => {
  return apiClient.get('/posts/all', {
    params: {
      page,
      limit,
    },
  });
};

export const searchPosts = (term: string) => {
  return apiClient.get('/posts/search', {
    params: { term },
  });
};