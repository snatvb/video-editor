import { action } from 'mobx'

export function makeActions<
    T extends { [action: string]: (...args: any[]) => void },
>(actions: T) {
    const res = {} as T
    for (const actionName in actions) {
        if (Object.prototype.hasOwnProperty.call(actions, actionName)) {
            const actionFn = actions[actionName]
            res[actionName] = action(actionFn)
        }
    }
    return res
}
