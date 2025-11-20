const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {

  const responses = await Promise.all(urls.map(httpGet))

  const messages = responses.map(({ status, body }) => {

    try {
      const { message } = JSON.parse(body);

      switch (status) {
        case 200: return { 'Arnie Quote': message }
        case 500: return { 'FAILURE': 'Your request has been terminated' }
        default: return { 'FAILURE': 'Not implemented error' }
      }



    } catch (error) {

      console.error("Error parsing JSON", error.message);
      return { 'FAILURE': 'Your request has been terminated' }

    }

  })

  return messages
};

module.exports = {
  getArnieQuotes,
};
