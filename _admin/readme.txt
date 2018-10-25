#
# import a .json-document into firebase
#


#
# import a .json-document into firebase
#
#     ./_data/import-to-firestore.json
#

node ./import.js ./_data/import-to-firestore.json

#
# export a document from firebase into a .json-file
#
#     firebase document:    todos
#     export file:         ./firestore-export.json
#

node ./export.js  todos 

