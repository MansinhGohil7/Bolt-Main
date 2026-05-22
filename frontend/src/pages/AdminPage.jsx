import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signup');
        return;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.success && data.data.email === 'BoltMain7@bolt.in') {
          setAdmin(data.data);
        } else {
          // Redirect standard users to their dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error verifying admin:', error);
        navigate('/signup');
      } finally {
        setLoading(false);
      }
    };
    
    verifyAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signup');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-[#131313] text-white font-sans flex">
      {/* Sidebar */}
      <div className="w-[280px] bg-[#131313] border-r border-[#2E2E2E] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 px-6 py-8">
            <img src="/logo.png" alt="Bolt Tools" className="w-10 h-10 object-contain rounded" />
            <div>
              <div className="font-bold text-xl tracking-tight text-[#e5e2e1]">Bolt Tools</div>
              <div className="text-[11px] text-[#8c90a1] uppercase tracking-wider mt-0.5">Management Console</div>
            </div>
          </div>
          
          {/* Nav Links */}
          <div className="flex flex-col mt-4">
            <div className="flex items-center gap-4 px-6 py-4 bg-[#1E1E1E] border-l-2 border-[#b0c6ff] cursor-pointer">
              <span className="material-symbols-outlined text-[#b0c6ff]">grid_view</span>
              <span className="text-[#b0c6ff] text-sm font-medium">Service Requests</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#1E1E1E] transition-colors cursor-pointer text-[#8c90a1] hover:text-[#e5e2e1]">
              <span className="material-symbols-outlined">volunteer_activism</span>
              <span className="text-sm font-medium">Donations</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#1E1E1E] transition-colors cursor-pointer text-[#8c90a1] hover:text-[#e5e2e1]">
              <span className="material-symbols-outlined">local_shipping</span>
              <span className="text-sm font-medium">Carrier Submissions</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#1E1E1E] transition-colors cursor-pointer text-[#8c90a1] hover:text-[#e5e2e1]">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Admin Settings</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Links */}
        <div className="border-t border-[#2E2E2E] py-4">
          <div className="flex items-center gap-4 px-6 py-3 hover:bg-[#1E1E1E] transition-colors cursor-pointer text-[#e5e2e1]">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="text-sm font-medium">Support</span>
          </div>
          <div onClick={handleLogout} className="flex items-center gap-4 px-6 py-3 hover:bg-[#1E1E1E] transition-colors cursor-pointer text-[#e5e2e1]">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Sign Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-[80px] border-b border-[#2E2E2E] flex items-center justify-between px-10 shrink-0">
          <h1 className="text-[28px] font-semibold text-[#b0c6ff]">Admin Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8c90a1] text-lg">search</span>
              <input 
                type="text" 
                placeholder="Quick search commands..." 
                className="bg-[#131313] border border-[#2E2E2E] rounded text-sm text-[#e5e2e1] pl-10 pr-4 py-2 w-[300px] focus:outline-none focus:border-[#b0c6ff] transition-colors"
              />
            </div>
            <button className="text-[#e5e2e1] hover:text-[#b0c6ff] transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#b0c6ff] rounded-full"></span>
            </button>
            <button className="text-[#e5e2e1] hover:text-[#b0c6ff] transition-colors">
              <span className="material-symbols-outlined text-[28px]">account_circle</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-10 max-w-[1400px]">
          {/* Top Cards */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[11px] font-medium text-[#c2c6d8] uppercase tracking-wider">Pending Requests</span>
                <span className="bg-[#2a2a2a] text-[#c2c6d8] text-[10px] px-2 py-1 rounded">+12%</span>
              </div>
              <div className="text-[40px] font-semibold text-white leading-none">142</div>
            </div>
            
            <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b0c6ff] text-lg">volunteer_activism</span>
                  <span className="text-[11px] font-medium text-[#c2c6d8] uppercase tracking-wider">Total Donations</span>
                </div>
                <span className="bg-[#2a2a2a] text-[#c2c6d8] text-[10px] px-2 py-1 rounded">Monthly</span>
              </div>
              <div className="text-[40px] font-semibold text-white leading-none">$28.4k</div>
            </div>
            
            <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b0c6ff] text-lg">local_shipping</span>
                  <span className="text-[11px] font-medium text-[#c2c6d8] uppercase tracking-wider">New Carriers</span>
                </div>
                <span className="bg-[#2a2a2a] text-[#c2c6d8] text-[10px] px-2 py-1 rounded">Active</span>
              </div>
              <div className="text-[40px] font-semibold text-white leading-none">18</div>
            </div>
            
            <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-400 text-lg">bolt</span>
                  <span className="text-[11px] font-medium text-[#c2c6d8] uppercase tracking-wider">System Status</span>
                </div>
                <span className="bg-[#2a2a2a] text-[#c2c6d8] text-[10px] px-2 py-1 rounded">Stable</span>
              </div>
              <div className="text-[40px] font-semibold text-white leading-none">99.9%</div>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_350px] gap-12">
            {/* Left Column: Activity */}
            <div>
              <div className="flex justify-between items-end mb-8 border-b border-[#2E2E2E] pb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2">Latest Activity</h2>
                  <p className="text-sm text-[#8c90a1]">Consolidated stream of recent transactions and service logs.</p>
                </div>
                <button className="text-[#b0c6ff] text-sm hover:underline underline-offset-4">Export CSV</button>
              </div>

              {/* Table */}
              <div className="w-full">
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] text-[11px] font-medium text-[#8c90a1] uppercase tracking-widest pb-4 border-b border-[#2E2E2E]">
                  <div>Entity</div>
                  <div>Type</div>
                  <div>Status</div>
                  <div className="text-right">Timestamp</div>
                </div>
                
                {/* Rows */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center py-5 border-b border-[#2E2E2E]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#c2c6d8]">build</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SR-9921: HVAC System</div>
                      <div className="text-[11px] text-[#8c90a1] mt-0.5">Central Hub Facility</div>
                    </div>
                  </div>
                  <div><span className="bg-[#2a2a2a] text-[#e5e2e1] text-[10px] font-bold px-2 py-1 rounded">REQUEST</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#b0c6ff]"></span><span className="text-sm font-semibold text-white">Urgent</span></div>
                  <div className="text-right text-xs text-[#c2c6d8]">2m ago</div>
                </div>
                
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center py-5 border-b border-[#2E2E2E]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#c2c6d8]">payments</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Donation: $1,250.00</div>
                      <div className="text-[11px] text-[#8c90a1] mt-0.5">Anonymous Foundation</div>
                    </div>
                  </div>
                  <div><span className="bg-[#2a2a2a] text-[#e5e2e1] text-[10px] font-bold px-2 py-1 rounded">FINANCIAL</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span><span className="text-sm font-semibold text-white">Verified</span></div>
                  <div className="text-right text-xs text-[#c2c6d8]">14m ago</div>
                </div>

                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center py-5 border-b border-[#2E2E2E]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#c2c6d8]">local_shipping</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Atlas Logistics Group</div>
                      <div className="text-[11px] text-[#8c90a1] mt-0.5">Onboarding Queue</div>
                    </div>
                  </div>
                  <div><span className="bg-[#2a2a2a] text-[#e5e2e1] text-[10px] font-bold px-2 py-1 rounded">CARRIER</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span><span className="text-sm font-semibold text-white">Pending Review</span></div>
                  <div className="text-right text-xs text-[#c2c6d8]">42m ago</div>
                </div>
                
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center py-5 border-b border-[#2E2E2E]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#c2c6d8]">build</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SR-9918: Fleet Maintenance</div>
                      <div className="text-[11px] text-[#8c90a1] mt-0.5">Sector B Vehicles</div>
                    </div>
                  </div>
                  <div><span className="bg-[#2a2a2a] text-[#e5e2e1] text-[10px] font-bold px-2 py-1 rounded">REQUEST</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span><span className="text-sm font-semibold text-white">Processing</span></div>
                  <div className="text-right text-xs text-[#c2c6d8]">1h ago</div>
                </div>
              </div>
            </div>

            {/* Right Column: Health & Alerts */}
            <div className="space-y-12">
              {/* Network Health */}
              <div>
                <h3 className="text-[11px] font-medium text-[#c2c6d8] uppercase tracking-widest border-b border-[#2E2E2E] pb-3 mb-6">Network Health</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#e5e2e1]">Node Cluster A</span>
                    <span className="text-sm font-bold text-[#b0c6ff]">Optimal</span>
                  </div>
                  <div className="w-full h-1 bg-[#2E2E2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#b0c6ff] w-[92%] rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#e5e2e1]">API Latency</span>
                    <span className="text-sm text-[#c2c6d8]">42ms</span>
                  </div>
                  <div className="w-full h-1 bg-[#2E2E2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#b0c6ff] w-[15%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* System Alerts */}
              <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] rounded p-6">
                <h3 className="text-[11px] font-medium text-[#b0c6ff] uppercase tracking-widest mb-4">System Alerts</h3>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#8c90a1] text-lg mt-0.5">info</span>
                  <p className="text-sm text-[#e5e2e1] leading-relaxed">
                    Scheduled maintenance for the <strong>Carrier Submission Pipeline</strong> will occur this Sunday at 02:00 UTC. Expect 15 minutes of downtime.
                  </p>
                </div>
              </div>

              {/* Live Operations */}
              <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] rounded h-[240px] relative overflow-hidden flex items-end p-6">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white via-[#131313] to-[#131313]"></div>
                {/* Faux map lines to simulate the globe graphic from the image */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #b0c6ff 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center bottom' }}></div>
                
                <div className="relative z-10">
                  <h4 className="text-sm font-bold text-white tracking-wide">LIVE OPERATIONS</h4>
                  <p className="text-[11px] text-[#c2c6d8]">Global Carrier Density</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-[#2E2E2E] px-10 py-6 flex justify-between items-center text-xs text-[#8c90a1]">
          <div className="flex items-center gap-6">
            <span className="font-bold text-[#e5e2e1]">Bolt Tools Console</span>
            <span>© 2024 Bolt Tools. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">API Documentation</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminPage;
