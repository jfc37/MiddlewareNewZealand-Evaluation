const axios = require("axios");
const xmlConverter = require("xml-js");

module.exports.XML_ENDPOINT =
  "https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api";

/**
 * Returns true if url matches the expected endpoint
 * Valid endpoint is /companies/{some id}
 * @param {string} url
 */
module.exports.isValidEndpoint = function (url) {
  const hasIncorrectNumberOfUrlParts = url.split("/").length !== 3;
  if (hasIncorrectNumberOfUrlParts) {
    return false;
  }

  const [_, resource, id] = url.split("/");
  const isMissingId = !id;
  if (isMissingId) {
    return false;
  }

  const isIncorrectResourse = resource !== "companies";
  if (isIncorrectResourse) {
    return false;
  }

  const isIdNumeric = !isNaN(Number(id));

  return isIdNumeric;
};

/**
 * Given a url, returns the id segment
 * Assumes url has already been validated and is correctly formatted
 * @param {string} url
 * @returns id
 */
module.exports.getIdFromRoute = function (url) {
  const [id] = url.split("/").reverse();
  return id;
};

/**
 * Calls the XML endpoint for the id passed in
 * Will return an object containing:
 * - xml string if successful
 * - error response status if unsuccessful
 * @param {string} id
 * @returns {
 *  xml?: string,
 *  error?: string
 * }
 */
module.exports.getXmlFromFile = async function (id) {
  const url = `${exports.XML_ENDPOINT}/${id}.xml`;
  try {
    const response = await axios.get(url);
    return { xml: response.data };
  } catch (error) {
    if (error.response.status === 404) {
      return { error: "404" };
    } else {
      return { error: "500" };
    }
  }
};

module.exports.xmlToObject = function (xml) {
  const xmlObject = xmlConverter.xml2js(xml, { compact: true });

  const company = {
    id: Number(xmlObject.Data.id._text),
    name: xmlObject.Data.name._text,
    description: xmlObject.Data.description._text,
  };
  return company;
};
