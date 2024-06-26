/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:9999/api',
    API_URL_DICE: 'http://localhost:9991/api',
    API_URL_WSK: 'http://localhost:8089',
    URL_GAME: 'http://localhost:3000',
    URL_MAIN: 'http://localhost:3002',
    HOST_KU: 'https://vn.vc3559k.net/api',
    LINK_CHAT: "https://tawk.to/chat/665fcd249a809f19fb391e9e/1hvj3ilu7"
  },
  
  // dev environment
  // env: {
  // URL_MAIN: 'https://vk169.net',
  //   API_URL: 'https://api.vk169.net/api',
  //   API_URL_DICE: 'https://game.api.vk169.net/api',
  //   API_URL_WSK: 'https://game.wsk.vk169.net',
  //   URL_GAME: 'https://game.vk169.net',
  //   HOST_KU: 'https://vn.vc3559k.net/api',
  //   LINK_CHAT: "https://tawk.to/chat/665fcd249a809f19fb391e9e/1hvj3ilu7"
  // },

  // Production environment
  // env: {
  //   URL_MAIN: 'https://ku3933d.net',
  //   API_URL: 'https://api.ku3933d.net/api',
  //   API_URL_DICE: 'https://api-game.ku3933d.net/api',
  //   API_URL_WSK: 'https://ws.ku3933d.net',
  //   URL_GAME: 'https://game.ku3933d.net',
  //   LINK_CHAT: "https://tawk.to/chat/665fcd249a809f19fb391e9e/1hvj3ilu7"
  // },
  images: {
    domains: ['storage.googleapis.com', "api.vietqr.io", "vietqr.net"],
  },
};

export default nextConfig;
