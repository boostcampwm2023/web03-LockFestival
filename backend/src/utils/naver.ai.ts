import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverAIUtils {
  constructor(private readonly configService: ConfigService) {}
  convertSlangToNormal = async (originContent: string) => {
    console.log('start');
    console.log(this.configService.get<string>('X-NCP-APIGW-API-KEY'));
    console.log(this.configService.get<string>('X-NCP-CLOVASTUDIO-REQUEST-ID'));
    try {
      const response = await axios.post(
        'https://clovastudio.apigw.ntruss.com/testapp/v1/completions/LK-D2',
        {
          text: `주어진 원문장을 순화하시오.

원문장: 저 놈 말을 더럽게 안들어
순화된 문장: 저 사람은 남의 말을 안 들어.
###
원문장: 밤에 별빛 개이쁘더라.
순화된 문장: 밤에 별빛이 아름답네요.
###
원문장: 니가 뭘 안다고 그따위로 얘기해?

순화된 문장: 당신이 뭘 안다고 그렇게 이야기하세요?###
원문장:17일 일요일 12시50분 괜찮으신가요?
순화된 문장: 17일 일요일 오후 1시쯤 시간 어떠세요?###
원문장:${originContent}`,
          start: '\n순화된 문장:',
          restart: '###\n원문장:',
          includeTokens: true,
          topP: 0.8,
          topK: 0,
          maxTokens: 100,
          temperature: 0.3,
          repeatPenalty: 5.0,
          stopBefore: ['###', '원문장:', '순화된 문장:', '###'],
          includeAiFilters: true,
        },
        {
          headers: {
            'X-NCP-CLOVASTUDIO-API-KEY': this.configService.get<string>(
              'X-NCP-CLOVASTUDIO-API-KEY'
            ),
            'X-NCP-APIGW-API-KEY': this.configService.get<string>('X-NCP-APIGW-API-KEY'),
            'X-NCP-CLOVASTUDIO-REQUEST-ID': this.configService.get<string>(
              'X-NCP-CLOVASTUDIO-REQUEST-ID'
            ),
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      return response.data.result.outputTokens.join('');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
