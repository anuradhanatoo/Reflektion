//Import internal and user defined Libraries
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config/config.properties');
const apiLib = require('../libs/apiLib');
const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var assert = chai.assert;
var path = require('path');
//Import fileSystem library
const fs = require('fs');

//Import Config properties
var env = properties.get('env');

//For mochawesome reporting
const addContext = require('../node_modules/mochawesome/addContext');

//Read scriptname
var scriptName = path.basename(__filename, '.js');
console.log("Test executed :: "+ scriptName);

//Import API URLs for the selected env
var apiBaseURL = properties.get(env + '.apiBaseURL');
var context = properties.get(env + '.contextPath');
console.log(apiBaseURL, context);

//Tests to verify GET response
describe("Verify GET Tests ", async function () {

    it("Validate GET response for Single Record", async function () {
        //Default timeout of mocha IT tests is 2000. We can reset it to any value using below command
        this.timeout(200000);

        var expectedRes = fs.readFileSync('./testdata/expected/test_1.json');
        expectedRes = JSON.parse(expectedRes);
        console.log("Expected Response :: " + JSON.stringify(expectedRes));
        addContext(this, "EXPECTED Response Code :: "+ 200);
        addContext(this, "EXPECTED Response :: "+ JSON.stringify(expectedRes));
        //Setting up context for given testdata Example Id = 1
        context = context + '/1';

        //Make GET request
        var res = await apiLib.getAPI(apiBaseURL, context);
        var actualRes = res.body;
        console.log("Actual Response :: "+JSON.stringify(actualRes));
        addContext(this, "ACTUAL Response Code :: "+ res.status);
        addContext(this, "ACTUAL Response :: "+ JSON.stringify(actualRes));
        //Validating Response code and schema
        expect(res.status).to.equal(200);
    
        //Compare Actual and Expected Response::
        var status = await apiLib.compareResponse(actualRes, expectedRes);
        console.log("Test Status :: "+ status);
   
    })

    it("Validate GET response for 100 Records", async function () {
        //Default timeout of mocha IT tests is 2000. We can reset it to any value using below command
        this.timeout(200000);

        //Context path setup
        context = properties.get(env + '.contextPath');
        //Make GET request
        var res = await apiLib.getAPI(apiBaseURL, context);

        console.log("Number of records :: "+ res.body.length)
        var actualRes = res.body;
        //Validating Response code and schema
        expect(res.status).to.equal(200);
        expect(actualRes.length).to.equal(100);
        
        actualRes.forEach(block => 
        {   
            console.log("ID :: "+ block['id']);
            expect(block).to.have.property('userId');
            expect(block).to.have.property('id');
            expect(block).to.have.property('title');
            expect(block).to.have.property('body');
        });
        addContext(this, "ACTUAL Response Code :: "+ res.status);
        addContext(this, "ACTUAL Response :: "+ JSON.stringify(actualRes));
   
    })

    it("Validate GET response for invalid data", async function () {
        //Default timeout of mocha IT tests is 2000. We can reset it to any value using below command
        this.timeout(200000);

        //Context path setup
        context = properties.get(env + '.contextPath');
        context = context + '/invalidposts';

        //Make GET request
        var res = await apiLib.getAPI(apiBaseURL, context);
        
        var actualRes = res.body;
        addContext(this, "ACTUAL Response Code :: "+ res.status);
        addContext(this, "ACTUAL Response :: "+ JSON.stringify(actualRes));
        //Validating Response code and schema
        expect(res.status).to.equal(404);
        expect(JSON.stringify(actualRes)).to.equal('{}');
                
   
    })
})