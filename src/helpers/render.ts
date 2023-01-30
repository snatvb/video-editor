import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
})

export type Options = {
    name: string
    bitrate?: number
}

const defaultOptions: Options = {
    name: 'output',
}

function nameWithExtension(name: string, extension: string) {
    return `${name}.${extension}`
}

export async function render(file: File, options: Options = defaultOptions) {
    const { name } = { ...defaultOptions, ...options }
    const mp4Name = nameWithExtension(name, 'mp4')
    await ffmpeg.load()
    ffmpeg.FS('writeFile', mp4Name, await fetchFile(file))
    await ffmpeg.run('-i', mp4Name, '-c:v', 'libx264', mp4Name)
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
