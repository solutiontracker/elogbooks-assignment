import makeApi from "@/utils/ConfigureAxios";

import { Job } from '@/models/Job';

import { GeneralResponse } from '@/models/GeneralResponse';

const baseUrl = `/api`

export const getJobApi = (payload: any): Promise<Job> => {
    return makeApi(`${process.env.REACT_APP_API_URL}`).post(`${baseUrl}/jobs`, payload);
}

export const getCreateJobApi = (payload: any): Promise<GeneralResponse> => {
    return makeApi(`${process.env.REACT_APP_API_URL}`).post(`${baseUrl}/job/create`, payload);
}

export const getJobPropertyApi = (payload: any): Promise<GeneralResponse> => {
    return makeApi(`${process.env.REACT_APP_API_URL}`).get(`${baseUrl}/properties`);
}