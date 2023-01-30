import { memo } from 'react'
import { BiSave } from 'react-icons/bi'

export type Props = {
    onSave: () => void
}

export const Actions = memo<Props>(function Actions(props) {
    return (
        <div data-dial-init className="fixed right-6 bottom-6 group z-50">
            <div
                id="speed-dial-menu-bottom-right"
                className="flex-col group-hover:flex group-hover:opacity-100 animate-fade-in hidden opacity-0 items-center mb-4 space-y-2"
            >
                <button
                    onClick={props.onSave}
                    type="button"
                    data-tooltip-target="tooltip-download"
                    data-tooltip-placement="left"
                    className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                >
                    <BiSave />
                    <span className="sr-only">Save</span>
                </button>
                <div
                    id="tooltip-download"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                    Save
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
            <button
                type="button"
                data-dial-toggle="speed-dial-menu-bottom-right"
                aria-controls="speed-dial-menu-bottom-right"
                aria-expanded="false"
                className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 transition-transform group-hover:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    )
})
