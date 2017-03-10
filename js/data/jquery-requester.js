var jqueryRequester = (function() {
    function request(method, url, headers, data, contentType) {
        data = data || {};
        data = JSON.stringify(data);
        contentType = contentType || "application/json";

        return new Promise((resolve, reject) => {
            $.ajax(url, {
                    method,
                    headers,
                    data,
                    contentType
                })
                .done(resolve)
                .fail(reject);
        });
    }

    function post(url, headers, data, contentType) {
        return request("POST", url, headers, data, contentType);
    }

    function get(url, headers, data, contentType) {
        return request("GET", url, headers, data, contentType);
    }

    function put(url, headers, data, contentType) {
        return request("PUT", url, headers, data, contentType);
    }

    return {
        get,
        post,
        put
    };
}());

export { jqueryRequester };