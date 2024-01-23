import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store/Index'

import { GeneralResponse } from '@/models/GeneralResponse'

export interface Response {
    data: any
}

const initialState: Response = {
    data: {}
}

// Slice
export const ResponseSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        response(state, action: PayloadAction<GeneralResponse>) {
            state.data = action.payload
        },
    },
})

// Actions
export const ResponseActions = {
    response: ResponseSlice.actions.response,
}

// Selectors
export const response = (state: RootState) => state.response

// Reducer
export default ResponseSlice.reducer