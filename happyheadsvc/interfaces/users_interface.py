from flask import request, jsonify
from happyheadsvc import app
from happyheadsvc.services import user_service
from bson.json_util import dumps


@app.route('/users/authenticate', methods=['POST'])
def authenticate():
    """
    This method will authenticate the user based on input params

    curl sample:
        curl -X POST http://localhost:5000/users/authenticate -H "Content-Type: application/json"
            --data '{"user_id": "111222333", "access_token":"123123", "name":"Ashkan Nasseri"}'

    """
    user_id = request.json['user_id']
    access_token = request.json['access_token']
    name = request.json['name']

    user_service.authenticate_user(user_id=user_id, access_token=access_token, name=name)
    return jsonify(sucess=True)

@app.route('/users/search/', methods=['GET'])
def search_users():
    """
    This method searches for users by name based on the query input

    curl sample:
        curl -X GET http://localhost:5000/users/search?query=ashkan
    """
    query = request.args['query']
    return jsonify(users=dumps(user_service.search_users(query)))

@app.route('/users/<int: user_id>/friend/<int:friend_user_id>', methods=['POST'])
def add_friend(user_id, friend_user_id):
    user_service.add_friend(user_id=user_id, friend_user_id=friend_user_id)
    return jsonify(added=True)

@app.route('/users/<int:user_id>/messages', methods=['GET'])
def get_users_messages(user_id):
    """
    This method returns a list of current messages for a user
    @param user_id: int user identifier of the user we want to get their messages
    @return: json result that has list of all the messages of this user and their status
    """
    return jsonify(messages=[{'id': 2, 'sender': 'ashkan'}, {'id': 23, 'sender': 'christopher'}])

