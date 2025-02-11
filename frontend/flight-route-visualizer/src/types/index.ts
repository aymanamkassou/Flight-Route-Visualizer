export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Node {
  id: string;  // ICAO code for airports (e.g., GMMN) or waypoint identifier
  name: string;
  type: 'airport' | 'waypoint';
  coordinates: Coordinates;
}

export interface Route {
  from: Node;
  to: Node;
  distance: number;
}

export interface AlgorithmStep {
  currentNode: string;
  visitedNodes: string[];
  frontier: string[];
  distances: Record<string, number>;
  previousNodes: Record<string, string>;
}

export interface PathResult {
  path: string[];
  totalDistance: number;
  steps: AlgorithmStep[];
}
