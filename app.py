from flask import Flask, render_template, request
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("RAPIDAPI_KEY")

@app.route("/", methods=["GET", "POST"])
def home():

    result = None
    error = None

    if request.method == "POST":

        pnr = request.form["pnr"]

        url = "https://irctc1.p.rapidapi.com/api/v3/getPNRStatus"

        headers = {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "irctc1.p.rapidapi.com"
        }

        params = {
            "pnrNumber": pnr
        }

        
        response = requests.get(url, headers=headers, params=params)
                
        data = response.json()

        if data.get("status"):
            result = data["data"]
        else:
            error = data.get("message")

    return render_template(
        "index.html",
        result=result,
        error=error
    )

if __name__ == "__main__":
    app.run(debug=True)