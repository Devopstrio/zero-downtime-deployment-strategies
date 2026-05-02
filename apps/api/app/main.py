from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.strategies.engine import DeploymentEngine, TrafficEngine, HealthEngine, RollbackEngine

app = FastAPI(title="Zero Downtime Deployment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

deployer = DeploymentEngine()
traffic = TrafficEngine()
health = HealthEngine()
rollback = RollbackEngine()

@app.get("/health")
def api_health():
    return {"status": "ok", "service": "zero-downtime-deployment"}

@app.post("/deploy")
def start_deployment(data: dict = Body(...)):
    strategy = data.get("strategy", "BLUE_GREEN")
    app_name = data.get("app", "core-api")
    version = data.get("version", "v1.3.0")
    
    if strategy == "CANARY":
        dep_id = deployer.canary_deploy(app_name, version)
    else:
        dep_id = deployer.blue_green_deploy(app_name, version)
        
    return {"deployment_id": dep_id, "strategy": strategy, "status": "STARTED"}

@app.get("/deployments")
def list_deployments():
    return {"deployments": deployer.deployments}

@app.post("/traffic/split")
def split_traffic(data: dict = Body(...)):
    dep_id = data.get("deployment_id")
    new_split = data.get("split")
    return traffic.shift_traffic(dep_id, new_split)

@app.get("/dashboard/summary")
def get_summary():
    return {
        "active_deployments": len(deployer.deployments),
        "success_rate": 0.9992,
        "avg_rollout_time_min": 12.5,
        "system_health": "OPTIMAL"
    }

@app.get("/metrics")
def get_metrics():
    return {
        "global_error_rate": 0.02,
        "deployment_velocity": 4.2,
        "rollback_frequency": 0.05
    }
