// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var Q = require('q');

// Set your region for future requests.
AWS.config.region = process.env.AWS_REGION;
var distributionId = process.env.DISTRIBUTION_ID;

var cloudfrontAccessIdentity;
var cloudfront;
var invalidationId;

function connectToCloudfront() {
    var deferred = Q.defer();
    var callerReference = new Date().getTime().toString();
    var params = {
      CloudFrontOriginAccessIdentityConfig: {
        CallerReference: callerReference,
        Comment: 'deployment'
      }
    };
    cloudfront = new AWS.CloudFront();
    cloudfront.createCloudFrontOriginAccessIdentity(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        throw new Error("Can't connect to cloudfront");
      }
      else {
        cloudfrontAccessIdentity = data;
        deferred.resolve();
      }
    });
    return deferred.promise;
}


function invalidateDistribution(data) {
    var deferred = Q.defer();

    // unique string for Cloudfront
    var callerReference = new Date().getTime().toString();

    var params = {
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: callerReference,
        Paths: {
          Quantity: 1,
          Items: [
            '/index.html'
          ]
        }
      }
    };

    cloudfront.createInvalidation(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        throw new Error("Can't create invalidation");
        deferred.resolve();
      }
      else {
        invalidationId = data['Invalidation']['Id'];
        console.log("Invalidation created: " + invalidationId);
        deferred.resolve();
        }
    });
    return deferred.promise;
}

Q.fcall(connectToCloudfront)
.then(invalidateDistribution)
.catch(function (error) {
    console.log(error);
})
.done();
