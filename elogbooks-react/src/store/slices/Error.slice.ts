import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store/Index'

export interface Error {
    message?: string
    errors?: any
}

const initialState: Error = {
    message: '',
    errors: {}
}

// Slice
export const ErrorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        message(state, action: PayloadAction<string>) {
            state.message = action.payload
        },
        errors(state, action: PayloadAction<Error>) {
            state.errors = action.payload
        },
    },
})

// Actions
export const ErrorActions = {
    message: ErrorSlice.actions.message,
    errors: ErrorSlice.actions.errors,
}

// Selectors
export const message = (state: RootState) => state.error.message

export const errors = (state: RootState) => state.error.errors

// Reducer
export default ErrorSlice.reducer