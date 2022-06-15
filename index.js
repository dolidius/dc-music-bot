import 'dotenv/config';
import MusicClient from './client/client.js';

const musicClient = new MusicClient();

musicClient.startClient();