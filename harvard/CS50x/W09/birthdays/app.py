import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Set a secret key for session management
app.config["SECRET_KEY"] = "tonto_quien_lo_lea"


# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///birthdays.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form.get("name")
        month = request.form.get("month")
        day = request.form.get("day")

        if not name:
            flash("Name is required!")
            return redirect("/")
        if not month:
            flash("Month is required!")
            return redirect("/")
        if not day:
            flash("Day is required!")
            return redirect("/")

        try:
            month = int(month)
        except ValueError:
            flash("Invalid month!")
            return redirect("/")
        if month < 1 or month > 12:
            flash("Month must be between 1 and 12!")
            return redirect("/")

        try:
            day = int(day)
        except ValueError:
            flash("Invalid day!")
            return redirect("/")
        if day < 1 or day > 31:
            flash("Day must be between 1 and 31!")
            return redirect("/")

        # Add the user's entry into the database
        db.execute("INSERT INTO birthdays (name, month, day) VALUES (?, ?, ?)", name, month, day)
        return redirect("/")

    else:
        # Display the entries in the database on index.html
        birthdays = db.execute("SELECT * FROM birthdays ORDER BY month, day")
        return render_template("index.html", birthdays=birthdays)
