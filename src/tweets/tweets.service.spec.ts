import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from './entities/tweet.entity';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    const host = 'localhost';
    const uri = `mongodb://root:root@${host}:27017/tweets_service_test?authSource=admin`;
    module = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }])],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
      const tweetProps: Tweet = {
          content: 'novo teste1',
          screen_name: 'novo teste 1',
      };

      const tweet = await service.create(tweetProps);

      expect(tweet.content).toBe(tweetProps.content);
      expect(tweet.screen_name).toBe(tweetProps.screen_name);

      const tweetCreated = await service['tweetModel'].findById(tweet._id);
      expect(tweetCreated.content).toBe(tweetProps.content);
      expect(tweetCreated.screen_name).toBe(tweetProps.screen_name);
  });

  it('Should find all tweets', async () => {
    const tweetsData: Tweet[] = [
      {
        content: 'Tweet content 1 service find all test',
        screen_name: 'usuário',
      },
      {
        content: 'Tweet content 2 service find all test',
        screen_name: 'usuário',
      },
    ];

    await service.create(tweetsData[0]);
    await service.create(tweetsData[1]);

    const tweets = await service.findAll();

    expect(tweets).toBeDefined();
    expect(tweets.length).toBeGreaterThanOrEqual(2);

    expect(tweets).toContainEqual(expect.objectContaining(tweetsData[0]));
    expect(tweets).toContainEqual(expect.objectContaining(tweetsData[1]));
  });

  it('Should find one tweet', async () => {
    const tweetProps: Tweet = {
      content: 'tweet find one teste',
      screen_name: 'usuário',
    };

    const createdTweet = await service.create(tweetProps);

    const foundTweet = await service.findOne(createdTweet._id);

    expect(foundTweet).toBeDefined();
    expect(foundTweet.content).toBe(tweetProps.content);
    expect(foundTweet.screen_name).toBe(tweetProps.screen_name);
  });
});
