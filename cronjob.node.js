#! /usr/bin/env node

var fs = require('fs'),
    Flatstache = require('flatstache'),
    lib = require("./index.js");

var RANDOM_LETTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

var HUMAN_ANSWERS = {
    'near': "Soon.",
    'today': "Yes.",
    'recent': "It was.",
    'pending': "Not this week!",
    'unknown': "PC LOAD LEGAL"
};

var now = (process.env.HANFORD_DATE) ? Date.parse(process.env.HANFORD_DATE) : Date.now(),
    answer = lib.statusForTime(now).info,
    letterIdx = Math.floor(Math.random() * RANDOM_LETTERS.length),
    template = fs.readFileSync(__dirname+"/template.html", 'utf8');
process.stdout.write(Flatstache.to_html(template, {
    machineAnswer: answer,
    humanAnswer: HUMAN_ANSWERS[answer],
    randomLetter: RANDOM_LETTERS[letterIdx]
}));
