"use client";
import React from 'react';
import { Node } from '@/types';

interface VisualizationControlsProps {
  nodes: Node[];
  selectedStart: Node | null;
  selectedEnd: Node | null;
  algorithm: 'dijkstra' | 'bfs';
  isAnimating: boolean;
  animationSpeed: number;
  onStartSelect: (node: Node) => void;
  onEndSelect: (node: Node) => void;
  onAlgorithmChange: (algorithm: 'dijkstra' | 'bfs') => void;
  onSpeedChange: (speed: number) => void;
  onFindPath: () => void;
  onClear: () => void;
  onPause: () => void;
  onResume: () => void;
  onStep: () => void;
  isPaused: boolean;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  nodes,
  selectedStart,
  selectedEnd,
  algorithm,
  isAnimating,
  animationSpeed,
  onStartSelect,
  onEndSelect,
  onAlgorithmChange,
  onSpeedChange,
  onFindPath,
  onClear,
  onPause,
  onResume,
  onStep,
  isPaused,
}) => {
  const airports = nodes.filter(node => node.type === 'airport');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Point</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedStart?.id || ''}
            onChange={(e) => {
              const node = nodes.find(n => n.id === e.target.value);
              if (node) onStartSelect(node);
            }}
            disabled={isAnimating}
          >
            <option value="">Select start point...</option>
            <optgroup label="Airports">
              {airports.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.id} - {node.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Point</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedEnd?.id || ''}
            onChange={(e) => {
              const node = nodes.find(n => n.id === e.target.value);
              if (node) onEndSelect(node);
            }}
            disabled={isAnimating}
          >
            <option value="">Select end point...</option>
            <optgroup label="Airports">
              {airports.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.id} - {node.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Algorithm</label>
        <div className="mt-2 flex gap-4">
          <button
            className={`px-4 py-2 rounded-md ${
              algorithm === 'dijkstra'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => onAlgorithmChange('dijkstra')}
            disabled={isAnimating}
          >
            Dijkstra
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              algorithm === 'bfs'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => onAlgorithmChange('bfs')}
            disabled={isAnimating}
          >
            BFS
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Animation Speed</label>
        <input
          type="range"
          min="1"
          max="10"
          value={animationSpeed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full mt-2"
          disabled={isAnimating && !isPaused}
        />
      </div>

      <div className="flex gap-4">
        {!isAnimating ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            disabled={!selectedStart || !selectedEnd}
            onClick={onFindPath}
          >
            Find Path
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={onResume}
              >
                Resume
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                onClick={onPause}
              >
                Pause
              </button>
            )}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={onStep}
              disabled={!isPaused}
            >
              Step
            </button>
          </>
        )}
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default VisualizationControls;
