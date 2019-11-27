import os
from datetime import datetime
from config import db
from models import Library

# Data to initialize database with
LIBRARY = [
    {
        "category": "jquery",
        "version": "3",
        "subversion": "3.3.1",
        "path": "https://umcdn.um.ac.ir/jquery/3/3.3.1/jquery.min.js"
    },
    {
        "category": "jquery",
        "version": "3",
        "subversion": "3.3.0",
        "path": "https://umcdn.um.ac.ir/jquery/3/3.3.0/jquery.min.js"
    },
    {
        "category": "bootstrap",
        "version": "4",
        "subversion": "4.3.1",
        "path": "https://umcdn.um.ac.ir/bootstrap/4/4.3.1/js/bootstrap.min.js"
    },
{
        "category": "bootstrap",
        "version": "4",
        "subversion": "4.3.1",
        "path": "https://umcdn.um.ac.ir/bootstrap/4/4.3.1/css/bootstrap.min.css"
    },
{
        "category": "bootstrap",
        "version": "4",
        "subversion": "4.3.1",
        "path": "https://umcdn.um.ac.ir/bootstrap/4/4.3.1/css/bootstrap-rtl.min.css"
    },
{
        "category": "bootstrap",
        "version": "4",
        "subversion": "4.2.1",
        "path": "https://umcdn.um.ac.ir/bootstrap/4/4.2.1/css/bootstrap.min.css"
    },
{
        "category": "bootstrap",
        "version": "4",
        "subversion": "4.2.1",
        "path": "https://umcdn.um.ac.ir/bootstrap/4/4.2.1/css/rtl/bootstrap.min.css"
    },


]

# Delete database file if it exists currently
if os.path.exists("library.db"):
    os.remove("library.db")

# Create the database
db.create_all()

# iterate over the LIBRARY structure and populate the database
for library in LIBRARY:
    p = Library(category=library.get("category"), version=library.get("version"), subversion=library.get("subversion"),
                path=library.get("path"))
    db.session.add(p)

db.session.commit()
