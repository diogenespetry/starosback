FROM node:24.6.0-slim

ENV TZ=America/Sao_Paulo
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /var/www/dados/

# Instalar dependências incluindo nano e bash
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    nano \
    tzdata \
    bash \
    curl git \
    procps && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependências
COPY package*.json ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Instalar knex globalmente
RUN npm install -g knex

# Criar diretórios e permissões


# Copiar código fonte
COPY --chown=node:node . .

# Configurar shell para o usuário node
RUN usermod -s /bin/bash node

USER node
EXPOSE 4000
CMD ["npm", "start"]