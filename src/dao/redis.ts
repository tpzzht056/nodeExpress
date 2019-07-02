import redis from 'redis';
import { redisOptions } from '../config';

export let redisClient = redis.createClient(redisOptions);