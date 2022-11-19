from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import rds_hostname,rds_username,rds_password,rds_database

app = Flask(__name__)

#db configration
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{rds_username}:{rds_password}@{rds_hostname}/{rds_database}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "ThisIsTheSecrentKey"
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#initialize db
db = SQLAlchemy(app)
from . import routes
