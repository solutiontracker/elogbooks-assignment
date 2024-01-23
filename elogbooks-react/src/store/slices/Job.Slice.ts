import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Job } from '@/models/Job'

import type { RootState } from '@/store/Index'
import { Property } from '@/models/Property'

export interface EventState {
    jobs: Job[],
    properties: Property[]
}

const initialState: EventState = {
    jobs: [],
    properties: [],
}

// Slice
export const JobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        update(state, action: PayloadAction<Job[]>) {
            state.jobs = action.payload
        },
        updateProperties(state, action: PayloadAction<Property[]>) {
            state.properties = action.payload
        }
    },
})

// Actions
export const JobActions = {
    dispatchJobAction: createAction(`${JobSlice.name}/dispatchJobAction`, (payload: { query: string, page: number, limit: number }) => ({
        payload: payload,
    })),
    dispatchCreateJobAction: createAction(`${JobSlice.name}/dispatchCreateJobAction`, (payload: { summary: string, description: string, property_id: number }) => ({
        payload: payload,
    })),
    dispatchJobPropertyAction: createAction(`${JobSlice.name}/dispatchJobPropertyAction`),
    update: JobSlice.actions.update,
    updateProperties: JobSlice.actions.updateProperties,
}

// Selectors
export const SelectJob = (state: RootState) => state.jobs.jobs

export const SelectJobProperties = (state: RootState) => state.jobs.properties

// Reducer
export default JobSlice.reducer