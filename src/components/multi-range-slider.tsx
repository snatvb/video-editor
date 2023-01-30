import cx from 'classnames'
import {
    useState,
    useRef,
    useCallback,
    useEffect,
    useLayoutEffect,
} from 'react'

export type ChangeRangeEvent = {
    min: number
    max: number
}

export type Props = {
    min: number
    max: number
    onChange?: (value: ChangeRangeEvent) => void
    className?: string
}

export const MultiRangeSlider = ({ min, max, onChange, className }: Props) => {
    const [minVal, setMinVal] = useState(min)
    const [maxVal, setMaxVal] = useState(max)
    const minValRef = useRef(min)
    const maxValRef = useRef(max)
    const rangeRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        setMinVal(min)
        setMaxVal(max)
    }, [min, max])

    const getPercent = useCallback(
        (value: number) => {
            if (min === max) {
                return 0
            }
            return Math.round(((value - min) / (max - min)) * 100)
        },
        [min, max],
    )

    useEffect(() => {
        const minPercent = getPercent(minVal)
        const maxPercent = getPercent(maxValRef.current)

        if (rangeRef.current) {
            rangeRef.current.style.left = `${minPercent}%`
            rangeRef.current.style.width = `${maxPercent - minPercent}%`
        }
    }, [minVal, getPercent])

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current)
        const maxPercent = getPercent(maxVal)

        if (rangeRef.current) {
            rangeRef.current.style.width = `${maxPercent - minPercent}%`
        }
    }, [maxVal, getPercent])

    // Get min and max values when their state changes
    useEffect(() => {
        onChange?.({ min: minVal, max: maxVal })
    }, [minVal, maxVal, onChange])

    if (minVal >= maxVal) {
        return null
    }

    return (
        <>
            <div className={cx(className, 'relative')}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={(event) => {
                        const value = Math.min(
                            Number(event.target.value),
                            maxVal - 1,
                        )
                        setMinVal(value)
                        minValRef.current = value
                    }}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={(event) => {
                        const value = Math.max(
                            Number(event.target.value),
                            minVal + 1,
                        )
                        setMaxVal(value)
                        maxValRef.current = value
                    }}
                    className="thumb thumb--right"
                />

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={rangeRef} className="slider__range" />
                    <div className="slider__left-value">{minVal}</div>
                    <div className="slider__right-value">{maxVal}</div>
                </div>
            </div>
            <style jsx>{`
                .slider {
                    width: 100%;
                }

                .slider__track,
                .slider__range,
                .slider__left-value,
                .slider__right-value {
                    position: absolute;
                }

                .slider__track,
                .slider__range {
                    border-radius: 3px;
                    height: 15px;
                    width: 100%;
                }

                .slider__track {
                    background-color: rgb(31 41 55 / var(--tw-bg-opacity));
                    z-index: 1;
                }

                .slider__range {
                    background-color: rgb(55 65 81 / var(--tw-bg-opacity));
                    z-index: 2;
                }

                .slider__left-value,
                .slider__right-value {
                    color: #dee2e6;
                    font-size: 12px;
                    margin-top: 20px;
                }

                .slider__left-value {
                    left: 6px;
                }

                .slider__right-value {
                    right: -4px;
                }

                /* Removing the default appearance */
                .thumb,
                .thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    -webkit-tap-highlight-color: transparent;
                }

                .thumb {
                    pointer-events: none;
                    position: absolute;
                    height: 0;
                    width: 100%;
                    outline: none;
                }

                .thumb--left {
                    z-index: 4;
                }

                .thumb--right {
                    z-index: 4;
                }

                .thumb::-webkit-slider-thumb {
                    background-color: #f1f5f7;
                    border: none;
                    border-radius: 999px;
                    box-shadow: 0 0 1px 1px #ced4da;
                    cursor: pointer;
                    height: 22px;
                    width: 7px;
                    margin-top: 14px;
                    pointer-events: all;
                    position: relative;
                }
            `}</style>
        </>
    )
}
