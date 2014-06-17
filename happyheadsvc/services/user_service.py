from happyheadsvc.data.user_data import UserData
from happyheadsvc.models.user_model import UserModel

__author__ = 'Ashkan'


__user_data = UserData()


def authenticate_user(user_id, access_token, name):
    user_model = UserModel(user_id=user_id, name=name)

    user_exits = __user_data.find_user_by_id(user_model.id)
    if user_exits:
        return True
    else:
        # we need to add the user
        __user_data.add_user(user_model)
        return True

