from happyheadsvc.models.base_model import BaseModel

__author__ = 'Ashkan'


class UserModel(BaseModel):
    id = None
    name = None
    created_date = None
    friends = []

    def __init__(self, id, name):
        self.id = id
        self.name = name
