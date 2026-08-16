# 🗄️ Database Layer (SQLite Controller)
# File: D:\DA + DE\PYTHON_PROJECTS\04_fastapi_api\database.py
import sqlite3
import os

DB_NAME = "tasks.db"

def get_db_connection():
    """
    Establishes a connection to the SQLite database.
    Configures row factory to return dictionaries instead of tuples.
    """
    conn = sqlite3.connect(DB_NAME)
    # This line makes sqlite3 return results as dictionaries (like {"id": 1, "title": "Buy milk"})
    # instead of raw tuples (like (1, "Buy milk", 0)).
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """
    Creates the 'tasks' table if it does not exist.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )"""
    cursor.execute(query)
    conn.commit()
    conn.close()

def get_tasks():
    """
    Retrieves all tasks from the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()    
    tasks = [dict(row) for row in rows]
    conn.close()
    return tasks

def add_task(title):
    """
    Inserts a new task into the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO tasks (title) VALUES (?)", (title,))
    conn.commit()
    conn.close()

def complete_task(task_id):
    """
    Marks a specific task as completed in the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET completed = 1 WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()

def delete_task(task_id):
    """
    Deletes a specific task from the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
