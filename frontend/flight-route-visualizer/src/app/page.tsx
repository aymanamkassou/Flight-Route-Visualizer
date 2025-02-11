"use client";
import { useState, useEffect, useCallback } from 'react';
import Map from '@/components/Map';
import VisualizationControls from '@/components/VisualizationControls';
import { Node, PathResult } from '@/types';

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedStart, setSelectedStart] = useState<Node | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Node | null>(null);
  const [algorithm, setAlgorithm] = useState<'dijkstra' | 'bfs'>('dijkstra');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pathResult, setPathResult] = useState<PathResult | null>(null);
  
  // Fetch nodes data on mount
  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/graph');
        const data = await response.json();
        setNodes(data.nodes);
      } catch (error) {
        console.error('Error fetching nodes:', error);
      }
    };
    fetchNodes();
  }, []);

  const findPath = async () => {
    if (!selectedStart || !selectedEnd) return;

    try {
      const response = await fetch('http://localhost:3001/api/find-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: selectedStart.id,
          end: selectedEnd.id,
          algorithm,
        }),
      });

      const result = await response.json();
      setPathResult(result);
      setIsAnimating(true);
      setCurrentStep(0);
    } catch (error) {
      console.error('Error finding path:', error);
    }
  };

  const clear = () => {
    setPathResult(null);
    setIsAnimating(false);
    setIsPaused(false);
    setCurrentStep(0);
  };

  const getCurrentStepData = () => {
    if (!pathResult || !isAnimating) return {
      visitedNodes: [],
      frontierNodes: [],
      currentNode: null,
      pathNodes: [],
    };

    const step = pathResult.steps[currentStep];
    return {
      visitedNodes: step.visitedNodes,
      frontierNodes: step.frontier,
      currentNode: step.currentNode,
      pathNodes: currentStep === pathResult.steps.length - 1 ? pathResult.path : [],
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Flight Route Pathfinding Visualization
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Map
              nodes={nodes}
              selectedRoute={null}
              {...getCurrentStepData()}
              onNodeClick={(node) => {
                if (!selectedStart) setSelectedStart(node);
                else if (!selectedEnd) setSelectedEnd(node);
              }}
            />
          </div>
          
          <div>
            <VisualizationControls
              nodes={nodes}
              selectedStart={selectedStart}
              selectedEnd={selectedEnd}
              algorithm={algorithm}
              isAnimating={isAnimating}
              animationSpeed={animationSpeed}
              onStartSelect={setSelectedStart}
              onEndSelect={setSelectedEnd}
              onAlgorithmChange={setAlgorithm}
              onSpeedChange={setAnimationSpeed}
              onFindPath={findPath}
              onClear={clear}
              onPause={() => setIsPaused(true)}
              onResume={() => setIsPaused(false)}
              onStep={() => {
                if (currentStep < (pathResult?.steps.length || 0) - 1) {
                  setCurrentStep(curr => curr + 1);
                }
              }}
              isPaused={isPaused}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
