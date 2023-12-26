// Import the required modules
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the id_card_number from the query parameters
  const { id_card_number } = req.query;

  // Define the URL and headers
  const url = `https://customerapi.cattelecom.com/dev/customerapi/v200/search/customer?id_card_number=${id_card_number}&is_active=true&service_types=[150]`;
  const headers = { 'apikey': 'f0b378fc-c03e-42e2-af86-ce712e731c06' };

  // Fetch data from the API
  const response = await fetch(url, { method: 'GET', headers: headers });

  // Parse the response to JSON
  const data = await response.json();

  // Send the data as the response
  res.status(200).json(data);
}
