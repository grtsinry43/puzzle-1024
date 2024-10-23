import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {Lock, Unlock, Send} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Challenge} from '@/lib/challenges'

interface ChallengeCardProps {
    challenge: Omit<Challenge, 'verifyPassword'>
    index: number
    unlockedChallenges: number[]
    passwords: string[]
    errors: string[]
    successes: string[]
    handleSubmit: (e: React.FormEvent, challengeId: number) => void
    setPasswords: React.Dispatch<React.SetStateAction<string[]>>
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
                                                         challenge,
                                                         index,
                                                         unlockedChallenges,
                                                         passwords,
                                                         errors,
                                                         successes,
                                                         handleSubmit,
                                                         setPasswords
                                                     }) => {
    return (
        <motion.div
            className={`absolute w-1/3 h-1/3 ${
                index === 0 ? 'top-4 left-4' :
                    index === 1 ? 'top-4 right-4' :
                        index === 2 ? 'bottom-4 left-4' : 'bottom-4 right-4'
            }`}
            initial={{opacity: 0.3, filter: 'blur(10px)'}}
            animate={{
                opacity: unlockedChallenges.includes(challenge.id) ? 1 : 0.3,
                filter: unlockedChallenges.includes(challenge.id) ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{duration: 0.5}}
        >
            <Card className="h-full bg-gray-900 border-gray-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <CardTitle className="flex items-center text-white">
                        {unlockedChallenges.includes(challenge.id) ? (
                            <Unlock className="mr-2 text-green-300"/>
                        ) : (
                            <Lock className="mr-2 text-red-300"/>
                        )}
                        {challenge.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-gray-300">{challenge.hint}</p>
                    {unlockedChallenges.includes(challenge.id) && (
                        <form onSubmit={(e) => handleSubmit(e, challenge.id)} className="flex flex-col space-y-4">
                            <Input
                                type="password"
                                value={passwords[challenge.id - 1]}
                                onChange={(e) => setPasswords(passwords.map((pwd, idx) => idx === challenge.id - 1 ? e.target.value : pwd))}
                                className="bg-gray-700 border-gray-600 text-white"
                                placeholder="输入解密密码"
                                disabled={!!successes[challenge.id - 1]} // Disable input if the challenge is successful
                            />
                            <Button type="submit" variant="outline"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                                    disabled={!!successes[challenge.id - 1]} // Disable button if the challenge is successful
                            >
                                <Send className="h-4 w-4 mr-2"/>
                                提交
                            </Button>
                            <AnimatePresence>
                                {errors[challenge.id - 1] && (
                                    <motion.p
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -10}}
                                        className="text-red-500 text-sm mt-2"
                                    >
                                        {errors[challenge.id - 1]}
                                    </motion.p>
                                )}
                                {successes[challenge.id - 1] && (
                                    <motion.p
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -10}}
                                        className="text-green-500 text-sm mt-2"
                                    >
                                        {successes[challenge.id - 1]}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </form>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default ChallengeCard
