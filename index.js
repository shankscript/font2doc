#!/usr/bin/env node
console.log('Begin..');
const createHTML = require('./createHtml');
const program = require('commander');
const xml2js = require('xml2js');
const fs = require('fs');
let out = '.';
let file = '';

program
    .arguments('<file>')
    .option('-o, --out <path>', 'output file path')
    .action(function(infile) {
        console.log('file: %s out: %s', file, program.out );
        out = program.out || '.';
        file = infile.replace(/\..*/, '');;

        const xml2json = async(xml) => {
            const json = await xml2js(xml);
            return json;
        };
        let xml = fs.readFileSync(file + '.svg', 'utf8');
        //unicode="&#x20;"
        xml = xml.toString().replace("\ufeff", "").replace(/unicode\=\"\&\#x(.*?)\;\"/g, 'unicode\=\"\\$1\"');

        var parser = new xml2js.Parser();

        parser.parseString(xml, (err, json) => {
            console.log(JSON.stringify(json.svg.defs[0].font[0].$.id));
            if (!fs.existsSync(out)) {
                fs.mkdirSync(out);
            }
            out !== '.' && fs.copyFileSync(`${file}.ttf`, `${out}/${file}.ttf`);
            fs.writeFileSync(`${out}/${file}.html`, createHTML(json, file));
        });
    })
    .parse(process.argv);