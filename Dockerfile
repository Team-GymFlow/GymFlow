# ===== BUILD STAGE =====
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
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
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "API.dll"]
