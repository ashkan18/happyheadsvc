from flask import request, jsonify
from happyheadsvc import app
from happyheadsvc.services import user_service


@app.route('/users/authenticate', methods=['POST'])
def authenticate():
    """
    This method will authenticate the user based on input params

    curl sample:
        http://localhost:5000/users/authenticate

    @return: authenticate token ans user info
    """
    user_id = request.json['user_id']
    access_token = request.json['access_token']
    name = request.json['name']

    user_service.authenticate_user(user_id=user_id, access_token=access_token, name=name)
    return jsonify(True)


@app.route('/users/<int:user_id>/messages', methods=['GET'])
def get_users_messages(user_id):
    """
    This method returns a list of current messages for a user
    @param user_id: int user identifier of the user we want to get their messages
    @return: json result that has list of all the messages of this user and their status
    """
    return jsonify(messages=[{'id': 2, 'sender': 'ashkan'}, {'id': 23, 'sender': 'christopher'}])

