process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');
 
const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkxWWpJellXRTNOVGcxTXpFNE5EZGpNVE14T1dVNU5pSXNJbVZ0WVdsc0lqb2lhMmx1WjNOc1pYa3daMEJuYldGcGJDNWpiMjBpTENKcFlYUWlPakUzTURZeE56a3lORGg5Lm83ejQ4UG14UDVEMElUWGVQcktvbEY4ZHlsME0yRHNhZWxfNlM4WHp6SFUifQ==';
 
const doRequest = async () => {
  const { data } = await axios.post(
    `https://k-hotels.dev/api/hotels/65b23b22c0b3ced226556c92/room`,
    { title: 'nice room', price: 70, userId : '65b23aa758531847c1319e96' },
    {
      headers: { cookie },
    }
  );
  
   await axios.put(
    `https://k-hotels.dev/api/hotels/room/${data.id}`,
    { title: 'nice room', price: 80, userId : '65b23aa758531847c1319e96' },
    {
      headers: { cookie },
    }
  );
 
   axios.put(
    `https://k-hotels.dev/api/hotels/room/${data.id}`,
    { title: 'nice room', price: 90, userId : '65b23aa758531847c1319e96' },
    {
      headers: { cookie },
    }
  );
 
  console.log('Request complete');
};
 
(async () => {
  for (let i = 0; i < 400; i++) {
    doRequest();
  }
})();