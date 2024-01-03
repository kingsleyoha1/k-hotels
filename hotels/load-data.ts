process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');
 
const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkxT0dSbE1qQmpZakpqWXpCa1pEVmxPRGRtWWpkbFpDSXNJbVZ0WVdsc0lqb2lhMmx1WjNOc1pYa3daMEJuYldGcGJDNWpiMjBpTENKcFlYUWlPakUzTURReE1UVXlPVFo5LjZfMTIyck5pUjhyZ3NfTUttdTBZZk5XclNETVhGeWQwdDJOVjBycl9aZXcifQ==';
 
const doRequest = async () => {
  const { data } = await axios.post(
    `https://k-hotels.dev/api/hotels/65956f3472bcca0d3187277e/room`,
    { title: 'nice room', price: 70, userId : '658de20cb2cc0dd5e87fb7ed' },
    {
      headers: { cookie },
    }
  );
  
   await axios.put(
    `https://k-hotels.dev/api/hotels/room/${data.id}`,
    { title: 'nice room', price: 80, userId : '658de20cb2cc0dd5e87fb7ed' },
    {
      headers: { cookie },
    }
  );
 
   axios.put(
    `https://k-hotels.dev/api/hotels/room/${data.id}`,
    { title: 'nice room', price: 90, userId : '658de20cb2cc0dd5e87fb7ed' },
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