import joblib
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from thefuzz import process
import sys
import json

try:
    print("Starting recommend.py")
    # Load the saved objects
    print("Loading tfidf_vectorizer.pkl, tfidf_matrix.pkl, and reduced_books_df.pkl")
    tfidf = joblib.load('tfidf_vectorizer.pkl')
    tfidf_matrix = joblib.load('tfidf_matrix.pkl')
    reduced_df = pd.read_pickle('reduced_books_df.pkl')

    def get_author_recommendations(author_name, top_k=5):
        author_books = reduced_df[reduced_df['author'].str.lower() == author_name.lower()]
        if author_books.empty:
            return {'error': f"No books found for author: {author_name}"}
        author_books = author_books.drop_duplicates(subset='title')
        return author_books.sort_values(by=['reviews', 'rating'], ascending=False).head(top_k)[
            ['title', 'author', 'rating', 'img', 'reviews', 'genre']
        ].to_dict(orient='records')

    def get_best_title_match(query, titles, threshold=70):
        match, score = process.extractOne(query, titles)
        return match if score >= threshold else None

    def get_recommendations(query_title, top_k=5):
        match = get_best_title_match(query_title, reduced_df['title'].tolist())
        if not match:
            return {'error': f"No matching book title found for: {query_title}"}
        idx = reduced_df[reduced_df['title'] == match].index[0]
        cosine_sim = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()
        similar_indices = cosine_sim.argsort()[-top_k-1:-1][::-1]
        return reduced_df.iloc[similar_indices][
            ['title', 'author', 'rating', 'img', 'reviews', 'genre']
        ].to_dict(orient='records')

    # Read input data from command line
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No input data provided'}))
        sys.exit(1)

    print("Raw input args:", sys.argv[1])
    try:
        input_data = json.loads(sys.argv[1])
    except json.JSONDecodeError as e:
        print(json.dumps({'error': f'Invalid JSON input: {str(e)}'}))
        sys.exit(1)
    print("Parsed input:", input_data)

    # Validate input
    if 'type' not in input_data or 'query' not in input_data:
        print(json.dumps({'error': 'Missing type or query field'}))
        sys.exit(1)
    if input_data['type'] not in ['title', 'author']:
        print(json.dumps({'error': f"Invalid type: {input_data['type']}. Must be 'title' or 'author'"}))
        sys.exit(1)

    # Process query
    top_k = input_data.get('top_k', 5)
    if input_data['type'] == 'title':
        result = get_recommendations(input_data['query'], top_k)
    else:
        result = get_author_recommendations(input_data['query'], top_k)

    # Output result
    print(json.dumps({'recommendations': result}))

except Exception as e:
    print(json.dumps({'error': str(e)}))
    sys.exit(1)