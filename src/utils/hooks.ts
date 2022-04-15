import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { RootState, AppDispatch } from '../store'
import ActionCreators from '@store/actions'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}