FROM ubuntu:16.04

LABEL author=vic@minustime.com

# Update OS, install base packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    git \
    htop \
    vim \
    wget \
    curl \
    supervisor \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

ENV NODE_VERSION 10.13.0

# Install Node
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components 1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz"

# Install chromium
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    google-chrome-unstable  \
    ibpangocairo-1.0-0 \ 
    libgconf2-4 \ 
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

RUN groupadd -r app \
    && useradd -m -r -d /home/app -g app app

ENV WORKDIR /opt/plug-dj-client
ENV BUILDIR /tmp/build
ENV PATH="${WORKDIR}/app/node_modules/.bin:$PATH"

WORKDIR ${WORKDIR}/app

# Build the dependencies
COPY package.json package-lock.json ${BUILDIR}/
RUN cd ${BUILDIR} \
    && npm install

# Build the project
COPY tsconfig.json ${BUILDIR}/
COPY src ${BUILDIR}/src
RUN cd ${BUILDIR} \
    && npm run build \
    && mv node_modules dist/* ${WORKDIR}/app/ \
    && rm -rf ${BUILDIR}

# Copy configuration files
COPY docker/supervisord/default.conf /etc/supervisor/conf.d/default.conf

USER app

ENTRYPOINT ["/usr/bin/supervisord"]