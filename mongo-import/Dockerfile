FROM mongo

COPY greeting.json /greeting.json
COPY courses.json /courses.json
COPY modules.json /modules.json

CMD mongoimport --host mongodb --db db --collection greetings --file /greeting.json --drop
CMD mongoimport --host mongodb --db db --collection modules --file /modules.json --jsonArray --drop
CMD mongoimport --host mongodb --db db --collection courses --file /courses.json --jsonArray --drop
