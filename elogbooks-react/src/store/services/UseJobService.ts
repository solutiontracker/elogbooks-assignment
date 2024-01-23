import { useCallback } from 'react'

import { JobActions, SelectJob, SelectJobProperties } from '@/store/slices/Job.Slice'

import { Job } from '@/models/Job'

import { useAppDispatch, useAppSelector } from '@/store/Hooks'

import { Property } from '@/models/Property'

export type EventServiceOperators = {
    jobs: Job[]
    properties: Property[]
    dispatchJobAction: (object: { query: string, page: number, limit: number }) => void
    dispatchCreateJobAction: (object: { summary: string, description: string, property_id: number }) => void
    dispatchJobPropertyAction: () => void
}

/**
 * EventService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseJobService = (): Readonly<EventServiceOperators> => {
    const dispatch = useAppDispatch()

    return {
        jobs: useAppSelector(SelectJob),
        properties: useAppSelector(SelectJobProperties),
        dispatchJobAction: useCallback(
            (object: { query: string, page: number, limit: number }) => {
                dispatch(JobActions.dispatchJobAction(object))
            },
            [dispatch],
        ),
        dispatchCreateJobAction: useCallback(
            (object: { summary: string, description: string, property_id: number }) => {
                dispatch(JobActions.dispatchCreateJobAction(object))
            },
            [dispatch],
        ),
        dispatchJobPropertyAction: useCallback(
            () => {
                dispatch(JobActions.dispatchJobPropertyAction())
            },
            [dispatch],
        )
    }
}

export default UseJobService