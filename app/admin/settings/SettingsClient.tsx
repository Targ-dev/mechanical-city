'use client'

import React, { useState } from 'react'

export default function SettingsClient({ initialConfig }: { initialConfig: any }) {
    const [config, setConfig] = useState(initialConfig || {
        contactEmail: '',
        contactPhone: '',
        contactAddress: '',
        socialInstagram: '',
        socialFacebook: '',
        socialWhatsapp: '',
        footerAboutText: '',
        features: [],
        banners: [],
        youtubeShorts: []
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setConfig((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleFeatureChange = (index: number, field: string, value: string) => {
        const newFeatures = [...config.features]
        if (!newFeatures[index]) newFeatures[index] = { title: '', description: '', iconSvg: '' }
        newFeatures[index][field] = value
        setConfig((prev: any) => ({ ...prev, features: newFeatures }))
    }

    const handleBannerChange = (index: number, field: string, value: string) => {
        const newBanners = [...(config.banners || [])]
        if (!newBanners[index]) newBanners[index] = { bannerId: '', imageUrl: '', subtitle: '', titleHtml: '', buttonText: '', buttonLink: '' }
        newBanners[index][field] = value
        setConfig((prev: any) => ({ ...prev, banners: newBanners }))
    }

    const handleYoutubeShortChange = (index: number, field: string, value: string) => {
        const newShorts = [...(config.youtubeShorts || [])]
        if (!newShorts[index]) newShorts[index] = { id: '', url: '' }
        newShorts[index][field] = value
        
        // Automatically extract ID if the user pastes a URL
        if (field === 'url' && value) {
            try {
                if (value.includes('/shorts/')) {
                     const idPart = value.split('/shorts/')[1].split('?')[0];
                     if (idPart) newShorts[index].id = idPart;
                } else if (value.includes('v=')) {
                     const urlParams = new URL(value).searchParams;
                     const v = urlParams.get('v');
                     if (v) newShorts[index].id = v;
                } else if (value.includes('youtu.be/')) {
                     const idPart = value.split('youtu.be/')[1].split('?')[0];
                     if (idPart) newShorts[index].id = idPart;
                }
            } catch (e) {
                console.error("Failed to parse Youtube ID", e)
            }
        }

        setConfig((prev: any) => ({ ...prev, youtubeShorts: newShorts }))
    }

    const addYoutubeShort = () => {
        setConfig((prev: any) => ({ ...prev, youtubeShorts: [...(prev.youtubeShorts || []), { id: '', url: '' }] }))
    }

    const removeYoutubeShort = (index: number) => {
        const newShorts = [...(config.youtubeShorts || [])]
        newShorts.splice(index, 1)
        setConfig((prev: any) => ({ ...prev, youtubeShorts: newShorts }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to update settings')
            }

            const updatedConfig = await res.json()
            setConfig(updatedConfig)
            setMessage({ text: 'Settings updated successfully!', type: 'success' })
        } catch (error: any) {
            setMessage({ text: error.message, type: 'error' })
        } finally {
            setLoading(false)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            {message && (
                <div className={`px-6 py-3 text-sm font-medium rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Contact Information</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="contactEmail" value={config.contactEmail} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="text" name="contactPhone" value={config.contactPhone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address (Supports newline)</label>
                        <textarea name="contactAddress" value={config.contactAddress} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Social Links</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                        <input type="text" name="socialInstagram" value={config.socialInstagram} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                        <input type="text" name="socialFacebook" value={config.socialFacebook} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp URL / Number</label>
                        <input type="text" name="socialWhatsapp" value={config.socialWhatsapp} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Footer Content</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Footer About Text / Testimonial</label>
                    <textarea name="footerAboutText" value={config.footerAboutText} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
                </div>
            </div>

            {/* Features / Benefits */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Homepage Features (Benefits)</h2>
                {config.features?.map((feature: any, idx: number) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Feature {idx + 1} Title</label>
                            <input type="text" value={feature.title} onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                            <input type="text" value={feature.description} onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Icon SVG HTML</label>
                            <input type="text" value={feature.iconSvg} onChange={(e) => handleFeatureChange(idx, 'iconSvg', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Banners */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Banners (2 Promo, 1 Bosch width)</h2>
                {(config.banners || []).map((banner: any, idx: number) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Banner ID (e.g. promo1)</label>
                            <input type="text" value={banner.bannerId} onChange={(e) => handleBannerChange(idx, 'bannerId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm bg-gray-100" readOnly />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                            <input type="text" value={banner.imageUrl} onChange={(e) => handleBannerChange(idx, 'imageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle (e.g. UP TO 10% OFF)</label>
                            <input type="text" value={banner.subtitle} onChange={(e) => handleBannerChange(idx, 'subtitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Title HTML (e.g. Circular Saw &lt;br/&gt; &lt;span&gt;etc...&lt;/span&gt;)</label>
                            <textarea value={banner.titleHtml} onChange={(e) => handleBannerChange(idx, 'titleHtml', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" rows={2} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Button Text</label>
                            <input type="text" value={banner.buttonText} onChange={(e) => handleBannerChange(idx, 'buttonText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Button Link</label>
                            <input type="text" value={banner.buttonLink} onChange={(e) => handleBannerChange(idx, 'buttonLink', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                    </div>
                ))}
            </div>

            {/* YouTube Shorts */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-xl font-semibold text-gray-800">YouTube Shorts</h2>
                    <button type="button" onClick={addYoutubeShort} className="bg-secondary text-white px-4 py-1.5 rounded-md text-sm hover:bg-[#FFC400] hover:text-black transition-colors">
                        + Add Short
                    </button>
                </div>
                {(config.youtubeShorts || []).map((short: any, idx: number) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">YouTube Video ID (e.g. C1fzwterMSE)</label>
                            <input type="text" value={short.id} onChange={(e) => handleYoutubeShortChange(idx, 'id', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Full URL</label>
                            <input type="text" value={short.url} onChange={(e) => handleYoutubeShortChange(idx, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                        </div>
                        <div className="flex justify-end">
                            <button type="button" onClick={() => removeYoutubeShort(idx)} className="text-red-500 text-sm font-semibold hover:text-red-700 px-3 py-2 border border-red-200 bg-red-50 rounded-md">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-yellow-500 text-secondary font-bold py-3 px-8 rounded-md transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </form>
    )
}
