import * as UserActionCreators from './users'
import * as ContactsActionCreators from './contacts'

export default {
    ...UserActionCreators,
    ...ContactsActionCreators
}