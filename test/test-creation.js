/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;
var _s      = require('underscore.string');


function makeRegExp() {
  var message = _s.sprintf.apply(this, arguments);
  var escaped = _s.escapeRegExp(message);
  return new RegExp(escaped);
}

describe('license generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('license:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files - Apache license', function (done) {

    helpers.mockPrompt(this.app, {
      'name': 'Test User',
      'license': 'apache'
    });

    this.app.run({}, function () {
      var regex = makeRegExp("Copyright %d Test User", new Date().getFullYear());
      assert.fileContent('LICENSE', regex);
      assert.fileContent('LICENSE', /Apache License, Version 2\.0/);
      done();
    });

  });

  it('creates expected files - unlicense', function (done) {

    helpers.mockPrompt(this.app, {
      'name': 'Test User',
      'license': 'unlicense'
    });

    this.app.run({}, function () {
      var regex1 = makeRegExp("This is free and unencumbered software released into the public domain.");
      var regex2 = makeRegExp("http://unlicense.org/");
      assert.fileContent('LICENSE', regex1);
      assert.fileContent('LICENSE', regex2);
      done();
    });

  });

  it('creates expected files - FreeBSD license', function (done) {

    helpers.mockPrompt(this.app, {
      'name': 'Test User',
      'license': 'freebsd'
    });

    this.app.run({}, function () {
      var regex = makeRegExp("Copyright (c) %d, Test User", new Date().getFullYear());
      assert.fileContent('LICENSE', regex);
      assert.fileContent('LICENSE', /FreeBSD Project/);
      done();
    });

  });

  it('creates expected files - NewBSD license', function (done) {

    helpers.mockPrompt(this.app, {
      'name': 'Test User',
      'license': 'newbsd'
    });

    this.app.run({}, function () {
      var regex = makeRegExp("Copyright (c) %d, Test User", new Date().getFullYear());
      assert.fileContent('LICENSE', regex);
      done();
    });

  });

  it('creates expected files - MIT license', function (done) {

    helpers.mockPrompt(this.app, {
      'name': 'Test User',
      'license': 'mit'
    });

    this.app.run({}, function () {
      var regex = makeRegExp("Copyright (c) %d Test User", new Date().getFullYear());
      assert.fileContent('LICENSE', makeRegExp("The MIT License (MIT)"));
      assert.fileContent('LICENSE', regex);
      done();
    });

  });

  it('creates expected files - ISC license', function (done) {

    helpers.mockPrompt(this.app, {
      'name': 'Test User',
      'license': 'isc'
    });

    this.app.run({}, function () {
      var regex = makeRegExp("Copyright (c) %d Test User", new Date().getFullYear());
      assert.fileContent('LICENSE', regex);
      done();
    });

  });

  it('creates expected files - No License', function (done) {

    helpers.mockPrompt(this.app, {
      'name': 'Test User',
      'license': 'nolicense'
    });

    this.app.run({}, function () {
      var regex = makeRegExp("Copyright (c) %d Test User", new Date().getFullYear());
      assert.fileContent('LICENSE', regex);
      done();
    });

  });
});
