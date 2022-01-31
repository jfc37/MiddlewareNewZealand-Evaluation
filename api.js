const http = require("http");
const logic = require("./logic");

// Headers required on response to allow CORS
const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Max-Age": 2592000, // 30 days
};
const PORT = process.env.PORT || 3001;

// Launch a basic server to run the our api
const server = http.createServer(handleStaticXmlToJsonApi);
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

/**
 * Handles are request directed at our static XML file to JSON api
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function handleStaticXmlToJsonApi(req, res) {
  if (!logic.isValidEndpoint(req.url)) {
    return404Response(res);
    return;
  }

  const id = logic.getIdFromRoute(req.url);
  const xmlResponse = await logic.getXmlFromFile(id);

  if (xmlResponse.error === "500") {
    return500Response(res, {
      error: "500",
      error_description: "Call to XML endpoint failed",
    });
  } else if (xmlResponse.error === "404") {
    return404Response(res);
  } else {
    const company = logic.xmlToObject(xmlResponse.xml);
    return200Response(res, company);
  }
}

/**
 * Fulfills the response with a 404 status
 * @param {object} res
 */
function return404Response(res) {
  res.writeHead(404, HEADERS);
  res.end();
}

/**
 * Fulfills the response with a 200 status, with the body included
 * @param {object} res
 * @param {object} body
 */
function return200Response(res, body) {
  res.writeHead(200, HEADERS);
  res.write(JSON.stringify(body, null, 2));
  res.end();
}

/**
 * Fulfills the response with a 500 status, with the body included
 * @param {object} res
 * @param {object} body
 */
function return500Response(res, body) {
  res.writeHead(500, HEADERS);
  res.write(JSON.stringify(body, null, 2));
  res.end();
}
