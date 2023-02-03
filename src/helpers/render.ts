import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import cx from 'classnames'

const ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
})

export type Options = {
    name?: string
    bitrate?: number
    time?: [from: number, to: number]
}

const defaultOptions = {
    name: 'output',
} satisfies Options

function nameWithExtension(name: string, extension: string) {
    return `${name}.${extension}`
}

export async function render(file: File, options: Options = defaultOptions) {
    const { name, time } = { ...defaultOptions, ...options }
    const originalExtension = file.name.split('.').pop()
    if (!originalExtension) {
        throw new Error('File has no extension')
    }
    const mp4Name = nameWithExtension(name, 'mp4')
    const inputName = nameWithExtension('input', originalExtension)
    await ffmpeg.load()
    ffmpeg.FS('writeFile', inputName, await fetchFile(file))
    await ffmpeg.run(
        // cx(
        //     '-i',
        //     inputName,
        //     // time && `-ss 00:00:03 -t 00:00:08`,
        //     // '-c:v copy -c:a copy',
        //     // 'libx264',
        //     mp4Name,
        // ),
        '-i',
        inputName,
        '-ss',
        '1000ms',
        '-t',
        '3000ms',
        mp4Name,
    )
    const data = ffmpeg.FS('readFile', mp4Name)
    const output = new File([data.buffer], mp4Name, {
        type: 'video/mp4',
    })
    const url = URL.createObjectURL(output)
    const a = document.createElement('a')
    a.href = url
    a.download = mp4Name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
