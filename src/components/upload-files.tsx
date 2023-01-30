'use client'

import { useFilesStore } from '~/store/files'
import DropZone from './drop-zone'

export function UploadFiles() {
    const filesStore = useFilesStore()

    return <DropZone onDrop={filesStore.actions.addList} />
}
