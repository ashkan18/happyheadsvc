from bson.json_util import dumps
from happyheadsvc.data.base_data import BaseData
from happyheadsvc import app

__author__ = 'Ashkan'


class UserData(BaseData):

    def find_user_by_id(self, id):
        """
        Given a user id it will find the user and return it, it returns None if we don't have this user
        :param id:
        :return:
        """
        return self.db.users.find_one({'id': id})

    def add_user(self, user_model):
        """
        This method adds a new user to database
        :param user_model: UserModel object of the user we want to add
        """
        if self.find_user_by_id(user_model.id) is None:
            app.logger.debug(u"Adding user id: {0}".format(user_model.id))
            self.db.users.insert(dumps(user_model))

    def update_user(self, user_model):
        """
        Updates an existing user model
        :param user_model: user model of existing user with modified params
        """
        self.db.users.save(dumps(user_model))

    def search_by_name(self, name):
        """
        Search users by name and returns a list of users
        :param name: name of the user we are looking for
        :return: users from mongo db
        """
        return self.db.users.find({'name': {'$regex': name, '$options': 'i'}})