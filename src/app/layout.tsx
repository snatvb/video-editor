import './globals.css'
import 'flowbite'
import cx from 'classnames'
import { IBM_Plex_Mono } from '@next/font/google'
const font = IBM_Plex_Mono({
    subsets: ['latin', 'cyrillic'],
    weight: ['300', '400'],
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body
                className={cx(
                    'dark',
                    'bg-gray-900 text-gray-200',
                    font.className,
                )}
            >
                {children}
            </body>
        </html>
    )
}
