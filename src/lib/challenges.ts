export interface Challenge {
    id: number;
    title: string;
    hint: string;
    verifyPassword: (password: string) => Promise<boolean>;
}

const challenges: Challenge[] = [
    {
        id: 1,
        title: "FLAG IN REQUEST",
        hint: "总有不经意的字段在每时每刻上演着 FLAG 的传递，找到它。",
        verifyPassword: async (password: string) => {
            // 等待 500 毫秒验证
            await new Promise(resolve => setTimeout(resolve, 500));
            return password === 'xgtk-uYbk6kTl(kdsf-secret';
        }
    },
    {
        id: 2,
        title: "JUST A SIGNATURE",
        hint: "签名是为了验证数据的完整性和来源，保存数据并不安全。",
        verifyPassword: async (password: string) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return password === "sign-is-not-safe.^&*("
        }
    },
    {
        id: 3,
        title: "FRONTEND CHALLENGE",
        hint: "React状态更新的秘密 prevCount -> ?",
        verifyPassword: async (password: string) => {
            const correctAnswer = "setCount(prevCount => prevCount + 1)";
            return password.replace(/\s+/g, '') === correctAnswer.replace(/\s+/g, '');
        }
    },
    {
        id: 4,
        title: "CREATE INDEX",
        hint: "优化这个数据库查询：SELECT * FROM users WHERE age > 18 AND country = 'China' ORDER BY created_at DESC LIMIT 100;",
        verifyPassword: async (password: string) => {
            return password.toLowerCase().includes('create index') &&
                password.toLowerCase().includes('age') &&
                password.toLowerCase().includes('country') &&
                password.toLowerCase().includes('created_at');
        }
    },
];

export async function getChallenges(): Promise<Omit<Challenge, 'verifyPassword'>[]> {
    return challenges.map(({id, title, hint}) => ({id, title, hint}));
}

export async function verifyChallenge(challengeId: number, password: string): Promise<boolean> {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) {
        throw new Error('Challenge not found');
    }
    return challenge.verifyPassword(password);
}
