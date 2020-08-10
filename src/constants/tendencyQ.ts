export const TENDENCYQUESTIONS: question[][] = [
    [{ type: 'E', q: '단체활동을 좋아한다.' }, { type: 'I', q: '개인적인 활동을 좋아한다.' }],
    [{ type: 'S', q: '실용적이면서 현실적' }, { type: 'N', q: '미래를 추구하고 이상적이다.' }],
    [{ type: 'T', q: '객관적이고 합리적이다.' }, { type: 'F', q: '감정표현에 예민하고 공감적' }],
    [{ type: 'J', q: '결단력이 있고 철저하며 조직적' }, { type: 'P', q: '융퉁성이 있고 편안함을 선호' }]
]

type question = {
    type: string;
    q: string;
}