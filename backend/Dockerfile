# Set the image version and source os
ARG PYTHON_VBASE
ARG PYTHON_VFINAL
ARG SCENARIO
#Download the image to create a initial builder
FROM python:$PYTHON_VBASE as builder
ARG SCENARIO

ENV PYTHONDONTWRITEBYTECODE=1
# Seems to speed things up
ENV PYTHONUNBUFFERED=1



# Ensures that the python and pip executables used
# in the image will be those from our virtualenv.
ENV PATH="/venv/bin:$PATH"

#Install the python libriaries into requirements folder


RUN apt-get update \  
    && apt-get install --no-install-recommends --no-install-suggests -y curl gcc \
    python3-dev python3-twisted libbz2-dev libxml2-dev libxslt1-dev zlib1g-dev libffi-dev libssl-dev \
    && rm -rf /var/lib/apt/lists/*    

RUN python -m venv /venv
COPY requirements/* /
#create wheels directory for compiled libraries
#RUN echo $SCENARIO
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r ${SCENARIO}.txt
##    && pip wheel --progress-bar pretty --no-cache-dir --no-deps --wheel-dir /wheels -r ${SCENARIO}.txt
##    && pip install --install-option="--prefix=/install" -r /$SCENARIO.txt


## If you want to create additional folders
#    && mkdir -p /backend/static \
#    && mkdir -p /backend/media
# 
#######Final Base Image

FROM python:$PYTHON_VFINAL as final

#RUN echo "Build scenario FIANLLLLLLLLLLLLLLLL: ${SCENARIO}"
#Enviroment to python image
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PATH="/venv/bin:$PATH"

#Install curl for healthcheck in this image
RUN apt-get update \  
    && apt-get install --no-install-recommends --no-install-suggests -y curl \
    && rm -rf /var/lib/apt/lists/*    

#Copy wheels directory from builder image to final image
#COPY --from=base /wheels /wheels
COPY --from=builder /venv /venv
#COPY --from=base $SCENARIO.txt .
#RUN pip install --upgrade pip
#RUN pip install --progress-bar pretty /wheels/*

#Create a new user for execute the container instead root for security purposes
RUN groupadd app && useradd -g app app 
RUN mkdir -p /backend  /backend/media /backend/static
WORKDIR /backend
ADD . /backend

RUN touch requirements/temporal.txt
RUN pip install -r /backend/requirements/temporal.txt
RUN chown -R app:app /backend/* 
USER app

#ENV PORT 8000
#EXPOSE $PORT

#ENTRYPOINT [ "entrypoint.sh" ]

###############################################