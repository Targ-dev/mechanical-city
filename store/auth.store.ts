import { create } from 'zustand'
import { User } from '@/types/user'

interface AuthState {
    user: User | null

    // Actions
    login: (email: string, password: string) => void
    register: (name: string, email: string, password: string) => void
    logout: () => void

    // Selectors
    isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,

    login: (email, password) => {
        // Mock login logic
        document.cookie = `auth=true; path=/; max-age=86400`
        set({
            user: {
                id: '1',
                name: 'John Doe',
                email: email,
            },
        })
    },

    register: (name, email, password) => {
        // Mock register logic
        document.cookie = `auth=true; path=/; max-age=86400`
        set({
            user: {
                id: '1',
                name: name,
                email: email,
            },
        })
    },

    logout: () => {
        document.cookie = 'auth=; path=/; max-age=0'
        set({ user: null })
    },

    isAuthenticated: () => {
        return !!get().user
    },
}))
