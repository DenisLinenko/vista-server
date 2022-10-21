import config from '../../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Vista-status API documentation',
    version: '0.0.1',
    description: 'This is a node express mongoose in typescript',
    license: {
      name: 'LD',
      url: 'https://github.com/DenisLinenko/vista-server.git',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development Server',
    },
  ],
};

export default swaggerDefinition;
