# 📐 Vector Math Engine (Raw Python - Lists & Loops Only)
# File: D:\DA + DE\PYTHON_PROJECTS\05_semantic_search\vector_math.py
import math

def dot_product(v1, v2):
    """
    Calculates the dot product of two vectors of equal length.
    Dot Product = (v1[0]*v2[0]) + (v1[1]*v2[1]) + ...
    """
    sum_val = 0
    for i in range(len(v1)):
        sum_val += v1[i] * v2[i]
    return sum_val

def magnitude(v):
    """
    Calculates the magnitude (length) of a single vector.
    Magnitude = sqrt(v[0]^2 + v[1]^2 + ...)
    """
    return math.hypot(*v)

def cosine_similarity(v1, v2):
    """
    Calculates the cosine similarity between two vectors.
    Formula: dot_product(v1, v2) / (magnitude(v1) * magnitude(v2))
    """
    dot_prod = dot_product(v1, v2)
    mag1 = magnitude(v1)
    mag2 = magnitude(v2)
    if mag1 == 0 or mag2 == 0:
        return 0
    return dot_prod / (mag1 * mag2)

if __name__ == "__main__":
    # Test vectors
    vec1 = [1.0, 2.0, 3.0]
    vec2 = [4.0, 5.0, 6.0]
    
    print("=== Testing Raw Vector Math ===")
    print(f"Vector 1: {vec1}")
    print(f"Vector 2: {vec2}")
    print(f"Dot Product: {dot_product(vec1, vec2)}")
    print(f"Magnitude 1: {magnitude(vec1):.4f}")
    print(f"Magnitude 2: {magnitude(vec2):.4f}")
    print(f"Cosine Similarity: {cosine_similarity(vec1, vec2):.6f}")
