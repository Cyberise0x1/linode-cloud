import React from 'react';
import { Plus, MoreHorizontal, Circle } from 'lucide-react';
import { Linode, LinodeStatus } from '../types';

interface LinodeListProps {
  linodes: Linode[];
  onCreateClick: () => void;
  onLinodeClick: (id: number) => void;
}

export const LinodeList: React.FC<LinodeListProps> = ({ linodes, onCreateClick, onLinodeClick }) => {
  const getStatusColor = (status: LinodeStatus) => {
    switch (status) {
      case LinodeStatus.RUNNING: return 'text-green-500';
      case LinodeStatus.OFFLINE: return 'text-gray-400';
      case LinodeStatus.BOOTING: return 'text-blue-500 animate-pulse';
      case LinodeStatus.PROVISIONING: return 'text-purple-500 animate-pulse';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Linodes</h1>
        <button
          onClick={onCreateClick}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Create Linode
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Region</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Plan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">IP Address</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {linodes.map((linode) => (
                <tr 
                  key={linode.id} 
                  onClick={() => onLinodeClick(linode.id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-blue-600 hover:underline">{linode.label}</div>
                    </div>
                    <div className="sm:hidden text-xs text-gray-500 mt-1">{linode.ipv4}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Circle className={`h-3 w-3 mr-2 fill-current ${getStatusColor(linode.status)}`} />
                      <span className="text-sm text-gray-700 capitalize">{linode.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {linode.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {linode.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell font-mono">
                    {linode.ipv4}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {linodes.length === 0 && (
            <div className="text-center py-10">
                <p className="text-gray-500">No Linodes found. Create one to get started.</p>
            </div>
        )}
      </div>
    </div>
  );
};