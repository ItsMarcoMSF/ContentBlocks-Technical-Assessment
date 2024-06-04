const API_URL = "https://healthy-chigger-63.clerk.accounts.dev/v1";

export const signin = async (reqBody) => {
    // create an array of key-value pairs for the request body
    let formBody = [];

    // encode the body of the request
    for (let key in reqBody) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(reqBody[key]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    // join the array into a single string with '&' as the separator
    formBody = formBody.join("&");
    
    // create the request options, body is the encoded form body
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: formBody,
        mode: 'cors',
    };

    // create the request URL
    const reqURL = `${API_URL}/client/sign_ins?_clerk_js_version=5.5.3&__clerk_db_jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMmhETEx6QTBSVnl4Ym9PNU9RMkE1MFpnSFlPIiwiaWQiOiJjbGllbnRfMmhJbUlPVGhNUkxKZzNwVHNXQVlwazRXQ3lvIiwicm90YXRpbmdfdG9rZW4iOiJ3cm5rY2lvOGx3eW5oYnZwYmgzaGkycTc3OXVoOGl3MGdua2ZlYmYxIn0.jxwIGx2O4EaP0m1QZErGOuVs_iA9wG_3MVl6FJgB06Z7j92cEJiUliVelZmHtwE_USp2TyzXa5wVBn9m6k1doBM5FBM49KvoTMLxkkFmTVV8wXcGR_4xVoPXOHxnQkKpY1BDJVf8Xqls5RLgoOM4sQXkxIAquHrQ7sz8P82QNQiB8bswqIeq2AsIz24g3y2sQKPuzo4qQztzWX-QAWjXAhlZjYLK6qNq9TobAKwyFMtPsO3UiFdLerrpjf3EnM5VOEJ5KELXXOZT80-9wEjnXKcKAQzqZXfEDOC9RpXeY_HuGjfxRLnEmdXstYfff2Lhhe5ZneD5SpCleGuOZxOuig`;
    
    // make the request
    const response = await fetch(reqURL, requestOptions);

    console.log(response);

    // parse and return the response
    const data = await response.json();
    return data;
};

export const signup = async (reqBody) => {
    // create an array of key-value pairs for the request body
    let formBody = [];

    // encode the body of the request
    for (let key in reqBody) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(reqBody[key]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    // join the array into a single string with '&' as the separator
    formBody = formBody.join("&");

    // create the request options, body is the encoded form body
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: formBody,
        mode: 'cors',
    };

    // create the request URL
    const reqURL = `${API_URL}/client/sign_ups?_clerk_js_version=5.5.3&__clerk_db_jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMmhETEx6QTBSVnl4Ym9PNU9RMkE1MFpnSFlPIiwiaWQiOiJjbGllbnRfMmhJbUlPVGhNUkxKZzNwVHNXQVlwazRXQ3lvIiwicm90YXRpbmdfdG9rZW4iOiJ3cm5rY2lvOGx3eW5oYnZwYmgzaGkycTc3OXVoOGl3MGdua2ZlYmYxIn0.jxwIGx2O4EaP0m1QZErGOuVs_iA9wG_3MVl6FJgB06Z7j92cEJiUliVelZmHtwE_USp2TyzXa5wVBn9m6k1doBM5FBM49KvoTMLxkkFmTVV8wXcGR_4xVoPXOHxnQkKpY1BDJVf8Xqls5RLgoOM4sQXkxIAquHrQ7sz8P82QNQiB8bswqIeq2AsIz24g3y2sQKPuzo4qQztzWX-QAWjXAhlZjYLK6qNq9TobAKwyFMtPsO3UiFdLerrpjf3EnM5VOEJ5KELXXOZT80-9wEjnXKcKAQzqZXfEDOC9RpXeY_HuGjfxRLnEmdXstYfff2Lhhe5ZneD5SpCleGuOZxOuig`;
    
    // make the request
    const response = await fetch(reqURL, requestOptions);

    console.log(response);

    // parse and return the response
    const data = await response.json();
    return data;

};