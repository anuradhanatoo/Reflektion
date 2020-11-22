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
var id = '';

//Import Config properties
var env = properties.get('env');

//For mochawesome reporting
const addContext = require('../node_modules/mochawesome/addContext');

//Import API URLs for the selected env
var apiBaseURL = properties.get(env + '.apiBaseURL');
var context = properties.get(env + '.contextPath');
console.log(apiBaseURL, context);

//Read scriptname
var scriptName = path.basename(__filename, '.js');
console.log("Test executed :: "+ scriptName);

//Tests to verify GET response
describe("Verify POST, PUT and DELETE Tests ", async function () {

    it("Validate POST response ", async function () {
      //Default timeout of mocha IT tests is 2000. We can reset it to any value using below command
      this.timeout(200000);
      var createBody = fs.readFileSync('./testdata/template/POSTBody.json');
      createBody = JSON.parse(createBody);
      console.log(JSON.stringify(createBody));
      addContext(this, "EXPECTED Response Code:: "+ 201);
      addContext(this, "EXPECTED Response :: "+ JSON.stringify(createBody));
      //Send POST request
      var res = await apiLib.postAPI(apiBaseURL, context, createBody)
      var actualRes = res.body;
      console.log("ACTUAL Response :: "+ JSON.stringify(actualRes));
      addContext(this, "ACTUAL Response Code :: "+ res.status);
      addContext(this, "ACTUAL Response :: "+ JSON.stringify(actualRes));  
      console.log("Validating Response :: ");
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('title',createBody['title']);
      expect(res.body).to.have.property('body', createBody['body']);
      expect(res.body).to.have.property('userId', createBody['userId']);
      id = res.body.id;
      //Adding dynamically generated Id to the CreateBody Payload
      createBody['id'] = id;
      console.log("Actual Response :: "+ JSON.stringify(actualRes));
      console.log("Expected Response :: "+ JSON.stringify(createBody));

      //Compare Actual and Expected Response::
      var status = await apiLib.compareResponse(actualRes, createBody);
      console.log("Test Status :: "+ status);


    })

    it("Validate PUT response ", async function () {
        //Default timeout of mocha IT tests is 2000. We can reset it to any value using below command
        this.timeout(200000);
        
        //Context for existing entry of Id=1
        context = properties.get(env + '.contextPath');
        context = context + '/1';
        //Original entry for Id=1
        const original_res = await apiLib.getAPI(apiBaseURL, context);
        console.log("Old data :: " +JSON.stringify(original_res.body))
    
        //Update Data from Original Response
        var updateBody = JSON.parse(JSON.stringify(original_res.body));
        updateBody['title'] = 'Updated Title';
        updateBody['body'] = 'Updated Body';
        updateBody['userId'] = 1234;
        console.log(JSON.stringify(updateBody));
        addContext(this, "EXPECTED Response :: "+ JSON.stringify(updateBody)); 
        //Send PUT request
        var res = await apiLib.putAPI(apiBaseURL, context, updateBody)
        var actualRes = res.body;
        console.log("ACTUAL Response :: "+ JSON.stringify(actualRes));
        addContext(this, "ACTUAL Response Code :: "+ res.status);
        addContext(this, "ACTUAL Response :: "+ JSON.stringify(actualRes)); 
        console.log("Validating Response :: ");
        //Validate Currently Updated Data is returned in response
        expect(res.status).to.equal(200);
        expect(actualRes).to.have.property('title',updateBody['title']);
        expect(actualRes).to.have.property('body', updateBody['body']);
        expect(actualRes).to.have.property('userId', updateBody['userId']);
        expect(actualRes).to.have.property('id', updateBody['id']);

        //Validate Old Data is not retained in response
        expect(actualRes.title).to.not.equal(original_res.body.title);
        expect(actualRes.body).to.not.equal(original_res.body.body);
        expect(actualRes.userId).to.not.equal(original_res.body.userId);
        expect(actualRes.id).to.equal(original_res.body.id);
        console.log("Test Passed!");

    })

    it("Validate DELETE response ", async function () {
        //Default timeout of mocha IT tests is 2000. We can reset it to any value using below command
        this.timeout(200000);
        
        //Context for existing entry of Id=1
        context = properties.get(env + '.contextPath');
        context = context + '/1';

        //Send DELETE request
        var res = await apiLib.deleteAPI(apiBaseURL, context)
        var actualRes = res.body;
        console.log("ACTUAL Response :: "+ JSON.stringify(actualRes));
        addContext(this, "ACTUAL Response Code :: "+ res.status);
        addContext(this, "ACTUAL Response :: "+ JSON.stringify(actualRes));
        console.log("Validating Response ...");
        //Validate Currently Updated Data is returned in response
        expect(res.status).to.equal(200);
        expect(JSON.stringify(actualRes)).to.equal('{}');
        console.log("Test Passed!");
       
    })
})