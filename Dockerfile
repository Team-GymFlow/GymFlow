# ===== BUILD STAGE =====
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Backend/Backend.sln ./Backend.sln
COPY Backend/Application/Application.csproj Application/
COPY Backend/Infrastructure/Infrastructure.csproj Infrastructure/
COPY Backend/Domain/Domain.csproj Domain/
COPY Backend/API/API.csproj API/

RUN dotnet restore Backend.sln

COPY Backend/. .

WORKDIR /src/API
RUN dotnet publish -c Release -o /app/publish /p:DebugType=none /p:DebugSymbols=false

# ===== RUNTIME STAGE =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim
WORKDIR /app

COPY --from=build /app/publish .

# Aggressive memory optimization for 512MB free tier
ENV ASPNETCORE_URLS=http://+:8080
ENV DOTNET_gcServer=0
ENV DOTNET_GCConserveMemory=9
ENV DOTNET_EnableDiagnostics=0
ENV DOTNET_TC_QuickJitForLoops=1
ENV DOTNET_ReadyToRun=0
EXPOSE 8080

ENTRYPOINT ["dotnet", "API.dll"]
