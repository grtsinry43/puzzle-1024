'use client'

import DecryptionGame from '@/components/DecryptionGame'
import { getChallenges } from '@/lib/challenges'

export async function Page() {
  const challenges = await getChallenges()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24 bg-black">
      <DecryptionGame initialChallenges={challenges} />
    </main>
  )
}