from flask import request, jsonify
import jwt
from .models import User,Todo
from . import db,app
from .token import token_validator


@app.route('/')
def home():
    return jsonify({"status":"up and running"}), 200

@app.route('/signup', methods=['POST'])
def user_signup_handler():
    try:
        data = request.get_json()
        user = User( data["fname"], data['lname'] ,data['email'], data['password'])
        db.session.add(user)
        db.session.commit()
        token = jwt.encode({"uid": user.uid}, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({
            "status": "success", 
            "msg": "user created succesfully", 
            "user": format_user(user) ,
            "token": token
        })
    except Exception as e: 
        print(e)
        return jsonify({"status": "failed", "msg": "user creation failed"})

@app.route('/signin', methods=['POST'])
def signin_handler():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "status": "failed",
                "msg": "Please provide user Details",
            }), 400
        # checking if user existed or not
        user = User.query.filter_by(
            email=data['email'], password=data['password']).first()
        if user:
            try:
                token = jwt.encode({"uid": user.uid},
                                   app.config['SECRET_KEY'], algorithm="HS256")
                return jsonify({
                    "msg": "User logged in Successfully",
                    "status": "success",
                    "user": format_user(user),
                    "token": token
                }), 200
            except Exception as e:
                return jsonify({
                    "status": "0",
                    "msg": "Something went Wrong",
                    "e": str(e)
                }), 500
        return jsonify({
            "msg": "Error fetching auth details. Invalid credentials",
            "status": "0",
            "statusCode": 404
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "msg": "Something Went Wrong",
            "e": str(e)
        }), 500


@app.route('/my-todos', methods=['GET'])
@token_validator
def my_todos_handler(user):
    try:
        todo = Todo.query.filter(Todo.uid==user.uid)
        data = []
        for todos in todo:
            currtodo = {}
            currtodo['sno'] = todos.sno
            currtodo['title'] = todos.title
            currtodo['desc'] = todos.desc
            currtodo['created_at'] = todos.date_created
            currtodo['uid'] = todos.uid
            data.append(currtodo)
        return jsonify({
            "status":"success",
            "data": data
        })
    except Exception as e:
            return jsonify({
                "error" :str(e)}), 500
        
    """todo =  Todo.query.all()
        columns =['sno','title']
        return jsonify({
        "status":"1",
        "data": todo
        })
    except Exception as e:
            return jsonify({
                "error" :e})"""

@app.route('/addTask', methods=['POST'])
@token_validator
def hello_world(user):
        data = request.get_json()
        todo = Todo(title = data['title'], desc= data['desc'], uid = user.uid)
        db.session.add(todo)
        db.session.commit()
        return jsonify({
        "msg":"Task added successfully",
        "data": format_todo(todo),
        "status":"success", 
    }),201


@app.route('/updateTask/<int:sno>', methods=['PUT'])
@token_validator
def update(user, sno):
    body = request.get_json()
    title = body['title']
    desc = body['desc']
    todo = Todo.query.filter_by(sno=sno).first()
    print(todo)
    todo.title = title
    todo.desc = desc
    db.session.add(todo)
    db.session.commit()
    return jsonify({
        "msg":"Task updated successfully", "status":"success", "data":format_todo(todo)}), 200


@app.route('/deleteTask/<int:sno>', methods = ['DELETE'])  
@token_validator
def delete(f, sno):
    todo = Todo.query.filter_by(sno=sno).delete()
    db.session.commit()
    print("deleted!!")
    return jsonify({"msg":"Task deleted successfully", "status":"success"})

@app.route('/search',methods = ['GET'])
@token_validator
def getTodo(user):
    try:
        title = request.args['title']
        lower_title = title.lower()
        todos = Todo.query.filter(Todo.title.ilike(title))
        res = []
        for todo in todos:
            formatted_event = format_todo(todo)
            res.append(formatted_event)
        return {'todo': res}
        
    except:
        return jsonify({"todo":"not found"})

def format_todo(todo):
    return {
        "sno": todo.sno,
        "title": todo.title,
        "desc": todo.desc,
        "date":todo.date_created,
        "uid":todo.uid
    }

def format_user(user):
    return {
        "uid": user.uid,
        "fname": user.fname,
        "lname": user.lname,
        "email": user.email,
    }

@app.route('/me',methods = ['GET'])
@token_validator
def me_handler(user):
    return jsonify(format_user(user))