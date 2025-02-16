# Flight Route Visualizer

A real-time aviation route visualization system that implements Dijkstra's algorithm and BFS for optimal route finding between airports. The system focuses on visualizing the pathfinding process and simulating aircraft movement along the selected routes.

## Features

- Interactive visualization of aviation routes and waypoints
- Real-time pathfinding using Dijkstra's algorithm and BFS
- Animated visualization of the pathfinding process
- Aircraft movement simulation along calculated routes
- Support for ICAO airport codes and aviation waypoints
- Focus on Morocco's airspace with extensibility to other regions

## Tech Stack

### Backend
- C++ for core algorithms and server
- cpprestsdk for HTTP server and REST API
- CSR (Compressed Sparse Row) graph implementation for efficient in-memory storage

### Frontend
- Next.js for the web interface
- Real-time visualization and animations
- Interactive map interface

## Prerequisites

```bash
# For Fedora/RHEL based systems
sudo dnf install -y gcc-c++ boost-devel openssl-devel cpprest-devel
```

## Project Structure

```
  backend/
  ├── src/
  │   ├── main.cpp              # Server entry point
  │   ├── graph/                # Graph and pathfinding implementations
  │   ├── server/               # HTTP server and API handlers
  │   └── utils/                # Data loading and utility functions
  ├── data/
  │   ├── waypoints.csv         # Aviation waypoint data
  │   └── airports.json         # Airport information
  frontend/flight-route-visualizer                 # Next.js frontend
```

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/aymanamkassou/flight-route-visualizer.git
cd flight-route-visualizer
```

2. Compile the server:
```bash
g++ -std=c++17 -Wall -O2 -I. -Isrc src/*.cpp src/graph/*.cpp src/server/*.cpp src/utils/*.cpp -o aviation-server -lcpprest -lssl -lcrypto -lboost_system -pthread -fpermissive
```

3. Run the server:
```bash
./aviation-server
```

The server will start on `http://localhost:3001`

## API Endpoints

### GET /api/graph
Returns the complete graph visualization data including airports, waypoints, and their connections.

### POST /api/find-path
Finds the optimal path between two points using the specified algorithm.

Request body:
```json
{
    "start": "GMMN",    // Starting airport/waypoint ICAO code
    "end": "GMME",      // Destination airport/waypoint ICAO code
    "algorithm": "dijkstra"  // Either "dijkstra" or "bfs"
}
```

Response includes:
- Complete path
- Total distance
- Step-by-step algorithm visualization data

## Data Format

### Waypoints CSV Format
```csv
COUNTRY_CODE,COUNTRY_NAME,IDENT,LATITUDE,LONGITUDE
MA,Morocco,ADV03,24.388561,54.716811
```

### Airports JSON Format
```json
{
    "GMMN": {
        "icao": "GMMN",
        "iata": "CMN",
        "name": "Mohammed V International Airport",
        "city": "Casablanca",
        "country": "MA",
        "elevation": 656,
        "lat": 33.3675,
        "lon": -7.5897
    }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Airport data sourced from public aviation databases
- Waypoint information based on official aviation navigation data
