import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LinodeList } from './components/LinodeList';
import { CreateLinode } from './components/CreateLinode';
import { LinodeDetail } from './components/LinodeDetail';
import { INITIAL_LINODES, MOCK_REGIONS, MOCK_IMAGES, MOCK_PLANS } from './constants';
import { Linode, LinodeStatus, ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [linodes, setLinodes] = useState<Linode[]>(INITIAL_LINODES);
  const [selectedLinodeId, setSelectedLinodeId] = useState<number | null>(null);

  const handleCreateLinode = (data: any) => {
    const regionLabel = MOCK_REGIONS.find(r => r.id === data.region)?.label || data.region;
    const imageLabel = MOCK_IMAGES.find(i => i.id === data.image)?.label || data.image;
    const planLabel = MOCK_PLANS.find(p => p.id === data.plan)?.label || data.plan;

    const newLinode: Linode = {
      id: Math.floor(Math.random() * 10000),
      label: data.label,
      status: LinodeStatus.PROVISIONING,
      ipv4: `192.0.2.${Math.floor(Math.random() * 255)}`,
      region: regionLabel,
      image: imageLabel,
      plan: planLabel,
      tags: [],
      created: new Date().toISOString(),
    };

    setLinodes([...linodes, newLinode]);
    setCurrentView('linodes');

    // Simulate Provisioning -> Booting -> Running
    setTimeout(() => {
      setLinodes(prev => prev.map(l => l.id === newLinode.id ? { ...l, status: LinodeStatus.BOOTING } : l));
      setTimeout(() => {
        setLinodes(prev => prev.map(l => l.id === newLinode.id ? { ...l, status: LinodeStatus.RUNNING } : l));
      }, 3000);
    }, 2000);
  };

  const handleLinodeClick = (id: number) => {
    setSelectedLinodeId(id);
    setCurrentView('detail');
  };

  const handleUpdateStatus = (id: number, status: LinodeStatus) => {
    setLinodes(linodes.map(l => l.id === id ? { ...l, status } : l));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard linodes={linodes} />;
      case 'linodes':
        return (
          <LinodeList 
            linodes={linodes} 
            onCreateClick={() => setCurrentView('create')}
            onLinodeClick={handleLinodeClick}
          />
        );
      case 'create':
        return (
          <CreateLinode 
            onSubmit={handleCreateLinode} 
            onCancel={() => setCurrentView('linodes')} 
          />
        );
      case 'detail':
        const selected = linodes.find(l => l.id === selectedLinodeId);
        if (!selected) return <div>Linode not found</div>;
        return (
          <LinodeDetail 
            linode={selected} 
            onUpdateStatus={handleUpdateStatus}
            onBack={() => setCurrentView('linodes')}
          />
        );
      default:
        return <Dashboard linodes={linodes} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}