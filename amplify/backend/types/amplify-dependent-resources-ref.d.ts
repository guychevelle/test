export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "adminsGroupRole": "string"
        },
        "testAuth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "storage": {
        "test": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "AdminQueriesb70b13a7": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}