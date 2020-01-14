FROM python:3.7

RUN mkdir /srv/app
WORKDIR /srv/app
COPY . /srv/app

# install dependencies
RUN pip install -r requirements.txt

ENV FLASK_APP app.py

CMD ["flask", "run", "--host=0.0.0.0"]
