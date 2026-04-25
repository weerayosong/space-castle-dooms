import { createContext, useState, useContext } from 'react'

// 1. สร้าง Context
const GameContext = createContext()

// 2. สร้าง Provider (ตัวห่อหุ้มที่จะส่งข้อมูลให้ Component ลูก)
export const GameProvider = ({ children }) => {
    // --- Game States ---
    const [playerName, setPlayerName] = useState('Yosong')
    const [level, setLevel] = useState(1)
    const [o2, setO2] = useState(100)
    const [isDead, setIsDead] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [logs, setLogs] = useState(['[SYS] เริ่มต้นการจำลองระบบพยุงชีพ...'])

    // --- Game Map States ---
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [discovered, setDiscovered] = useState(new Set(['0,0']))
    // สร้างแผนที่จำลอง 4x4 ชั่วคราวเพื่อให้ UI มีข้อมูลไปแสดงผล
    const [map, setMap] = useState(() => {
        let dummyMap = {}
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                dummyMap[`${x},${y}`] = {
                    name:
                        x === 0 && y === 0
                            ? '[ แคปซูลจำศีล ]'
                            : '[ โถงทางเดิน ]',
                    shape:
                        x === 0 && y === 0
                            ? 'w-16 h-16 border-[3px] border-gray-300 text-gray-400 rotate-45 rounded-sm flex items-center justify-center font-bold text-xs'
                            : 'w-20 h-20 border border-dashed border-gray-300 rounded-full',
                    type: 'safe',
                }
            }
        }
        return dummyMap
    })

    // ฟังก์ชันพื้นฐานสำหรับเพิ่ม Log
    const addLog = (message) => {
        setLogs((prev) => [message, ...prev].slice(0, 10)) // เก็บแค่ 10 log ล่าสุด
    }

    // รวมข้อมูลและฟังก์ชันที่จะแชร์
    const value = {
        playerName,
        setPlayerName,
        level,
        setLevel,
        o2,
        setO2,
        isDead,
        setIsDead,
        isStarted,
        setIsStarted,
        logs,
        addLog,
        pos,
        setPos,
        discovered,
        setDiscovered,
        map,
        setMap,
    }

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// 3. สร้าง Hook สำหรับดึงข้อมูลไปใช้ง่ายๆ
// เพิ่มคอมเมนต์นี้ไว้ด้านบน export const useGame เพื่อปิดการเตือนเฉพาะจุด
// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}
