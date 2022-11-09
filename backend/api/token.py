from functools import wraps
import json
from lib2to3.pgen2 import token
from flask import Flask, render_template, request, redirect, jsonify
import jwt
from .models import User
from . import app

# Token Validator
def token_validator(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({
                "msg": "Authentication token is missing",
                "status": "0",
                "error": "Unauthorized",
                "statusCode": "401"
            })
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            print(data['uid'])
            user = User.query.filter_by(uid=data['uid']).first()
            if user is None:
                return jsonify({
                    "msg":"Invalid authentication token",
                    "statusCode":"401",
                    "error":'unAuthorized'
                })
        except Exception as e:
            return jsonify({
                "msg": "Something went wrong",
                "statusCode":e,
                "status": "0"
            })
            
        return f(user, *args, **kwargs)
 
    return decorated
