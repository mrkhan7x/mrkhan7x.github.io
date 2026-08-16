# 📋 CLI Task Organizer — Level 2 Project
# File: D:\DA + DE\PYTHON_PROJECTS\02_task_manager\tasks.py
import json
import os

# Class 1: The Blueprint for a Single Task
class Task:
    def __init__(self, title, completed=False):
        self.title = title
        self.completed = completed

    def to_dict(self):
        return {
            "title": self.title,
            "completed": self.completed
        }

# Class 2: The Manager that handles tasks list and file storage
class TaskManager:
    def __init__(self, filename="tasks.json"):
        self.filename = filename
        self.tasks = []
        self.load_tasks()

    def load_tasks(self):
        if os.path.exists(self.filename):
            try:
                with open(self.filename, "r") as f:
                    data = json.load(f)
                for item in data:
                    rebuilt_task = Task(item["title"], item["completed"])
                    self.tasks.append(rebuilt_task)
            except Exception as e:
                print(f"Error loading tasks: {e}")
                self.tasks = []

    def save_tasks(self):
        dict_list = []
        for task in self.tasks:
            dict_list.append(task.to_dict())
            
        with open(self.filename, "w") as f:
            json.dump(dict_list, f, indent=4)

    def add_task(self, title):
        new_task = Task(title)
        self.tasks.append(new_task)
        self.save_tasks()
        print(f"[OK] Added task: '{title}'")

    def list_tasks(self):
        if not self.tasks:
            print("No tasks found.")
            return
        for i, task in enumerate(self.tasks, 1):
            status = "[x]" if task.completed else "[ ]"
            print(f"{i}. {status} {task.title}")

    def complete_task(self, index):
        if 0 <= index < len(self.tasks):
            self.tasks[index].completed = True
            self.save_tasks()
            print(f"[OK] Marked task as completed: '{self.tasks[index].title}'")
        else:
            print("Invalid task number.")

def main():
    manager = TaskManager()
    
    while True:
        print("\n=== Tasks Menu ===")
        print("1. Add Task")
        print("2. List Tasks")
        print("3. Complete Task")
        print("4. Exit")
        
        choice = input("Choose an option: ").strip()
        
        if choice == "1":
            title = input("Enter task title: ").strip()
            if title:
                manager.add_task(title)
        elif choice == "2":
            manager.list_tasks()
        elif choice == "3":
            manager.list_tasks()
            try:
                idx = int(input("Enter task number to complete: ")) - 1
                manager.complete_task(idx)
            except ValueError:
                print("Please enter a valid number.")
        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
