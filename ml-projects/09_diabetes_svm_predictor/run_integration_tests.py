# Automated API Integration Test Runner (Socket Port Checking - No Emojis)
# File: D:\DA + DE\PYTHON_PROJECTS\09_diabetes_svm_predictor\run_integration_tests.py
import subprocess
import time
import sys
import os
import socket

def is_port_open(host="127.0.0.1", port=8000) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.connect((host, port))
            return True
        except (ConnectionRefusedError, TimeoutError):
            return False

def main():
    print("Starting FastAPI server via Uvicorn...")
    proj_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Launch uvicorn as a background process
    server_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=proj_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    
    # Poll socket port 8000 until it starts accepting connections
    print("Waiting for server socket on port 8000...")
    started = False
    timeout = 10  # 10 seconds timeout
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        if is_port_open("127.0.0.1", 8000):
            started = True
            break
        if server_process.poll() is not None:
            print("Error: Uvicorn process terminated unexpectedly.")
            break
        time.sleep(0.2)
            
    if not started:
        print("Error: Server failed to start and open port 8000 within timeout.")
        server_process.terminate()
        server_process.wait()
        return
        
    print("Server is listening on port 8000! Executing test_api.py...")
    test_result = subprocess.run(
        [sys.executable, "test_api.py"],
        cwd=proj_dir,
        capture_output=True,
        text=True
    )
    
    print("\n=== Integration Test Results ===")
    print(test_result.stdout)
    if test_result.stderr:
        print("Error:", test_result.stderr)
    print("================================\n")
    
    print("Shutting down FastAPI server...")
    server_process.terminate()
    try:
        server_process.wait(timeout=5)
        print("Server successfully stopped.")
    except subprocess.TimeoutExpired:
        server_process.kill()
        print("Server process force-killed.")
    print("Done!")

if __name__ == "__main__":
    main()
