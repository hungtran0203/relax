<p align="center">
 <img src="https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/logo_small.png" alt="Relax Logo">
</p>
====================================
[![Slack Status](http://slack-relax.herokuapp.com/badge.svg)](http://slack-relax.herokuapp.com/)

**IMPORTANT NOTE:** Relax isn't yet ready for production, stay tuned for releases, beta version will come soon

Support our work and help us make this the best open source CMS, be our [patreon](http://patreon.com/relax)!

Relax is a powerful new generation CMS on top of
[React](https://facebook.github.io/react/) and [Node.js](https://nodejs.org/en/)
which aims for a better way of building websites.

It features a live page builder based on components and a smart and easy way of
binding dynamic data to them.

We're currently working on releasing the beta version which should come up early 2016. If you want to collaborate in the meantime or just say anything join us at [Relax Slack](http://slack-relax.herokuapp.com/)

**You can check the demo [here](http://demo.getrelax.io/admin)**

Demo credentials:
 - user: demo
 - pass: demo

New design for beta release
------------

(taken from using version in master branch, demo is outdated as master isn't yet stable)

![Pages](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/pages.png)

![Media](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/media.png)

![Colors](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/colors.png)

![New Schema](https://raw.githubusercontent.com/relax/relax/gh-pages/assets/images/newschema.png)

Installation
------------

### Dependencies

Relax uses [sharp](https://github.com/lovell/sharp) to resize images.
If you're using OS X, you'll need to install its libvips dependency via `brew install homebrew/science/vips`.
Full installation instructions are available [here](http://sharp.dimens.io/en/stable/install/).

You'll also need [MongoDB](https://www.mongodb.org/).

### How to Relax

Since we are yet to tag our first release, git clone this repository and run
`npm install` followed by `npm start`.

By default the application runs at port `8080`. Go ahead and visit
`http://localhost:8080/admin/init`, here you can setup the first user and you're ready to relax.


Configuration
-------------

To configure the application you can use a `.relaxrc` file. You can place it
next to the application, on any parent folder, in your `HOME` folder, etc.

You can find a sample with the default values [here](.relaxrc.sample).


Contributing
------------

### Build and start

#### Development

While in development it's convenient to keep your application running while
watching for changes, for that you can run `npm run dev`.

The application will automatically restart when needed and keep your bundles
up to date.

#### Production

To build your assets ready to go for production run `npm run build` and `npm start` to start the application.

##### With Docker

To use our latest docker image you just have to have MongoDB running on a
different container and link it to Relax.

To start MongoDB in the background you can run  `docker run -d --name mongo mongo`.
Afterwards run `docker run -p 8181:8181 --link mongo -it relax/relax` to start
Relax on `http://localhost:8181`.

For more information about Docker please check their
[documentation](https://docs.docker.com/).

License
-------

Relax is [GPL-3 licensed](LICENSE).


Troubleshooting
---------------

Please create [an issue](https://github.com/relax/relax/issues/new).
