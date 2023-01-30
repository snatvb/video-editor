import { UploadFiles } from '~/components/upload-files'
import { FileList } from '~/components/file-list'

export default function Page() {
    return (
        <main className="space-y-10 p-10">
            <FileList />
            <UploadFiles />
        </main>
    )
}
