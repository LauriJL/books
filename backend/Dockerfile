FROM python:3.8.4-alpine

ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install --upgrade pip pipenv

WORKDIR /backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY ./Pipfile* ./
RUN pipenv sync

COPY . ./

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod o+x /entrypoint.sh

ENTRYPOINT ["sh", "-c", "/entrypoint.sh"]

EXPOSE 8000