import React, { useState, useEffect } from 'react';
import { MOCK_REGIONS, MOCK_IMAGES, MOCK_PLANS } from '../constants';
import { generateInstanceLabel } from '../services/geminiService';
import { Wand2, Loader2, Check } from 'lucide-react';

interface CreateLinodeProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const CreateLinode: React.FC<CreateLinodeProps> = ({ onSubmit, onCancel }) => {
  const [selectedRegion, setSelectedRegion] = useState(MOCK_REGIONS[0].id);
  const [selectedImage, setSelectedImage] = useState(MOCK_IMAGES[0].id);
  const [selectedPlan, setSelectedPlan] = useState(MOCK_PLANS[1].id);
  const [label, setLabel] = useState('');
  const [isGeneratingLabel, setIsGeneratingLabel] = useState(false);

  const selectedPlanDetails = MOCK_PLANS.find(p => p.id === selectedPlan);

  const handleGenerateLabel = async () => {
    setIsGeneratingLabel(true);
    const regionLabel = MOCK_REGIONS.find(r => r.id === selectedRegion)?.label || 'us';
    const imageLabel = MOCK_IMAGES.find(i => i.id === selectedImage)?.label || 'linux';
    
    const generated = await generateInstanceLabel(regionLabel, imageLabel);
    setLabel(generated);
    setIsGeneratingLabel(false);
  };

  const handleSubmit = () => {
    if (!label) return;
    onSubmit({
      region: selectedRegion,
      image: selectedImage,
      plan: selectedPlan,
      label
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Create Linode</h1>
      </div>

      {/* Region Selection */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Region</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_REGIONS.map(region => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`flex flex-col items-start p-4 border rounded-lg transition-all ${
                selectedRegion === region.id 
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-bold text-gray-700">{region.country}</span>
              <span className="text-sm text-gray-500">{region.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Image Selection */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Image</h2>
        <div className="space-y-2">
          {MOCK_IMAGES.map(image => (
            <div 
              key={image.id}
              onClick={() => setSelectedImage(image.id)}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                selectedImage === image.id
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div>
                <span className="block font-medium text-gray-900">{image.label}</span>
                <span className="text-sm text-gray-500">{image.vendor}</span>
              </div>
              {selectedImage === image.id && <Check className="text-blue-500" size={20} />}
            </div>
          ))}
        </div>
      </section>

      {/* Plan Selection */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Plan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Monthly</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">RAM</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">CPUs</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Storage</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_PLANS.map(plan => (
                <tr 
                  key={plan.id} 
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`cursor-pointer ${selectedPlan === plan.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-4 py-4 font-medium text-gray-900">{plan.label}</td>
                  <td className="px-4 py-4 text-gray-600">${plan.price}</td>
                  <td className="px-4 py-4 text-gray-600">{plan.memory / 1024} GB</td>
                  <td className="px-4 py-4 text-gray-600">{plan.cpus}</td>
                  <td className="px-4 py-4 text-gray-600">{plan.disk} GB</td>
                  <td className="px-4 py-4 text-right">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                      {selectedPlan === plan.id && <Check size={12} className="text-white" />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Label */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Linode Label</h2>
        <div className="flex gap-4 items-start">
            <div className="flex-1">
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Enter a label"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="mt-2 text-xs text-gray-500">Label must be alphanumeric and unique.</p>
            </div>
            <button
                type="button"
                onClick={handleGenerateLabel}
                disabled={isGeneratingLabel}
                className="inline-flex items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {isGeneratingLabel ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Wand2 className="h-4 w-4 mr-2 text-purple-600" />}
                AI Generate
            </button>
        </div>
      </section>

      {/* Summary Footer */}
      <div className="fixed bottom-0 right-0 w-full md:w-[calc(100%-16rem)] bg-white border-t border-gray-200 p-4 z-20 flex justify-between items-center">
        <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">${selectedPlanDetails?.price}<span className="text-sm text-gray-500 font-normal">/mo</span></span>
            <span className="text-xs text-gray-500">Hourly: ${(selectedPlanDetails?.price || 0) / 730}/hr</span>
        </div>
        <div className="flex space-x-4">
            <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmit}
                disabled={!label}
                className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Create Linode
            </button>
        </div>
      </div>
    </div>
  );
};