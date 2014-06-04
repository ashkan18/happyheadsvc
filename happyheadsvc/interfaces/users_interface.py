from flask import request, jsonify
from happyheadsvc import app


@app.route('/users/authenticate', methods=['GET'])
def authenticate():
    """
    This method will authenticate the user based on input params

    curl sample:
        http://localhost:5000/users/authenticate

    @return: authenticate token ans user info
    """
    return jsonify(True)


@app.route('/users/<int:user_id>/messages', methods=['GET'])
def get_users_messages(user_id):
    """
    This method returns a list of current messages for a user
    @param user_id: int user identifier of the user we want to get their messages
    @return: json result that has list of all the messages of this user and their status
    """
    return jsonify(messages=[{'id': 2, 'sender': 'ashkan'}, {'id': 23, 'sender': 'christopher'}])

