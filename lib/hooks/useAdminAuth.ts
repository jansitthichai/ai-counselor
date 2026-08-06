'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAdminAuth() {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function check() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        if (!res.ok) {
          if (!cancelled) router.replace('/admin/login')
          return
        }
        const data = await res.json()
        if (!cancelled) setUsername(data.username ?? null)
      } catch {
        if (!cancelled) router.replace('/admin/login')
      } finally {
        if (!cancelled) setChecking(false)
      }
    }

    check()
    return () => {
      cancelled = true
    }
  }, [router])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    router.push('/admin/login')
  }, [router])

  return { username, checking, logout }
}
