# CLAUDE.md - Backend Agent Profile & Style Rules

## System Overview & Tech Stack
- **Project:** Lawn Maintenance Reminder Engine (.NET Web API)
- **Target Platform:** .NET 10 (C# 14 features allowed)
- **Primary Libraries:** Microsoft.AspNetCore.Authentication.JwtBearer, Google.Apis.Auth

## C# Coding Standards & Guidelines
- **Architecture:** Enforce SOLID and DRY principles rigorously. Keep controllers thin; execute all business workflows inside the Service layer via Interfaces to preserve high cohesion.
- **Asynchronous Execution:** Every endpoint, database query, and network call must use `async` and `await` natively. Append `Async` to all asynchronous method signatures.
- **Type Strategy:** Utilize strong typing. Map API payloads to targeted Request/Response DTO models inside `App/Models/`—never expose entity layer structures directly over HTTP.
- **Null Safety:** Leverage C# nullable reference types (`#enable`). Explicitly declare potential null states.
- **Dependency Injection:** Register all services via interface contracts inside `Program.cs`. Always inject dependencies into class constructor parameters using private readonly fields.
- **Error Scoping:** Use global exception handling middleware to catch unhandled anomalies. Wrap network endpoints with typed try/catch blocks only to handle contextual failures, returning clean `ProblemDetails` responses.

## Secure API Integration Mandates
- **Secret Separation:** Never write or emit hardcoded string credentials, API keys, or JWT tokens inside source files.
- **Configuration Management:** Map configurations using the Options Pattern (`IOptions<GoogleMapsOptions>`). Retrieve configuration settings safely from environment blocks or user secrets.
- **HTTP Mechanics:** Access all third-party endpoints using unified instances provided via `IHttpClientFactory` to protect against socket depletion anomalies.

## Verification & Build Commands
- **Compile Verification:** `dotnet build`
- **Active Hot-Reload Execution:** `dotnet watch run --project App`