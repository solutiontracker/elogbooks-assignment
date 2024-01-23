import { all, fork } from 'redux-saga/effects'

import { JobWatcherSaga } from '@/store/sagas/Job.Saga'

export function* RootSaga() {
    yield all([fork(JobWatcherSaga)])
}

export default RootSaga