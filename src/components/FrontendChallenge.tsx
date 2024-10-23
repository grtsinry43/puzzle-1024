'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

export default function FrontendChallenge({onSolve}: { onSolve: (password: string) => void }) {
    const [count, setCount] = useState(0)
    const [userInput, setUserInput] = useState('')
    const [message, setMessage] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [unlockedChallenges, setUnlockedChallenges] = useState([1])

    const increment = () => {
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
    }

    const checkAnswer = () => {
        const correctAnswer = "setCount(prevCount => prevCount + 1)"
        if (userInput.replace(/\s+/g, '') === correctAnswer.replace(/\s+/g, '')) {
            setMessage('正确！这下会React啦😋（）！')
            setIsCorrect(true)
            onSolve(correctAnswer)
            unlockNextChallenge()
        } else {
            setMessage('不对，再试试吧！')
        }
    }

    const unlockNextChallenge = () => {
        setUnlockedChallenges([...unlockedChallenges, unlockedChallenges.length + 1])
    }

    return (
        <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500">
                <CardTitle className="text-white"> JUST React </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="text-center">
                    <p className="text-xl mb-2 text-gray-300"> 当前计数: {count}</p>
                    <Button onClick={increment} className="bg-blue-500 hover:bg-blue-600 text-white">
                        增加 4
                    </Button>
                </div>
                <p className="text-gray-300">
                    这个计数器应该每次点击增加 4，但它只增加了 1。应该怎么修复？
                </p>
                <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="输入正确的 setCount 调用"
                    className="bg-gray-700 border-gray-600 text-white"
                    disabled={isCorrect}
                />
                <Button onClick={checkAnswer}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        disabled={isCorrect}>
                    提交答案
                </Button>
                {message && (
                    <p className={`text-center ${message.includes('正确') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
