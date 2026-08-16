# 🔍 Semantic Search Engine Controller
# File: D:\DA + DE\PYTHON_PROJECTS\05_semantic_search\search_engine.py
from sentence_transformers import SentenceTransformer
from vector_numpy import np_cosine_similarity
import numpy as np

class SemanticSearchEngine:
    def __init__(self, model_name="all-MiniLM-L6-v2"):
        print("Loading local Transformer model (all-MiniLM-L6-v2)...")
        # Load the sentence transformer model
        self.model = SentenceTransformer(model_name)
        self.corpus = []
        self.corpus_embeddings = None

    def index_corpus(self, sentences):
        """
        Encodes the database sentences into vector embeddings.
        """
        self.corpus = sentences
        print(f"Generating embeddings for {len(sentences)} corpus sentences...")
        # Encode all sentences into vector embeddings (returns a list/array of vectors)
        self.corpus_embeddings = self.model.encode(sentences)
        print("Indexing completed!")

    def search(self, query, top_k=3):
        """
        Encodes the user query and searches the corpus using Cosine Similarity.
        Returns a list of tuples: (sentence, similarity_score)
        """
        # 1. Encode the query into a single vector
        query_embedding = self.model.encode(query)
        
        results = []
        
        # 2. Loop through all indexed sentences and their embeddings
        for i, sentence in enumerate(self.corpus):
            sentence_emb = self.corpus_embeddings[i]
            
            similarity_score = np_cosine_similarity(query_embedding, sentence_emb)
            
            # Append result
            results.append((sentence, similarity_score))
            
        # 3. Sort the results in descending order based on the similarity score
        results.sort(key=lambda x: x[1], reverse=True)
        sorted_results = results
        
        # Return only the top_k results
        return sorted_results[:top_k]

if __name__ == "__main__":
    # Test database of sentences
    database_sentences = [
        "The cat is sleeping peacefully on the sofa.",
        "A black dog is barking loudly at the mailman.",
        "I love building web APIs and coding in Python.",
        "FastAPI is a high-performance web framework for Python.",
        "Database integrity is protected by strict relational schemas.",
        "SQL queries allow you to select, insert, and update database rows.",
        "Neural networks use vector operations and math to learn patterns.",
        "Gradient descent is an optimization algorithm used to train AI models."
    ]
    
    # Initialize engine
    engine = SemanticSearchEngine()
    engine.index_corpus(database_sentences)
    
    print("\n--- Semantic Search Ready ---")
    while True:
        query = input("\nEnter search query (or type 'exit'): ").strip()
        if query.lower() == 'exit':
            break
        if not query:
            continue
            
        matches = engine.search(query, top_k=3)
        print(f"\nTop Matches for '{query}':")
        for rank, (sentence, score) in enumerate(matches, 1):
            print(f"{rank}. [Score: {score*100:.1f}%] {sentence}")
