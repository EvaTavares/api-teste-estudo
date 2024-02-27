import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';

describe('Tweet test', () => {
  // teste de unidade
  describe('Tweet tests', () => {
    describe('Tweet Class', () => {
      it('should create a tweet', () => {
        const tweetProps: Tweet = {
          content: 'Hello world',
          screen_name: 'Eva Tavares',
        };

        const tweet = new Tweet(tweetProps);

        expect(tweet.content).toBe(tweetProps.content);
        expect(tweet.screen_name).toBe(tweetProps.screen_name);
      });
    });

    // teste de integração - com banco de dados - mais lento e mais custoso que unitário
    describe('Using MongoDB', () => {
      let conn: mongoose.Mongoose; //não conseguimos injetar dependencias aqui no arquivo de teste

      // para conectar
      beforeEach(async () => {
        const host = 'localhost';
        conn = await mongoose.connect(`mongodb://root:root@${host}:27017/tweets_entity_test?authSource=admin`);
      });

      // para desconectar
      afterEach(async () => {
        await conn.disconnect();
      });

      it('Create a tweet document', async () => {
        const tweetProps: Tweet = {
          content: 'Hello world',
          screen_name: 'Eva Tavares',
        };

        const TweetModel = conn.model('Tweet', TweetSchema);
        const tweet = new TweetModel(tweetProps);
        await tweet.save();

        const tweetCreated = await TweetModel.findById(tweet._id);

        expect(tweetCreated.content).toBe(tweetProps.content);
        expect(tweetCreated.screen_name).toBe(tweetProps.screen_name);
      });
    });
  });
});
