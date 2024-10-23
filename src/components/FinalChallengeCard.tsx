import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {Send} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

interface FinalChallengeCardProps {
    finalPassword: string
    setFinalPassword: React.Dispatch<React.SetStateAction<string>>
    finalError: string
    finalSuccess: string
    handleFinalSubmit: (e: React.FormEvent) => void
}

const FinalChallengeCard: React.FC<FinalChallengeCardProps> = ({
                                                                   finalPassword, setFinalPassword, finalError, finalSuccess, handleFinalSubmit
                                                               }) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3">
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-center text-white"> 最终题目 </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-300 text-center">
                        功在当下，利在千秋，珍惜现在也许就是揭开所有疑惑的方式
                    </p>
                    <form onSubmit={handleFinalSubmit} className="flex flex-col space-y-4">
                        <Input
                            type="password"
                            value={finalPassword}
                            onChange={(e) => setFinalPassword(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="输入最终密码"
                        />
                        <Button type="submit" variant="outline"
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                            <Send className="h-4 w-4 mr-2"/>
                            提交
                        </Button>
                        <AnimatePresence>
                            {finalError && (
                                <motion.p
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    {finalError}
                                </motion.p>
                            )}
                            {finalSuccess && (
                                <motion.p
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    className="text-green-500 text-sm mt-2"
                                >
                                    {finalSuccess}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default FinalChallengeCard
