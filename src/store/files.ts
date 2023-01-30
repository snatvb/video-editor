import { randomUUID } from 'crypto'
import { observable } from 'mobx'
import { computedFn } from 'mobx-utils'
import { makeActions } from '~/helpers/mobx.ext'

export function getFileId(file: File) {
    return crypto.randomUUID()
}

const files = observable(new Map<string, File>())

const actions = makeActions({
    add: (file: File) => {
        files.set(getFileId(file), file)
    },
    removeFile: (file: File) => {
        files.delete(getFileId(file))
    },
    addList: (fileList: File[]) => {
        fileList.forEach((file) => {
            files.set(getFileId(file), file)
        })
    },
})

const store = {
    model: {
        files,
    },
    actions,
    computed: {
        amount: computedFn(() => files.size),
        list: computedFn(() => Array.from(files.values())),
        entries: computedFn(() => Array.from(files.entries())),
        file: computedFn((id: string) => {
            return files.get(id)
        }),
    },
}

export const useFilesStore = () => store
