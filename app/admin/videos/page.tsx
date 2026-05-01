'use client';

import React, { useState, useEffect } from 'react';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>({
    title: '',
    description: '',
    youtubeId: '',
    type: 'video',
    category: 'Uncategorized',
    isActive: true,
  });
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/videos');
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      }
    } catch (err) {
      console.error('Error fetching videos', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing && currentVideo.id ? `/api/videos/${currentVideo.id}` : '/api/videos';
      const method = isEditing && currentVideo.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentVideo),
      });

      if (res.ok) {
        fetchVideos();
        resetForm();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to save video');
      }
    } catch (err) {
      console.error('Error saving video', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchVideos();
      } else {
        alert('Failed to delete video');
      }
    } catch (err) {
      console.error('Error deleting video', err);
    }
  };

  const handleEdit = (video: any) => {
    setCurrentVideo(video);
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentVideo({
      title: '',
      description: '',
      youtubeId: '',
      type: 'video',
      category: 'Uncategorized',
      isActive: true,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Videos & Shorts</h1>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Video' : 'Add New Video'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={currentVideo.title}
                onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 border px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube ID</label>
              <input
                type="text"
                required
                value={currentVideo.youtubeId}
                onChange={(e) => setCurrentVideo({ ...currentVideo, youtubeId: e.target.value })}
                placeholder="e.g. dQw4w9WgXcQ"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 border px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={currentVideo.type}
                onChange={(e) => setCurrentVideo({ ...currentVideo, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 border px-3"
              >
                <option value="video">Standard Video</option>
                <option value="short">YouTube Short</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Tag (Optional)</label>
              <input
                type="text"
                value={currentVideo.category}
                onChange={(e) => setCurrentVideo({ ...currentVideo, category: e.target.value })}
                placeholder="e.g. Review, Tutorial"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 border px-3"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={currentVideo.description}
                onChange={(e) => setCurrentVideo({ ...currentVideo, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-3"
              />
            </div>
            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                checked={currentVideo.isActive}
                onChange={(e) => setCurrentVideo({ ...currentVideo, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label className="ml-2 block text-sm text-gray-900">Active (Visible on site)</label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none"
            >
              {isEditing ? 'Update Video' : 'Add Video'}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : videos.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center">No videos found</td></tr>
            ) : (
              videos.map((video) => (
                <tr key={video.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} 
                        alt={video.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{video.title}</div>
                    <div className="text-sm text-gray-500">Type: {video.type} | Category: {video.category}</div>
                    <div className="text-xs text-gray-400">ID: {video.youtubeId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${video.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {video.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(video)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(video.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
