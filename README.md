# Global & OIC Digital Economy Dashboard

An interactive React dashboard visualizing digital economy indices for 197 countries and OIC member states across multiple dimensions.

## Features

- **Global Digital Economy Index (GDEI)** - 197 countries across 9 pillars
- **Islamic Digital Economy Index (IDEI)** - OIC member states with 1,009 sub-indicators
- **Interactive Visualizations** - Bar charts, radar charts, scatter plots, and geographic analysis
- **Multi-country Comparisons** - Compare countries side-by-side
- **Regional Analysis** - Break down data by geographic region
- **Pillar Deep Dives** - Explore individual indicator performance

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Recharts** - Chart visualizations
- **D3.js** - Geospatial data handling
- **CSS-in-JS** - Inline styling

## Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn

### Installation

```bash
cd dashboard-app
npm install
```

### Development

```bash
npm run dev
```

Server runs at `http://localhost:3000`

### Build

```bash
npm run build
```

## Data Sources

The dashboard integrates data from 15+ international sources:
- ITU (International Telecommunication Union)
- World Bank
- UN DESA / UN EGDI
- UNCTAD
- UNESCO
- WIPO
- ILO
- And more...

## Project Structure

```
dashboard-app/
├── src/
│   ├── App.jsx           # Main dashboard component
│   └── main.jsx          # React entry point
├── public/
│   └── index.html        # HTML template
├── index.html            # Root HTML (Vite)
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies
└── README.md
```

## Contributing

Feel free to submit issues or pull requests.

## License

Open source project for research and educational purposes.
# digital-economy-dashboard
