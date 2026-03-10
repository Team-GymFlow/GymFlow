# ===== BUILD STAGE =====
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

# Copy solution
COPY Backend/Backend.sln ./Backend.sln

# Copy project files
COPY Backend/Application/Application.csproj Application/
COPY Backend/Infrastructure/Infrastructure.csproj Infrastructure/
COPY Backend/Domain/Domain.csproj Domain/
COPY Backend/API/API.csproj API/

# Restore dependencies
RUN dotnet restore Backend.sln

# Copy everything else
COPY Backend/. .

# Build API
WORKDIR /src/API
RUN dotnet publish -c Release -o /app/publish

# ===== RUNTIME STAGE =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /app

COPY --from=build /app/publish .

# Memory optimization for Render free tier (512MB)
ENV ASPNETCORE_URLS=http://+:8080
ENV DOTNET_gcServer=0
ENV DOTNET_GCHeapHardLimit=0x10000000
EXPOSE 8080

ENTRYPOINT ["dotnet", "API.dll"]
