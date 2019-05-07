const { expect } = require('chai')
const supertest = require('supertest')
const mocha = require('mocha');

global.mocha = mocha
global.expect = expect
global.supertest = supertest