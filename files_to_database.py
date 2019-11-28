import os
import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def create_library(conn, file_path):
    """
    Create a new library into the library table
    :param conn:
    :param file_path:
    :return: library id
    """
    sql = ''' INSERT INTO library(category,version,subversion,path)
              VALUES(?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, file_path)
    return cur.lastrowid



def main():
    basedir = os.path.abspath(os.path.dirname(__file__))
    database = os.path.join(basedir, "library.db")
    conn = create_connection(database)
    base_url = 'https://'

    with conn:
        for dirpath, dirname, filenames in os.walk('umcdn.um.ac.ir'):
            print(dirname)
            data = [os.path.join(dirpath, f) for f in filenames]
            for file in data:
                library = ('', '', '', base_url+file)
                library_id = create_library(conn, library)

if __name__ == '__main__':
    main()