import { useEffect, useState } from "react";
import { getAdminBookings } from "../../services/booking.service";
import { getAdminPayments } from "../../services/payment.service";
import { getAdminArticles } from "../../services/article.service";
import { getAdminPodcasts } from "../../services/podcast.service";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    payments: 0,
    articles: 0,
    podcasts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookingsRes, paymentsRes, articlesRes, podcastsRes] =
          await Promise.all([
            getAdminBookings({ limit: 5 }),
            getAdminPayments({ limit: 5 }),
            getAdminArticles({ limit: 5 }),
            getAdminPodcasts({ limit: 5 }),
          ]);

        setStats({
          bookings: bookingsRes?.meta?.total || 0,
          payments: paymentsRes?.meta?.total || 0,
          articles: articlesRes?.data?.length || 0,
          podcasts: podcastsRes?.data?.length || 0,
        });

        // Combine recent items for activity feed
        const recent = [
          ...(bookingsRes?.data || []).map(item => ({ ...item, type: 'booking' })),
          ...(paymentsRes?.data || []).map(item => ({ ...item, type: 'payment' })),
          ...(articlesRes?.data || []).map(item => ({ ...item, type: 'article' })),
          ...(podcastsRes?.data || []).map(item => ({ ...item, type: 'podcast' })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

        setRecentActivity(recent);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getIconForType = (type) => {
    switch(type) {
      case 'booking':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'payment':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'article':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
          </svg>
        );
      case 'podcast':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cards = [
    { 
      title: "Total Bookings", 
      value: stats.bookings,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      link: "/admin/bookings"
    },
    { 
      title: "Total Payments", 
      value: stats.payments,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      link: "/admin/payments"
    },
    { 
      title: "Published Articles", 
      value: stats.articles,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
        </svg>
      ),
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      link: "/admin/articles"
    },
    { 
      title: "Active Podcasts", 
      value: stats.podcasts,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      link: "/admin/podcasts"
    },
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-[#FFD700] animate-spin"></div>
          </div>
          <p className="mt-4 text-indigo-900/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 p-6 shadow-lg shadow-indigo-900/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-900/5 blur-3xl"></div>
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD700] text-xs font-bold text-black">
                  RG
                </span>
                <span className="text-sm font-medium text-indigo-900/60">Admin Dashboard</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-black">
                Welcome back,
                <span className="relative ml-2 inline-block">
                  <span className="relative z-10 text-[#FFD700]">Admin</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </h1>
              <p className="mt-2 text-indigo-900/70">
                Here's what's happening with your platform today. You have{' '}
                <span className="font-medium text-[#FFD700]">{stats.bookings} pending bookings</span>{' '}
                and {stats.payments} new payments to review.
              </p>
            </div>
            
            {/* Date Badge */}
            <div className="hidden rounded-xl border border-indigo-200 bg-white/50 px-4 py-2 backdrop-blur-sm lg:block">
              <p className="text-sm font-medium text-black">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10 hover:-translate-y-1"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${card.bgColor} opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-70`}></div>
            
            {/* Card content */}
            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-indigo-900/50">
                    {card.title}
                  </p>
                  <h3 className="mt-2 text-4xl font-bold text-black">
                    {card.value.toLocaleString()}
                  </h3>
                </div>
                
                {/* Icon container */}
                <div className={`rounded-xl ${card.iconBg} ${card.iconColor} p-3 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  {card.icon}
                </div>
              </div>
              
              {/* Progress indicator (optional) */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-indigo-900/40">
                  Updated just now
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-[#FFD700] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                  View all
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Bottom gradient line */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full`}></div>
          </Link>
        ))}
      </div>

      {/* Recent Activity & Quick Actions Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity Feed - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="h-full rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                  <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-black">
                    Recent Activity
                  </h2>
                  <p className="text-xs text-indigo-900/50">
                    Latest updates from your platform
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]"></span>
                </span>
                <span className="text-xs text-indigo-900/60">Live feed</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div
                    key={`${activity.type}-${activity.id}`}
                    className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/50"
                  >
                    {/* Icon with type-specific styling */}
                    <div className={`rounded-lg p-2.5 ${
                      activity.type === 'booking' ? 'bg-indigo-100 text-indigo-600' :
                      activity.type === 'payment' ? 'bg-emerald-100 text-emerald-600' :
                      activity.type === 'article' ? 'bg-amber-100 text-amber-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getIconForType(activity.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-black">
                          {activity.title || activity.name || `${activity.type} created`}
                        </p>
                        <span className="text-xs text-indigo-900/40">
                          {formatDate(activity.createdAt)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                          {activity.type}
                        </span>
                        {activity.status && (
                          <span className={`text-xs ${
                            activity.status === 'completed' || activity.status === 'published' 
                              ? 'text-emerald-600' 
                              : activity.status === 'pending'
                              ? 'text-amber-600'
                              : 'text-indigo-600'
                          }`}>
                            • {activity.status}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Arrow indicator on hover */}
                    <svg className="h-5 w-5 text-indigo-300 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-indigo-50 p-4">
                    <svg className="h-8 w-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="mt-4 text-sm text-indigo-900/60">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & System Health - Takes 1 column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-black">
                  Quick Actions
                </h2>
                <p className="text-xs text-indigo-900/50">
                  Common tasks and shortcuts
                </p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/admin/bookings/new"
                className="group flex flex-col items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 transition-all duration-200 hover:border-[#FFD700] hover:bg-[#FFD700]/5"
              >
                <svg className="h-6 w-6 text-indigo-600 transition-colors group-hover:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium text-black">New Booking</span>
              </Link>
              
              <Link
                to="/admin/articles/new"
                className="group flex flex-col items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 transition-all duration-200 hover:border-[#FFD700] hover:bg-[#FFD700]/5"
              >
                <svg className="h-6 w-6 text-indigo-600 transition-colors group-hover:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs font-medium text-black">Write Article</span>
              </Link>
              
              <Link
                to="/admin/podcasts/new"
                className="group flex flex-col items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 transition-all duration-200 hover:border-[#FFD700] hover:bg-[#FFD700]/5"
              >
                <svg className="h-6 w-6 text-indigo-600 transition-colors group-hover:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-xs font-medium text-black">Add Podcast</span>
              </Link>
              
              <Link
                to="/admin/payments"
                className="group flex flex-col items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 transition-all duration-200 hover:border-[#FFD700] hover:bg-[#FFD700]/5"
              >
                <svg className="h-6 w-6 text-indigo-600 transition-colors group-hover:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-black">View Payments</span>
              </Link>
            </div>
          </div>

          {/* System Health */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-black">
                    System Health
                  </h2>
                  <p className="text-xs text-indigo-900/50">
                    All systems operational
                  </p>
                </div>
              </div>
              
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                100%
              </span>
            </div>
            
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-900/60">Server Load</span>
                  <span className="font-medium text-black">23%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-indigo-100">
                  <div className="h-full w-[23%] rounded-full bg-gradient-to-r from-[#FFD700] to-indigo-600"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-900/60">API Response</span>
                  <span className="font-medium text-black">142ms</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-indigo-100">
                  <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-[#FFD700] to-indigo-600"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-900/60">Storage Used</span>
                  <span className="font-medium text-black">1.2 GB / 5 GB</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-indigo-100">
                  <div className="h-full w-[24%] rounded-full bg-gradient-to-r from-[#FFD700] to-indigo-600"></div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-indigo-100 pt-4">
              <div>
                <p className="text-xs text-indigo-900/40">Uptime</p>
                <p className="text-sm font-medium text-black">99.9%</p>
              </div>
              <div>
                <p className="text-xs text-indigo-900/40">Last Backup</p>
                <p className="text-sm font-medium text-black">2h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to your global CSS for the grid pattern
/*
.bg-grid-pattern {
  background-image: linear-gradient(to right, #334155 1px, transparent 1px),
    linear-gradient(to bottom, #334155 1px, transparent 1px);
  background-size: 24px 24px;
}
*/
