"use client";
import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, Users, MapPin, Plus, Eye, Edit3, Trash2, Filter, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Fetch homes data
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await fetch('/api/homes'); // Replace with your actual API endpoint
        const result = await response.json();
        if (result.success) {
          setHomes(result.data);
        }
      } catch (error) {
        console.error('Error fetching homes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  // Filter homes based on search and filter
  const filteredHomes = homes.filter(home => {
    const matchesSearch = home.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         home.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || home.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      title: 'Total Homes',
      value: homes.length,
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Listings',
      value: homes.filter(h => h.status === 'active').length,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Views',
      value: homes.reduce((sum, h) => sum + (h.views || 0), 0),
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Locations',
      value: new Set(homes.map(h => h.location)).size,
      icon: MapPin,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Manage your home listings and analytics</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Plus size={20} />
              Add New Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">
                      {loading ? (
                        <div className="w-16 h-8 bg-slate-200 rounded animate-pulse"></div>
                      ) : (
                        stat.value.toLocaleString()
                      )}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className={`w-full h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4 opacity-60`}></div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Search homes by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-black w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white min-w-[150px] text-black"
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="condo">Condo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Homes List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Recent Homes ({filteredHomes.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-8 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredHomes.length === 0 ? (
            <div className="p-12 text-center">
              <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No homes found</h3>
              <p className="text-slate-500">
                {homes.length === 0 
                  ? "Start by adding your first home listing." 
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredHomes.slice(0, 10).map((home, index) => (
                <div key={home._id || index} className="p-6 hover:bg-white/50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Home className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {home.title || `Home #${index + 1}`}
                        </h3>
                        <p className="text-slate-600 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {home.location || 'Location not specified'}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                          {home.type || 'Type not specified'} • {home.status || 'Active'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;