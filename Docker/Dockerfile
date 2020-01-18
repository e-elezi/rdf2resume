FROM python:3.7

RUN mkdir /srv/app
WORKDIR /srv/app
COPY . /srv/app

# install dependencies
RUN pip install -r requirements.txt
RUN apt-get update && \
    apt-get install -y --no-install-recommends texlive-latex-recommended texlive-fonts-recommended && \
    apt-get install -y --no-install-recommends texlive-latex-extra texlive-fonts-extra texlive-lang-all && \
    rm -rf /var/lib/apt/lists/*

ENV FLASK_APP app.py

CMD ["flask", "run", "--host=0.0.0.0"]
