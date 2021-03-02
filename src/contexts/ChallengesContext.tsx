import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import { LevelUpModal } from '../components/LevelUpModal'

import challenges from '../../challenges.json'

interface Challenge {
  type: string;
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceNextLevel: number;
  activeChallenge: Challenge;
  completeChallenge: () => void;
  resetChallenge: () => void;
  levelUp: () => void;
  startNewChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...res  }: ChallengesProviderProps) {
  const [level, setLevel] = useState(res.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(res.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(res.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLEvelModalOpen, setIsLEvelModalOpen] = useState(false)

    const experienceNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
      Notification.requestPermission();
    }, [])

    useEffect(() => {
      Cookies.set('level', String(level))
      Cookies.set('currentExperience', String(currentExperience))
      Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
      setLevel(level + 1)
      setIsLEvelModalOpen(true)
      new Audio('/levelup.wav ').play();
    }
    
    function closeLevelUpModal() {
      setIsLEvelModalOpen(false)
    }

    function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge)

      new Audio('/notification.mp3 ').play();

      if(Notification.permission == 'granted') {
        new Notification('Ciclo concluido!', {
          body: 'Preparado para o Desafio?'
        })
      }
    }

    function resetChallenge() {
      setActiveChallenge(null)
    }

    function completeChallenge() {
      if(!activeChallenge) {
        return;
      }

      const { amount } = activeChallenge
      let finalExperience = currentExperience + amount

      if(finalExperience >= experienceNextLevel ) {
        finalExperience = finalExperience - experienceNextLevel;
        levelUp()
       }

       setCurrentExperience(finalExperience)
       setActiveChallenge(null)
       setChallengesCompleted(challengesCompleted + 1)

    }

    return (
      <ChallengesContext.Provider value={{ 
          level,
          levelUp,
          currentExperience,
          challengesCompleted,
          startNewChallenge,
          activeChallenge,
          resetChallenge,
          experienceNextLevel,
          completeChallenge,
          closeLevelUpModal
        }}
       >
        {children}

        {isLEvelModalOpen && <LevelUpModal />}
      </ChallengesContext.Provider>
      )
  }