'use client'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    ChangeRangeEvent,
    MultiRangeSlider,
} from '~/components/multi-range-slider'
import { useFilesStore } from '~/store/files'
import { Actions } from '~/components/actions'
import { render } from '~/helpers/render'

export type Props = {
    params: {
        id: string
    }
}

export const FilePage = observer(function File({ params }: Props) {
    const filesStore = useFilesStore()
    const file = filesStore.computed.file(params.id)
    const [time, setTime] = useState({
        min: 0,
        max: 0,
    })
    const videoRef = useRef<HTMLVideoElement>(null)

    const setMaxTime = useCallback((max: number) => {
        setTime((prev) => {
            if (prev.max == max) {
                return prev
            }
            return { ...prev, max }
        })
    }, [])

    useEffect(() => {
        if (!videoRef.current || Number.isNaN(videoRef.current.duration)) {
            return
        }
        setMaxTime(videoRef.current!.duration * 1000)
    }, [setMaxTime])

    const handleChangeTime = useCallback(
        (value: ChangeRangeEvent) => {
            setTime(value)
        },
        [setTime],
    )

    const handleSave = useCallback(() => {
        if (!file) {
            return
        }
        render(file)
    }, [file])

    if (!file) {
        return <div className="space-y-10 p-10">File not found</div>
    }

    return (
        <main className="space-y-10 p-10 pb-32">
            <video
                src={URL.createObjectURL(file)}
                ref={videoRef}
                className="rounded-3xl bg-black"
                onLoadedMetadata={({ currentTarget }) => {
                    setMaxTime(currentTarget.duration * 1000)
                }}
                controls
            />
            <MultiRangeSlider
                onChange={handleChangeTime}
                min={time.min}
                max={time.max}
            />
            <Actions onSave={handleSave} />
        </main>
    )
})
