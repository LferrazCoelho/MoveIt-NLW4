import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://instagram.fmea2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/13696405_1582387015388930_861142832_a.jpg?_nc_ht=instagram.fmea2-1.fna.fbcdn.net&_nc_ohc=_vZioO5MJn8AX-oDG66&tp=1&oh=99a1e2e4301ecfabaf943554de52186a&oe=60610FC9" alt="Luciano Ferraz" />
            <div>
                <strong>Luciano Ferraz</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}