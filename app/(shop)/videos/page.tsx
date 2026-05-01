import React from 'react'
import { getVideos } from '@/lib/data-service'

export const dynamic = 'force-dynamic'

export default async function VideosPage() {
    const allVideos = await getVideos();
    const standardVideos = allVideos.filter((v: any) => v.type === 'video');
    const shorts = allVideos.filter((v: any) => v.type === 'short');

    return (
        <>
            {/* Banner Section */}
            <section className="bg-secondary grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                <div className="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                        Media <span className="text-primary">& Videos</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-400 mt-4 max-w-md leading-relaxed font-medium">
                        Watch our latest tool reviews, tutorials, and quick tips to find the perfect gear and master your next project.
                    </p>
                </div>
                <div className="relative h-full hidden lg:block bg-surface flex items-center justify-center">
                   <div className="absolute inset-0 bg-primary/5"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <svg className="w-48 h-48 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   </div>
                </div>
            </section>

            {/* Featured YouTube Videos Section */}
            {standardVideos.length > 0 && (
            <section className="bg-background py-16 lg:py-24">
                <div className="layout-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight uppercase">Featured <span className="text-primary">Videos</span></h2>
                        <p className="text-gray-500 mt-4 text-lg">In-depth reviews and professional guides.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {standardVideos.map((video: any) => (
                            <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group flex flex-col">
                                <div className="aspect-video bg-gray-900 relative">
                                    <iframe 
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    {video.category && (
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3 self-start">{video.category}</span>
                                    )}
                                    <h3 className="font-bold text-secondary text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* YouTube Shorts Section */}
            {shorts.length > 0 && (
            <section className="bg-surface py-16 lg:py-24 border-t border-gray-200">
                <div className="layout-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight uppercase">Quick <span className="text-primary">Shorts</span></h2>
                        <p className="text-gray-500 mt-4 text-lg">Fast tips and tool showcases in under 60 seconds.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {shorts.map((short: any) => (
                            <div key={short.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group">
                                <div className="aspect-[9/16] bg-gray-900 relative">
                                    <iframe 
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${short.youtubeId}`}
                                        title={short.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="p-4 bg-white">
                                    <h3 className="font-bold text-secondary text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">{short.title}</h3>
                                    {short.description && (
                                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{short.description}</p>
                                    )}
                                    <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                        <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
                                        YouTube Shorts
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* Empty State */}
            {standardVideos.length === 0 && shorts.length === 0 && (
                <section className="bg-background py-24 text-center">
                    <div className="layout-container">
                        <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-secondary mb-2">No Videos Available</h2>
                        <p className="text-gray-500">Check back later for new tool reviews and tutorials.</p>
                    </div>
                </section>
            )}
            
            {/* Call to action */}
            <section className="bg-secondary py-16">
                <div className="layout-container text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4">Want More <span className="text-primary">Content?</span></h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">Subscribe to our YouTube channel so you never miss out on the latest tool reviews, tips, and tutorials.</p>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-bold transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        Subscribe to Channel
                    </a>
                </div>
            </section>
        </>
    )
}
