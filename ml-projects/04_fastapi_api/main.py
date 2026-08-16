# 🌐 FastAPI Task API Backend
# File: D:\DA + DE\PYTHON_PROJECTS\04_fastapi_api\main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import init_db, get_tasks, add_task, complete_task, delete_task

app = FastAPI(title="Task Management API")

# Initialize the database table when the web server starts up
@app.on_event("startup")
def on_startup():
    init_db()

# Column B: Pydantic Validation Schema (The Gatekeeper)
class TaskCreate(BaseModel):
    title: str

# Column C: HTTP API Endpoints (The Routes)

@app.get("/tasks")
def read_tasks():
    return get_tasks()

@app.post("/tasks")
def create_task(task: TaskCreate):
    add_task(task.title)
    return {"message": "Task added successfully"}

@app.put("/tasks/{task_id}")
def update_task(task_id: int):
    complete_task(task_id)
    return {"message": "Task marked as completed"}

@app.delete("/tasks/{task_id}")
def remove_task(task_id: int):
    delete_task(task_id)
    return {"message": "Task deleted successfully"}
