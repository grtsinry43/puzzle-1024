'use client';

import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import Confetti from 'react-confetti'
import ChallengeCard from './ChallengeCard'
import FinalChallengeCard from './FinalChallengeCard'
import FrontendChallenge from './FrontendChallenge'
import {Challenge} from '@/lib/challenges'

interface DecryptionGameProps {
    initialChallenges: Omit<Challenge, 'verifyPassword'>[]
}

export default function DecryptionGame({initialChallenges}: DecryptionGameProps) {
    const [challenges] = useState(initialChallenges)
    const [unlockedChallenges, setUnlockedChallenges] = useState([1])
    const [passwords, setPasswords] = useState<string[]>(Array(initialChallenges.length).fill(''))
    const [brightness, setBrightness] = useState(20)
    const [errors, setErrors] = useState<string[]>(Array(initialChallenges.length).fill(''))
    const [successes, setSuccesses] = useState<string[]>(Array(initialChallenges.length).fill(''))
    const [showConfetti, setShowConfetti] = useState(false)
    const [finalPassword, setFinalPassword] = useState('')
    const [finalError, setFinalError] = useState('')
    const [finalSuccess, setFinalSuccess] = useState('')
    const [allChallengesCompleted, setAllChallengesCompleted] = useState(false)

    useEffect(() => {
        fetch('/api/verify', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
    }, []);

    useEffect(() => {
        if (unlockedChallenges.includes(2)) {
            fetch('/api/user', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
        }
    }, [unlockedChallenges]);

    useEffect(() => {
        setBrightness(20 + (unlockedChallenges.length - 1) * 20)
        if (unlockedChallenges.length === challenges.length) {
            setAllChallengesCompleted(true)
        }
    }, [unlockedChallenges, challenges.length])

    const handleSubmit = async (e: React.FormEvent, challengeId: number) => {
        e.preventDefault()
        setErrors(errors.map((err, idx) => idx === challengeId - 1 ? '' : err))
        setSuccesses(successes.map((succ, idx) => idx === challengeId - 1 ? '' : succ))

        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({challengeId, password: passwords[challengeId - 1]}),
            })

            if (response.ok) {
                setSuccesses(successes.map((succ, idx) => idx === challengeId - 1 ? '密码正确！解锁下一关。' : succ))
                if (challengeId < challenges.length) {
                    setUnlockedChallenges([...unlockedChallenges, challengeId + 1])
                }
                setPasswords(passwords.map((pwd, idx) => idx === challengeId - 1 ? '' : pwd))
            } else {
                const data = await response.json()
                setErrors(errors.map((err, idx) => idx === challengeId - 1 ? data.message || '密码不正确，请重试。' : err))
            }
        } catch (error) {
            console.log(error)
            setErrors(errors.map((err, idx) => idx === challengeId - 1 ? '验证过程中出现错误，请重试。' : err))
        }
    }

    const handleFrontendChallengeSolve = (password: string) => {
        setPasswords(passwords.map((pwd, idx) => idx === 2 ? password : pwd))
        setUnlockedChallenges([...unlockedChallenges, 4]) // 解锁下一个挑战
        handleSubmit({
            preventDefault: () => {
            }
        } as React.FormEvent, 3)
    }

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFinalError('')
        setFinalSuccess('')
        if (+finalPassword > 1729699200 && +finalPassword < 1729785600) {
            setFinalSuccess('最终密码正确！')
            setShowConfetti(true)
            alert('恭喜！')
        } else {
            setFinalError('最终密码不正确，请重试。')
        }
    }

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden transition-all duration-1000"
             style={{filter: `brightness(${brightness}%)`}}>
            {showConfetti && <Confetti/>}
            {challenges.map((challenge, index) => (
                challenge.id === 3 && unlockedChallenges.includes(3) ? (
                    <motion.div
                        key={challenge.id}
                        className="absolute w-1/3 h-1/3 bottom-4 left-4"
                        initial={{opacity: 0.3, filter: 'blur(10px)'}}
                        animate={{opacity: 1, filter: 'blur(0px)'}}
                        transition={{duration: 0.5}}
                    >
                        <FrontendChallenge onSolve={handleFrontendChallengeSolve}/>
                    </motion.div>
                ) : (
                    <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        index={index}
                        unlockedChallenges={unlockedChallenges}
                        passwords={passwords}
                        errors={errors}
                        successes={successes}
                        handleSubmit={handleSubmit}
                        setPasswords={setPasswords}
                    />
                )
            ))}
            {allChallengesCompleted && (
                <FinalChallengeCard
                    finalPassword={finalPassword}
                    setFinalPassword={setFinalPassword}
                    finalError={finalError}
                    finalSuccess={finalSuccess}
                    handleFinalSubmit={handleFinalSubmit}
                />
            )}
        </div>
    )
}
