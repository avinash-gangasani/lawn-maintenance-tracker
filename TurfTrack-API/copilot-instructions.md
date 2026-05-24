# Project Manifest: .NET Backend Web API

## System Overview
This is the core REST API backend for the Lawn Maintenance Reminder Application. It serves as the secure data coordinator, executing user authentication validation, geographic coordination mapping via Google Maps Platform APIs, weather engine retrieval, and time-sensitive background job notifications.

## Technical Configuration
- **Runtime Stack:** .NET 10.0 Web API
- **Framework Pattern:** Clean Architecture / Modular Controller-Based API
- **Security Protocols:** JWT Bearer Token validation, Google Token verification (`Google.Apis.Auth`)
- **Data Serialization Engine:** System.Text.Json

## Workspace Directory Blueprint
All code generation must align tightly with this project topology:
- `App/Controllers/`      # REST HTTP Endpoint Entry Points
- `App/Models/`           # Data Transfer Objects (DTOs), Request/Response contracts
- `App/Services/`         # Concrete implementations (Weather clients, Google Geocoding, Auth logic)
- `App/Interfaces/`       # Decoupled abstractions (`IWeatherService`, `IGoogleMapsClient`)
- `App/Data/`             # Database context mapping and entities
- `App/Configuration/`    # Strictly typed options classes (mapping `appsettings.json`)

## Core Execution Tasks
- **Build Solution:** `dotnet build`
- **Run API Locally:** `dotnet run --project App`
- **Execute Unit Tests:** `dotnet test`