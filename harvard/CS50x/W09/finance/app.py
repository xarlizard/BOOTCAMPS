import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set a secret key for session management
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY") or "your_secret_key_here"

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


def init_db():
    with app.app_context():
        try:
            db.execute("SELECT 1 FROM transactions LIMIT 1")
        except RuntimeError:
            db.execute("""
                CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    user_id INTEGER NOT NULL,
                    symbol TEXT NOT NULL,
                    shares INTEGER NOT NULL,
                    price NUMERIC NOT NULL,
                    type TEXT NOT NULL,
                    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            db.execute("""
                CREATE INDEX IF NOT EXISTS idx_user_id ON transactions (user_id)
            """)
            db.execute("""
                CREATE INDEX IF NOT EXISTS idx_symbol ON transactions (symbol)
            """)
            print("Transactions table created.")


# Initialize the database when the app starts
init_db()


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    user_id = session["user_id"]
    portfolio = db.execute("""
        SELECT symbol, SUM(shares) as total_shares
        FROM transactions
        WHERE user_id = ?
        GROUP BY symbol
        HAVING SUM(shares) > 0
    """, user_id)

    stocks = []
    total_portfolio_value = 0
    for item in portfolio:
        stock = lookup(item["symbol"])
        if stock:
            shares = item["total_shares"]
            price = stock["price"]
            total_value = shares * price
            stocks.append({
                "symbol": stock["symbol"],
                "name": stock["name"],
                "shares": shares,
                "price": price,
                "total_value": total_value
            })
            total_portfolio_value += total_value

    cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)[0]["cash"]
    grand_total = total_portfolio_value + cash

    return render_template("index.html", stocks=stocks, cash=usd(cash), grand_total=usd(grand_total))


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        shares_str = request.form.get("shares")

        if not symbol:
            return apology("must provide symbol", 400)
        stock = lookup(symbol)
        if not stock:
            return apology("invalid symbol", 400)

        try:
            shares = int(shares_str)
            if shares <= 0:
                return apology("shares must be a positive integer", 400)
        except ValueError:
            return apology("shares must be an integer", 400)

        user_id = session["user_id"]
        cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)[0]["cash"]
        price = stock["price"]
        cost = price * shares

        if cash < cost:
            return apology("can't afford", 400)

        db.execute("UPDATE users SET cash = cash - ? WHERE id = ?", cost, user_id)
        db.execute("INSERT INTO transactions (user_id, symbol, shares, price, type) VALUES (?, ?, ?, ?, ?)",
                   user_id, stock["symbol"], shares, price, 'buy')

        flash(f"Bought {shares} shares of {stock['symbol']} at {usd(price)}!")
        return redirect("/")
    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    user_id = session["user_id"]
    transactions = db.execute(
        "SELECT * FROM transactions WHERE user_id = ? ORDER BY time DESC", user_id)
    return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        if not symbol:
            return apology("must provide symbol", 400)
        stock = lookup(symbol)
        if not stock:
            return apology("invalid symbol", 400)
        return render_template("quoted.html", stock=stock)
    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if not username:
            return apology("must provide username", 400)
        elif not password:
            return apology("must provide password", 400)
        elif password != confirmation:
            return apology("passwords must match", 400)

        try:
            hash = generate_password_hash(password)
            db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash)
            return redirect("/login")
        except ValueError:
            return apology("username already exists", 400)
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    user_id = session["user_id"]

    if request.method == "POST":
        symbol = request.form.get("symbol")
        shares_str = request.form.get("shares")

        if not symbol:
            return apology("must provide symbol", 400)

        try:
            shares = int(shares_str)
            if shares <= 0:
                return apology("shares must be a positive integer", 400)
        except ValueError:
            return apology("shares must be an integer", 400)

        owned_shares = db.execute("""
            SELECT SUM(shares) as total_shares
            FROM transactions
            WHERE user_id = ? AND symbol = ?
            GROUP BY symbol
        """, user_id, symbol)

        if not owned_shares or owned_shares[0]["total_shares"] < shares:
            return apology("not enough shares", 400)

        stock = lookup(symbol)
        if not stock:
            return apology("invalid symbol", 400)

        price = stock["price"]
        proceeds = price * shares

        db.execute("UPDATE users SET cash = cash + ? WHERE id = ?", proceeds, user_id)
        db.execute("INSERT INTO transactions (user_id, symbol, shares, price, type) VALUES (?, ?, ?, ?, ?)",
                   user_id, stock["symbol"], -shares, price, 'sell')

        flash(f"Sold {shares} shares of {stock['symbol']} at {usd(price)}!")
        return redirect("/")
    else:
        stocks = db.execute("""
            SELECT symbol
            FROM transactions
            WHERE user_id = ?
            GROUP BY symbol
            HAVING SUM(shares) > 0
        """, user_id)
        return render_template("sell.html", stocks=stocks)


@app.route("/change_password", methods=["GET", "POST"])
@login_required
def change_password():
    """Allow users to change their passwords."""
    if request.method == "POST":
        old_password = request.form.get("old_password")
        new_password = request.form.get("new_password")
        confirmation = request.form.get("confirmation")
        user_id = session["user_id"]

        if not old_password:
            return apology("must provide old password", 400)
        elif not new_password:
            return apology("must provide new password", 400)
        elif new_password != confirmation:
            return apology("new passwords must match", 400)

        rows = db.execute("SELECT hash FROM users WHERE id = ?", user_id)
        if not rows or not check_password_hash(rows[0]["hash"], old_password):
            return apology("invalid old password", 400)

        hash = generate_password_hash(new_password)
        db.execute("UPDATE users SET hash = ? WHERE id = ?", hash, user_id)
        flash("Password changed successfully!")
        return redirect("/")
    else:
        return render_template("change_password.html")
