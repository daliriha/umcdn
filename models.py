from datetime import datetime
from config import db, ma
from marshmallow import fields


class Library(db.Model):
    __tablename__ = "library"
    library_id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(32))
    version = db.Column(db.String(32))
    subversion = db.Column(db.String(32))
    path = db.Column(db.String(400))



class LibrarySchema(ma.ModelSchema):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    class Meta:
        model = Library
        sqla_session = db.session


