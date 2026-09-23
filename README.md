# GIULIA

**Geological Interactive Universe of Life in Ages**

GIULIA is an interactive web platform for exploring geological time, organisms, fossil occurrences, paleontological data, and paleogeographic reconstructions.

## Live Application

https://giulia-ashy.vercel.app

## About

GIULIA organizes geological and paleontological exploration around the geological time scale.

The main navigation hierarchy is:

```text
Eon
 ↓
Era
 ↓
Period
 ↓
Epoch / Series
```

From geological time, users can continue exploring organisms, fossil occurrences, interval dossiers, and paleogeographic reconstructions.

## Main Features

- Hierarchical geological timeline
- Geological interval atlas
- Organism explorer
- Paleobiology Database (PBDB) fossil occurrence search
- Interactive fossil occurrence maps
- Individual fossil occurrence pages
- GPlates paleogeographic reconstruction
- Global search
- Research Workspace
- Notes and comparison tools
- JSON and CSV export

## Scientific Sources

GIULIA currently integrates or references:

- International Commission on Stratigraphy (ICS)
- Paleobiology Database (PBDB)
- GPlates Web Service

## Scientific Interpretation

PBDB occurrence records should not be interpreted directly as biological abundance. The fossil record is affected by preservation, collection, sampling, publication, and digitization biases.

PBDB coordinates represent present-day fossil locality coordinates.

Paleogeographic positions shown by PaleoEarth are model-dependent reconstructions and are not directly observed historical coordinates.

## Technology

- Next.js
- React
- TypeScript
- Leaflet
- Node.js
- Vercel

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
```

## Deployment

The source code is hosted on GitHub and production deployments are handled automatically by Vercel.

```text
Local Development
      ↓
GitHub
      ↓
main
      ↓
Vercel
      ↓
GIULIA Production
```

Production:

https://giulia-ashy.vercel.app

## Current Version

**GIULIA v1.2**

Current functionality includes:

- expanded geological time scale;
- navigation through eons, eras, periods, and epochs/series;
- geological interval dossiers;
- organism explorer;
- PBDB integration;
- GPlates integration;
- Research Workspace;
- public deployment.

## Status

GIULIA is currently an experimental academic and scientific exploration platform under active development.