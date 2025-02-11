"use client";
import React from 'react';
import { Node, Route } from '@/types';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
interface MapProps {
  nodes: Node[];
  selectedRoute: Route | null;
  visitedNodes: string[];
  frontierNodes: string[];
  currentNode: string | null;
  onNodeClick: (node: Node) => void;
  pathNodes: string[];
}

const Map: React.FC<MapProps> = ({
  nodes,
  selectedRoute,
  visitedNodes,
  frontierNodes,
  currentNode,
  onNodeClick,
  pathNodes,
}) => {
  const getNodeColor = (node: Node) => {
    if (currentNode === node.id) return '#22c55e';
    if (pathNodes.includes(node.id)) return '#3b82f6';
    if (visitedNodes.includes(node.id)) return '#64748b';
    if (frontierNodes.includes(node.id)) return '#eab308';
    return '#94a3b8';
  };

  const getNodeRadius = (node: Node) => {
    if (node.type === 'airport') return 8;
    return 5;
  };

  return (
    <MapContainer
      center={[31.7917, -7.0926]} // Morocco center
      zoom={6}
      className="w-full h-[600px] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Draw edges between connected nodes */}
      {nodes.map((node) => (
        <React.Fragment key={`edges-${node.id}`}>
          {node.connections?.map((connectedId) => {
            const connectedNode = nodes.find(n => n.id === connectedId);
            if (connectedNode) {
              return (
                <Polyline
                  key={`${node.id}-${connectedId}`}
                  positions={[
                    [node.coordinates.lat, node.coordinates.lng],
                    [connectedNode.coordinates.lat, connectedNode.coordinates.lng]
                  ]}
                  color="#cbd5e1"
                  weight={1}
                  opacity={0.5}
                />
              );
            }
            return null;
          })}
        </React.Fragment>
      ))}

      {/* Draw path if exists */}
      {pathNodes.length > 1 && (
        <Polyline
          positions={pathNodes.map(nodeId => {
            const node = nodes.find(n => n.id === nodeId);
            return [node!.coordinates.lat, node!.coordinates.lng];
          })}
          color="#3b82f6"
          weight={3}
        />
      )}

      {/* Draw nodes */}
      {nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={[node.coordinates.lat, node.coordinates.lng]}
          radius={getNodeRadius(node)}
          fillColor={getNodeColor(node)}
          color="#ffffff"
          weight={2}
          fillOpacity={0.8}
          eventHandlers={{
            click: () => onNodeClick(node),
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{node.id}</p>
              <p>{node.name}</p>
              <p className="text-xs text-gray-500">{node.type}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;
