from api import app as application

if __name__ == "__main__":
    #application.run(port=8000,debug=True)
    application.debug = True
    application.run()
