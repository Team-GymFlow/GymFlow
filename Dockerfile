# ===== BUILD STAGE =====
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution
COPY Backend.sln ./

# Copy project files (KORRIGERADE PATHS)
COPY Backend/Application/Application.csproj Backend/Application/
COPY Backend/Infrastructure/Infrastructure.csproj Backend/Infrastructure/
COPY Backend/Domain/Domain.csproj Backend/Domain/
COPY Backend/API/API.csproj Backend/API/

# Restore dependencies
RUN dotnet restore

# Copy everything else
COPY . .

# Build API
WORKDIR /src/Backend/API
RUN dotnet publish -c Release -o /app/publish

# ===== RUNTIME STAGE =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "API.dll"]
