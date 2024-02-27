import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TweetDocument = Tweet & Document;

export type TweetProps = {
  content: string;
  screen_name: string;
};

// document === linha
// colection === table
@Schema()
export class Tweet {
  constructor(props: TweetProps) {
    Object.assign(this, props); //cria esses atributos dentro da classe, sem precisar declarar
  }

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  screen_name: string;
}

// instancia do schema
export const TweetSchema = SchemaFactory.createForClass(Tweet);
