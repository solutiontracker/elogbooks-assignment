import { errors, message, Error } from '@/store/slices/Error.slice'
import { useAppSelector } from '@/store/Hooks'

export type ErrorServiceOperators = {
    errors: any,
    message: string | undefined
}

/**
 * ErrorService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseErrorService = (): Readonly<ErrorServiceOperators> => {
    return {
        errors: useAppSelector(errors),
        message: useAppSelector(message)
    }
}

export default UseErrorService