"use client";
import React from 'react';
import { PathResult } from '@/types';

interface AnimationInfoProps {
  pathResult: PathResult | null;
  currentStep: number;
  isAnimating: boolean;
}

const AnimationInfo: React.FC<AnimationInfoProps> = ({
  pathResult,
  currentStep,
  isAnimating,
}) => {
  if (!pathResult || !isAnimating) return null;

  const currentStepData = pathResult.steps[currentStep];
  const progress = ((currentStep + 1) / pathResult.steps.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Animation Progress</h3>
        <div className="mt-2 relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-sm font-semibold inline-block text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700">Current Step Details</h4>
        <div className="mt-2 text-sm text-gray-600">
          <p>Current Node: {currentStepData.currentNode}</p>
          <p>Visited Nodes: {currentStepData.visitedNodes.length}</p>
          <p>Frontier Size: {currentStepData.frontier.length}</p>
        </div>
      </div>

      {currentStep === pathResult.steps.length - 1 && (
        <div className="mt-4 p-3 bg-green-50 rounded-md">
          <p className="text-sm text-green-700">
            Path found! Total distance: {pathResult.totalDistance.toFixed(2)} nm
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimationInfo;
