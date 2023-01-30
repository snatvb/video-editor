import { NextRequest, NextResponse } from 'next/server'
import { FilePage } from '~/app/page-components/file'

export type Props = {
    params: {
        id: string
    }
}

function Page({ params }: Props) {
    return <FilePage params={params} />
}

export default Page
