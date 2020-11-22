//Import internal and user defined Libraries
const PropertiesReader = require('../node_modules/properties-reader');
const properties = PropertiesReader('./config/config.properties')
const apiLib = require('../libs/apiLib');
const chai = require('../node_modules/chai');
const chaihttp = require('../node_modules/chai-http');
chai.use(chaihttp);
assert = chai.assert;
expect = chai.expect;
//Import fileSystem library
const fs = require('fs');


//test variables Declaration
var status = '';

var getAPI = async function(apiBaseURL, context)
    {
          console.log("apiBaseURL :: "+ apiBaseURL); //Printing BaseURL passed to Function
          console.log("context :: "+ context); //Printing Context path passed to Function
          //Making a GET API call using chai http requests 
          const res = await chai.request(apiBaseURL)
                    .get(context)
                    .set('content-type', 'application/json')
                    .set('accept', 'application/json')
                    .send();
        
          return res;
    }

var postAPI = async function(apiBaseURL, context, body)
    {
          console.log("apiBaseURL :: "+ apiBaseURL); //Printing BaseURL passed to Function
          console.log("context :: "+ context); //Printing Context path passed to Function
          //Making a GET API call using chai http requests 
          const res = await chai.request(apiBaseURL)
                    .post(context)
                    .set('content-type', 'application/json')
                    .set('accept', 'application/json')
                    .send(body);
        
         return res;
    }

var putAPI = async function(apiBaseURL, context, body)
    {
          console.log("apiBaseURL :: "+ apiBaseURL); //Printing BaseURL passed to Function
          console.log("context :: "+ context); //Printing Context path passed to Function
          //Making a GET API call using chai http requests 
          const res = await chai.request(apiBaseURL)
                    .put(context)
                    .set('content-type', 'application/json')
                    .set('accept', 'application/json')
                    .send(body);
        
          return res;
    }

var deleteAPI = async function(apiBaseURL, context)
    {
          console.log("apiBaseURL :: "+ apiBaseURL); //Printing BaseURL passed to Function
          console.log("context :: "+ context); //Printing Context path passed to Function
          //Making a GET API call using chai http requests 
          const res = await chai.request(apiBaseURL)
                    .delete(context)
                    .set('content-type', 'application/json')
                    .set('accept', 'application/json')
                    .send();
        
        return res;
    }

var compareResponse = async function(actualResponse, expecteResponse)
    {   
        status = 'fail';
       
        if (Object.keys(expecteResponse).length == Object.keys(actualResponse).length) 
        {   

            console.log("actualResponse keys :: "+ Object.keys(expecteResponse));
            console.log("expecteResponse keys :: "+Object.keys(actualResponse));
            for(i in actualResponse)
            {   
                assert(typeof(actualResponse[i]) == typeof(expecteResponse[i] ), "Type of data is not same");
                assert(actualResponse[i] == expecteResponse[i], "Values are not same");
                status = 'pass';
            }
        }

        else
        {   
            status = 'fail';
            assert.fail("Number of fields dont match in Expected and Actual")
        }

       return status;

    }

//Export the functions to be called by testscript.
module.exports = 
{
    getAPI,
    compareResponse,
    postAPI,
    putAPI,
    deleteAPI
}
