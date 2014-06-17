import json
from happyheadsvc.data.base_data import BaseData

__author__ = 'Ashkan'


class UserData(BaseData):

    def authenticate_and_register(self, user_model):
        user_exits = self.find_user_by_id(user_model.id)
        if user_exits:
            return True
        else:
            # we need to add the user
            self.add_user(user_model)
            return True

    def find_user_by_id(self, id):
        self.db.users.find_one({'id': id})

    def add_user(self, user_model):
        if self.find_user_by_id(user_model.id) is None:
            self.db.users.insert(json.dumps(user_model))

    def update_user(self, user_model):
        self.db.users.save(json.dumps(user_model))