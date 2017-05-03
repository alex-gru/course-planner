FROM mongo

COPY courses.json /courses.json
COPY modules.json /modules.json

CMD mongoimport --host mongodb --db db --collection courses --file /courses.json --jsonArray --drop && mongoimport --host mongodb --db db --collection modules --file /modules.json --jsonArray --drop
