process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');
 
const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkxWWpJellXRTNOVGcxTXpFNE5EZGpNVE14T1dVNU5pSXNJbVZ0WVdsc0lqb2lhMmx1WjNOc1pYa3daMEJuYldGcGJDNWpiMjBpTENKcFlYUWlPakUzTURZeE56a3lORGg5Lm83ejQ4UG14UDVEMElUWGVQcktvbEY4ZHlsME0yRHNhZWxfNlM4WHp6SFUifQ==';
 
const doRequest = async () => {
  const { data } = await axios.post(
    `https://k-hotels.dev/api/hotels/65b4b3e98878f400ab3ba075/room`,
    { title: 'A King size room with master bed', price: 820, userId : '65b23aa758531847c1319e96' },
    {
      headers: { cookie },
    }
  );
  
   await axios.put(
    `https://k-hotels.dev/api/hotels/room/${data.id}`,
    { title: 'A King size room with master bed', price: 740, userId : '65b23aa758531847c1319e96' },
    {
      headers: { cookie },
    }
  );
 
   axios.put(
    `https://k-hotels.dev/api/hotels/room/${data.id}`,
    { title: 'A King size room with master bed', price: 690, userId : '65b23aa758531847c1319e96' },
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