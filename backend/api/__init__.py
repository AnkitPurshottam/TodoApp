from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

#db configration
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:ankit@localhost/mytodo"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "ThisIsTheSecrentKey"
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#initialize db
db = SQLAlchemy(app)
from . import routes
