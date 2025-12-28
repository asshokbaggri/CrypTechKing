import { Suspense } from 'react'
import AlertsClient from './AlertsClient'

export const dynamic = 'force-dynamic'

export default function AlertsPage() {
  return (
    <Suspense fallback={
      <div className="text-center text-gray-500 py-10">
        Loading alerts…
      </div>
    }>
      <AlertsClient />
    </Suspense>
  )
}
