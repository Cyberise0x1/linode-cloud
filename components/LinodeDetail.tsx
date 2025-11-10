import React, { useState } from 'react';
import { Linode, LinodeStatus } from '../types';
import { Power, RefreshCw, Terminal, BarChart2, Cpu, Activity, Sparkles, Loader2 } from 'lucide-react';
import { analyzeMetrics } from '../services/geminiService';

interface LinodeDetailProps {
  linode: Linode;
  onUpdateStatus: (id: number, status: LinodeStatus) => void;
  onBack: () => void;
}

export const LinodeDetail: React.FC<LinodeDetailProps> = ({ linode, onUpdateStatus, onBack }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePower = () => {
    const newStatus = linode.status === LinodeStatus.RUNNING ? LinodeStatus.OFFLINE : LinodeStatus.RUNNING;
    onUpdateStatus(linode.id, newStatus);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulated metrics data for the AI
    const mockMetrics = `
      CPU Usage (avg 1h): ${linode.status === 'running' ? '45%' : '0%'}
      Memory Usage: ${linode.status === 'running' ? '6.2GB / 8GB' : '0GB'}
      Disk I/O: ${linode.status === 'running' ? 'High read latency detected (120ms)' : 'No activity'}
      Network In: 150 Mbps
      Network Out: 450 Mbps
      System Load: 2.1, 1.8, 1.5
    `;
    
    const result = await analyzeMetrics(linode.label, mockMetrics);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center space-x-2 mb-1">
             <button onClick={onBack} className="text-blue-600 hover:underline text-sm">Linodes</button>
             <span className="text-gray-400">/</span>
             <span className="font-bold text-gray-700">{linode.label}</span>
           </div>
           <div className="flex items-center space-x-2">
              <span className={`inline-flex h-3 w-3 rounded-full ${linode.status === LinodeStatus.RUNNING ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className="text-sm text-gray-500 capitalize">{linode.status}</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">{linode.ipv4}</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">{linode.region}</span>
           </div>
        </div>
        
        <div className="flex items-center space-x-3">
            <button 
              onClick={handlePower}
              className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none ${
                  linode.status === LinodeStatus.RUNNING 
                  ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50' 
                  : 'border-transparent text-white bg-blue-600 hover:bg-blue-700'
              }`}
            >
                <Power className="h-4 w-4 mr-2" />
                {linode.status === LinodeStatus.RUNNING ? 'Power Off' : 'Power On'}
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reboot
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
                <Terminal className="h-4 w-4 mr-2" />
                Console
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
            {['Summary', 'Network', 'Storage', 'Settings'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.toLowerCase()
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </nav>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats Area */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* AI Analysis */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-indigo-900 flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                        Smart Advice
                    </h3>
                    <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="text-sm text-indigo-700 hover:text-indigo-900 font-medium underline disabled:opacity-50"
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Run Diagnostics'}
                    </button>
                </div>
                
                {isAnalyzing ? (
                    <div className="flex justify-center py-4">
                        <Loader2 className="animate-spin text-indigo-500 h-6 w-6" />
                    </div>
                ) : analysis ? (
                    <div className="text-sm text-indigo-800 whitespace-pre-line bg-white/50 p-4 rounded-md border border-indigo-100">
                        {analysis}
                    </div>
                ) : (
                    <p className="text-sm text-indigo-600">
                        Generate real-time health checks and optimization tips for {linode.label} using Gemini 2.5 Flash.
                    </p>
                )}
            </div>

            {/* CPU Graph (Simulated) */}
            <div className="bg-white p-6 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Cpu className="h-5 w-5 mr-2 text-gray-500" />
                        CPU Usage
                    </h3>
                    <span className="text-xs text-gray-400">Last 24 Hours</span>
                </div>
                <div className="h-48 flex items-end space-x-1">
                    {[...Array(40)].map((_, i) => {
                        const height = linode.status === 'running' ? Math.floor(Math.random() * 80 + 10) : 2;
                        return (
                            <div 
                                key={i} 
                                style={{ height: `${height}%` }} 
                                className="flex-1 bg-blue-100 hover:bg-blue-300 transition-colors rounded-t-sm"
                            ></div>
                        )
                    })}
                </div>
            </div>

            {/* Network Graph (Simulated) */}
            <div className="bg-white p-6 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-gray-500" />
                        Network Transfer
                    </h3>
                     <span className="text-xs text-gray-400">Last 24 Hours</span>
                </div>
                 <div className="h-48 flex items-end space-x-1">
                    {[...Array(40)].map((_, i) => {
                        const height = linode.status === 'running' ? Math.floor(Math.random() * 60 + 5) : 2;
                        return (
                            <div 
                                key={i} 
                                style={{ height: `${height}%` }} 
                                className="flex-1 bg-green-100 hover:bg-green-300 transition-colors rounded-t-sm"
                            ></div>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
            <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-md font-medium text-gray-900 mb-4">Configuration</h3>
                <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <dt className="text-gray-500">Plan</dt>
                        <dd className="text-gray-900 font-medium">{linode.plan}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-500">Region</dt>
                        <dd className="text-gray-900 font-medium">{linode.region}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-500">Image</dt>
                        <dd className="text-gray-900 font-medium">{linode.image}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-500">Backup</dt>
                        <dd className="text-gray-900 font-medium">Disabled</dd>
                    </div>
                </dl>
            </div>
             <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-md font-medium text-gray-900 mb-4">IP Addresses</h3>
                <div className="text-sm space-y-2">
                    <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider">IPv4 - Public</span>
                        <span className="font-mono text-gray-900 select-all">{linode.ipv4}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider">IPv6 - SLAAC</span>
                        <span className="font-mono text-gray-900 select-all">2600:3c00::f03c:91ff:fe73:980e</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};