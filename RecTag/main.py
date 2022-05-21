from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
import numpy as np
import pandas as pd
from difflib import SequenceMatcher


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


def Recommend_tags(text):
    df = pd.read_csv("./Taglist.csv")
    pd.DataFrame(df)
    X = df['tag_name']
    similarity = []
    for i in X:
        similarity.append([similar(i.lower(), text.lower()), i])
    similarity.sort()
    similarity.reverse()
    listoftags = np.array(similarity[0:15])
    return listoftags[:, 1].tolist()


@app.route("/<tag>")
def Tags(tag):
    return jsonify(Recommend_tags(tag))
