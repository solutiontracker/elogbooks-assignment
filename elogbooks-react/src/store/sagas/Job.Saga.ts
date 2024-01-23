import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getJobApi, getCreateJobApi, getJobPropertyApi } from '@/store/api/Job.Api';

import { JobActions } from '@/store/slices/Job.Slice'

import { ResponseActions } from '@/store/slices/Response.slice'

import { ErrorActions } from '@/store/slices/Error.slice'

import { GeneralResponse } from '@/models/GeneralResponse'

// Worker Sagas handlers
function* callJobApi({
    payload,
}: {
    type: any
    payload: any
}): SagaIterator {
    const response: GeneralResponse = yield call(getJobApi, payload)
    yield put(JobActions.update(response.data!))
    yield put(ResponseActions.response(response))
}

// Worker Sagas handlers
function* callJobPropertiesApi({
    payload,
}: {
    type: any
    payload: any
}): SagaIterator {
    const response: GeneralResponse = yield call(getJobPropertyApi, payload)
    yield put(JobActions.updateProperties(response.data?.properties!))
}

function* callCreateJobApi({
    payload,
}: {
    type: any
    payload: any
}): SagaIterator {
    const response: GeneralResponse = yield call(getCreateJobApi, payload);
    if (response.status !== undefined && response.status !== 200 && response.status !== 201) {
        yield put(ErrorActions.errors(response?.data?.errors))
    } else {
        yield put(ResponseActions.response({ redirect: 'jobs' }))
    }
}

// Watcher Saga
export function* JobWatcherSaga(): SagaIterator {
    yield takeEvery(JobActions.dispatchJobAction.type, callJobApi)
    yield takeEvery(JobActions.dispatchCreateJobAction.type, callCreateJobApi)
    yield takeEvery(JobActions.dispatchJobPropertyAction.type, callJobPropertiesApi)
}

export default JobWatcherSaga