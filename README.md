# Slot App 🎰

## Overview
A slot machine application.


## Running the Application

The application is designed to be started with **Docker Compose**.  
From the root of the project, run:

```bash
docker-compose up
```

Visit **localhost** slot page for rolling your fortune =)

## Requirements
- **Node.js** version **22.19** (required for development)


## Configuration

Both **frontend** and **backend** have `.env.example` files.  
For running do not need to copping this files.
Spin cost and free credits could be configured in a backend env file.
To start development, copy these files to `.env` in their respective directories:
```bash
# For frontend
cp packages/slot-frontend/.env.example packages/slot-frontend/.env

# For backend
cp packages/slot-server/.env.example packages/slot-server/.env

```

Slot size could be configured and timing of responsibility, look at frontend config