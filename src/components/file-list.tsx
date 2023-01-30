'use client'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useFilesStore } from '~/store/files'

export const FileList = observer(function FileList() {
    const fileEntries = useFilesStore().computed.entries()

    if (fileEntries.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {fileEntries.map(([id, file]) => (
                <Link
                    key={id}
                    href={`file/${id}`}
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {file.name}
                    </p>
                </Link>
            ))}
        </div>
    )
})
