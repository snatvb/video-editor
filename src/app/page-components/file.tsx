'use client'
import { observer } from 'mobx-react-lite'
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
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
    const fileSrc = useMemo(
        () => (file ? URL.createObjectURL(file) : undefined),
        [file],
    )
    const [time, setTime] = useState({
        min: 0,
        max: 0,
    })
    const [duration, setDuration] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)

    const setMaxTime = useCallback((max: number) => {
        setTime((prev) => {
            if (prev.max == max) {
                return prev
            }
            return { ...prev, max }
        })
    }, [])

    const setMinTime = useCallback((min: number) => {
        setTime((prev) => {
            if (prev.min == min) {
                return prev
            }
            return { ...prev, min }
        })
    }, [])

    useLayoutEffect(() => {
        setMaxTime(duration)
    }, [duration, setMaxTime])

    useEffect(() => {
        if (!videoRef.current || Number.isNaN(videoRef.current.duration)) {
            return
        }
        setDuration(videoRef.current!.duration * 1000)
    }, [setMaxTime])

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (!videoRef.current) {
                return
            }
            if (event.code === 'BracketRight') {
                setMaxTime(videoRef.current.currentTime * 1000)
                return
            }
            if (event.code === 'BracketLeft') {
                setMinTime(videoRef.current.currentTime * 1000)
                return
            }
        }
        window.addEventListener('keydown', handleKeydown)
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [setMaxTime, setMinTime])

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
        render(file, {
            time: [time.min, time.max],
        })
    }, [file, time.max, time.min])

    if (!file) {
        return <div className="space-y-10 p-10">File not found</div>
    }

    return (
        <main className="space-y-10 p-10 pb-32">
            <div className="flex place-content-center rounded-3xl bg-black max-h-[70vh]">
                <video
                    src={fileSrc}
                    ref={videoRef}
                    className="rounded-3xl max-h-[70vh]"
                    onLoadedMetadata={({ currentTarget }) => {
                        setDuration(currentTarget.duration * 1000)
                    }}
                    controls
                />
            </div>
            <MultiRangeSlider
                onChange={handleChangeTime}
                min={0}
                max={duration}
                current={time}
            />
            <Actions onSave={handleSave} />
        </main>
    )
})
