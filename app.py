from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/cards")
def cards():
    return render_template("cards.html")


@app.route("/settings")
def settings():
    return render_template("settings.html")


@app.route("/battle")
def battle():
    return render_template("battle.html")


if __name__ == "__main__":
    app.run(debug=True)