FROM php:7.4-apache

RUN apt-get update \
&& apt-get install -y apt-utils vim curl sqlite3 mc \
&& pecl install xdebug

# PHP extensions
RUN \
    docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-configure mysqli --with-mysqli=mysqlnd \
    && docker-php-ext-install pdo_mysql

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    software-properties-common \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    libfreetype6-dev \
    libicu-dev \
    libssl-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libedit-dev \
    libedit2 \
    libpq-dev \
    libxslt1-dev \
    libzip-dev \
    # libonig-dev agregado: 
    # https://github.com/docker-library/php/issues/880
    libonig-dev \
    #agregado freetype
    # freetype \
    apt-utils \
    gnupg \
    git \
    vim \
    wget \
    curl \
    lynx \
    psmisc \
    unzip \
    tar \
    cron \
    bash-completion

#Install Dependencies
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg

RUN docker-php-ext-install \
    opcache \
    gd \
    bcmath \
    intl \
    # mbstring \
    soap \
    xsl \
    zip

RUN apt-get update && \
    \
    apt-get install -y --no-install-recommends \
        libldap2-dev \
        libldb-dev \
        libmcrypt-dev \
        libsodium-dev \
        # libonig-dev agregado: 
        # https://github.com/docker-library/php/issues/880
        libonig-dev \
        zlib1g-dev

RUN chmod 777 -R /var/www \
    && chown -R www-data:www-data /var/www \
    && usermod -u 1000 www-data \
    && chsh -s /bin/bash www-data

RUN a2enmod rewrite
RUN a2enmod headers

RUN docker-php-ext-install sockets
#RUN docker-php-ext-install sodium

RUN a2enmod ssl

RUN ln -sf /dev/stdout /var/log/apache2/access.log \
    && ln -sf /dev/stderr /var/log/apache2/error.log

#WORDPRESS
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# The base image does not have php.ini.
# Copy our own, with xdebug settings
#ADD ./php.ini /usr/local/etc/php/
#RUN echo 'xdebug.remote_enable=1' >> /usr/local/etc/php/php.ini
#RUN echo 'xdebug.remote_autostart=1' >> /usr/local/etc/php/php.ini

###################
# php composer
###################
# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
#     php composer-setup.php && \
#     php -r "unlink('composer-setup.php');" && \
#     mv composer.phar /usr/local/bin/composer
COPY ./php/composer /usr/local/bin/composer
COPY ./php/wp /usr/local/bin/wp

###################
# APACHE
###################
# #RUN sed -i -e 's/DocumentRoot \/var\/www\/html/DocumentRoot \/var\/www\/html\/public/g' /etc/apache2/sites-available/000-default.conf
# ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
# RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

EXPOSE 80
EXPOSE 443