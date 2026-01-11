'use client'

import { useAuthStore } from '@/store/auth.store'
import { useEffect, useRef } from 'react'

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const checkAuth = useAuthStore((state) => state.checkAuth)
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current) {
            checkAuth()
            initialized.current = true
        }
    }, [checkAuth])

    return <>{children}</>
}
