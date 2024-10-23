import {NextResponse} from 'next/server'
import {verifyChallenge} from '@/lib/challenges'

export async function POST(request: Request) {
    const {challengeId, password} = await request.json()

    try {
        const isCorrect = await verifyChallenge(challengeId, password)
        const headers = new Headers();
        if (isCorrect) {
            return NextResponse.json({success: true}, {headers});
        } else {
            return NextResponse.json({success: false, message: '密码不正确，请重试。'}, {status: 400, headers});
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: '验证过程中出现错误。'}, {status: 500})
    }
}


export async function GET() {
    const headers = new Headers();
    headers.append('X-Flag-Secret', 'hqdu-eIlu6uDv(uncp-combod');
    headers.append('X-Offset', '10');
    headers.append('X-Flag', 'flag{d0_n0t_3xp0s3_y0ur_s3cr3t5}');
    return NextResponse.json({hint: "统一且和谐的偏移，或许是隐藏的关键。"}, {headers});
}

