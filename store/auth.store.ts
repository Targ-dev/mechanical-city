import { create } from 'zustand'
import { User } from '@/types/user'

interface AuthState {
    user: User | null
    isLoading: boolean
    error: string | null

    // Actions
    login: (email: string, password: string) => Promise<boolean>
    register: (name: string, email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>
    clearError: () => void

    // Selectors
    isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => {
    return {
        user: null, // No persistence for now
        isLoading: false,
        error: null,

        login: async (email, password) => {
            set({ isLoading: true, error: null })
            try {
                const res = await fetch('/api/auth?action=login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                })

                const data = await res.json()

                if (!res.ok) {
                    set({ error: data.error || 'Login failed', isLoading: false })
                    return false
                }

                // Token is handled by HTTP-only cookie
                set({
                    user: data.user,
                    isLoading: false,
                    error: null
                })
                return true
            } catch (error) {
                set({ error: 'An unexpected error occurred', isLoading: false })
                return false
            }
        },

        register: async (name, email, password) => {
            set({ isLoading: true, error: null })
            try {
                const res = await fetch('/api/auth?action=register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                })

                const data = await res.json()

                if (!res.ok) {
                    set({ error: data.error || 'Registration failed', isLoading: false })
                    return false
                }

                // Token is handled by HTTP-only cookie
                set({
                    user: data.user,
                    isLoading: false,
                    error: null
                })
                return true
            } catch (error) {
                set({ error: 'An unexpected error occurred', isLoading: false })
                return false
            }
        },

        logout: async () => {
            try {
                await fetch('/api/auth?action=logout', { method: 'POST' })
            } catch (error) {
                console.error('Logout failed', error)
            } finally {
                set({ user: null, error: null })
            }
        },

        checkAuth: async () => {
            set({ isLoading: true })
            try {
                const res = await fetch('/api/auth')
                if (res.ok) {
                    const data = await res.json()
                    set({ user: data.user })
                } else {
                    set({ user: null })
                }
            } catch (error) {
                set({ user: null })
            } finally {
                set({ isLoading: false })
            }
        },

        clearError: () => set({ error: null }),

        isAuthenticated: () => {
            return !!get().user
        },
    }
})
