import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import api from '../services/api';
import { resolveImageUrl } from '../utils/imageUrl';

const emptyFormData = {
  title_kz: '',
  title_ru: '',
  content_kz: '',
  content_ru: '',
  excerpt_kz: '',
  excerpt_ru: '',
  image: '',
  category: '',
  published_at: '',
  is_active: true,
};

const AdminNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [uploadingImage, setUploadingImage] = useState(false);
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news', {
        params: { page: 1, limit: 1000 },
      });
      setNews(response.data.news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await api.put(`/news/${editingNews.id}`, formData);
      } else {
        await api.post('/news', formData);
      }
      fetchNews();
      setShowForm(false);
      setEditingNews(null);
      setFormData(emptyFormData);
    } catch (error) {
      console.error('Failed to save news:', error);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item);
    setFormData({
      title_kz: item.title,
      title_ru: item.title_ru || item.title,
      content_kz: item.content || '',
      content_ru: item.content_ru || item.content || '',
      excerpt_kz: item.excerpt,
      excerpt_ru: item.excerpt_ru || item.excerpt,
      image: item.image || '',
      category: item.category || '',
      published_at: item.published_at ? new Date(item.published_at).toISOString().slice(0, 16) : '',
      is_active: true,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await api.delete(`/news/${id}`);
        fetchNews();
      } catch (error) {
        console.error('Failed to delete news:', error);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const payload = new FormData();
      payload.append('image', file);
      const response = await api.post('/news/upload', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedImageUrl = response?.data?.imageUrl;
      if (uploadedImageUrl) {
        setFormData((prev) => ({ ...prev, image: uploadedImageUrl }));
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      window.alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">News Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingNews(null);
            setFormData(emptyFormData);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Add News
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingNews ? 'Edit News' : 'Add News'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (KZ)
                </label>
                <input
                  type="text"
                  value={formData.title_kz}
                  onChange={(e) => setFormData({...formData, title_kz: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (RU)
                </label>
                <input
                  type="text"
                  value={formData.title_ru}
                  onChange={(e) => setFormData({...formData, title_ru: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt (KZ)
                </label>
                <textarea
                  value={formData.excerpt_kz}
                  onChange={(e) => setFormData({...formData, excerpt_kz: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt (RU)
                </label>
                <textarea
                  value={formData.excerpt_ru}
                  onChange={(e) => setFormData({...formData, excerpt_ru: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (KZ)
                </label>
                <textarea
                  value={formData.content_kz}
                  onChange={(e) => setFormData({...formData, content_kz: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={6}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (RU)
                </label>
                <textarea
                  value={formData.content_ru}
                  onChange={(e) => setFormData({...formData, content_ru: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={6}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="mt-2">
                  <label className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    {uploadingImage ? 'Uploading...' : 'Upload from computer'}
                  </label>
                </div>
                {formData.image && (
                  <img
                    src={resolveImageUrl(formData.image)}
                    alt="Uploaded preview"
                    className="mt-3 w-full h-40 object-cover rounded-md border border-gray-200"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Published date & time
                </label>
                <input
                  type="datetime-local"
                  value={formData.published_at}
                  onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingNews(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                {editingNews ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.category || 'General'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.published_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNews;
