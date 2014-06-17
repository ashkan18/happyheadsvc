import datetime
from happyheadsvc import db
from happyheadsvc.models.base_model import BaseModel

__author__ = 'Ashkan'


class UserModel(BaseModel):
    id = None
    name = None
    created_date = None
    friends = []

    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name
