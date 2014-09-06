from flask import render_template
from flask import Flask
import sqlite3

conn = sqlite3.connect('data.db')
app = Flask(__name__)
c = conn.cursor()
if c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='data'").fetchone() is None:
    c.execute("CREATE TABLE data (value TEXT)")
    conn.commit()
conn.close()

@app.route('/<int:number>')
def index(number=1):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.executemany("INSERT INTO data VALUES (?)",   [(fib(number),)] * 10);
    list = c.execute("select * from data limit 100").fetchall()
    conn.commit()
    conn.close()
    return render_template('template.html', list=list)

def fib(n):
    if n == 0: return 0
    elif n == 1: return 1
    else:
        return fib(n - 1) + fib(n - 2)

if __name__ == '__main__':
    app.run(debug=False)
