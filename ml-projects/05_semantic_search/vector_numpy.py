# 🚀 Vector Math Engine (Optimized with NumPy)
# File: D:\DA + DE\PYTHON_PROJECTS\05_semantic_search\vector_numpy.py
import numpy as np
import time
# Import our raw Python functions to compare speed
from vector_math import dot_product as raw_dot_product

def np_dot_product(v1, v2):
    """
    Calculates the dot product of two arrays using NumPy.
    """
    return np.dot(v1, v2)

def np_magnitude(v):
    """
    Calculates the magnitude of an array using NumPy Linear Algebra norm.
    """
    return np.linalg.norm(v)

def np_cosine_similarity(v1, v2):
    """
    Calculates the cosine similarity using NumPy.
    """
    similarity = np_dot_product(v1, v2) / (np_magnitude(v1) * np_magnitude(v2))
    return similarity

if __name__ == "__main__":
    # Let's create two massive vectors (100,000 coordinates!) to benchmark speed
    print("Generating two massive 100,000-dimensional vectors...")
    size = 100000
    vec1 = np.random.rand(size)
    vec2 = np.random.rand(size)
    
    # Convert them to raw Python lists for the raw math test
    list1 = vec1.tolist()
    list2 = vec2.tolist()
    
    print("\n--- Benchmarking Dot Product ---")
    
    # 1. Benchmark Raw Python Loops
    start = time.perf_counter()
    raw_res = raw_dot_product(list1, list2)
    raw_time = time.perf_counter() - start
    print(f"Raw Python loop time: {raw_time:.6f} seconds")
    
    # 2. Benchmark NumPy Vectorization
    start = time.perf_counter()
    np_res = np_dot_product(vec1, vec2)
    np_time = time.perf_counter() - start
    print(f"NumPy vectorized time: {np_time:.6f} seconds")
    
    # 3. Speedup Calculation
    speedup = raw_time / np_time
    print(f"NumPy Speedup: {speedup:.2f}x faster!")
    print(f"Results match: {abs(raw_res - np_res) < 1e-9}")
