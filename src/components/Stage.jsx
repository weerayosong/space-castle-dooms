import { useGame } from '../context/GameContext'

const Stage = () => {
    const { pos, map, level, discovered, playerName, loopCount, maxDeck } =
        useGame()

    // ดึงข้อมูลห้องปัจจุบันจากพิกัด (x,y)
    const currentRoom = map[`${pos.x},${pos.y}`]

    // คำนวณความยากตามสูตรใน generateMap
    const hazardRate = Math.min(0.2 + level * 0.02, 0.45)
    const threatLevel = Math.floor(hazardRate * 100)
    const extraDmg = Math.min(15, Math.floor(level * 1.5))

    // ฟังก์ชันวาด Minimap 4x4
    const renderMinimap = () => {
        let cells = []
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const isCurrent = x === pos.x && y === pos.y
                const isKnown = discovered.has(`${x},${y}`)

                let cellClass = 'w-2.5 h-2.5 rounded-[2px] transition-colors '
                if (isCurrent) cellClass += 'bg-gray-900 animate-pulse'
                else if (isKnown) cellClass += 'bg-gray-300'
                else cellClass += 'bg-gray-100'

                cells.push(<div key={`${x}-${y}`} className={cellClass}></div>)
            }
        }
        return <div className="grid grid-cols-4 gap-0.5">{cells}</div>
    }

    return (
        <div className="flex-1 min-h-40 flex flex-col items-center justify-center relative bg-white p-4 z-10 w-full">
            {/* ซ้ายบน: Minimap */}
            <div className="absolute top-3 left-3 flex flex-col items-start">
                <div className="text-[10px] text-gray-400 font-bold font-sans tracking-widest mb-1.5">
                    POS: [{pos.x},{pos.y}]
                </div>
                <div className="p-1 border border-gray-200 bg-gray-50 rounded-sm">
                    {renderMinimap()}
                </div>
            </div>

            {/* ขวาบน: ชื่อยานและผู้เล่น */}
            <div className="absolute top-3 right-3 flex flex-col items-end">
                <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-sans animate-beacon">
                        Space Castle
                    </div>
                </div>
                <div className="text-[8px] font-normal text-gray-500 uppercase font-sans tracking-wider whitespace-nowrap">
                    Lt. {playerName}
                </div>
            </div>

            {/* เพิ่มส่วนนี้: มุมซ้ายล่าง (THREAT ANALYSIS) */}
            <div className="absolute bottom-3 left-3 flex flex-col items-start text-[9px] uppercase font-sans text-gray-400 gap-1">
                <div className="tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    THREAT:{' '}
                    <span className="font-bold text-gray-900">
                        {threatLevel}%
                    </span>
                </div>
                <div className="tracking-widest">
                    EST. DMG:{' '}
                    <span className="font-bold text-gray-900">+{extraDmg}</span>
                </div>
            </div>

            {/* ขวาล่าง: แสดงสถิติ Cycle และ Max Deck */}
            <div className="absolute bottom-3 right-3 flex flex-col items-end text-[9px] uppercase font-sans text-gray-400 text-right gap-1 whitespace-nowrap">
                <div className="tracking-widest flex items-center gap-2">
                    CYCLE{' '}
                    <span className="font-bold text-gray-900 text-[11px]">
                        {loopCount.toString().padStart(3, '0')}
                    </span>
                </div>
                <div className="tracking-widest flex items-center gap-2">
                    MAX DECK{' '}
                    <span className="font-bold text-gray-900 text-[11px]">
                        {maxDeck.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* ตรงกลาง: กราฟิกห้องปัจจุบัน */}
            {currentRoom && (
                <div className="flex flex-col items-center w-full fade-in pointer-events-none mt-2">
                    <div className="font-bold text-sm tracking-widest text-gray-900 font-sans mb-3">
                        {currentRoom.name}
                    </div>
                    <div
                        className={`${currentRoom.shape} mb-2 flex items-center justify-center font-bold text-xl font-sans text-gray-900 bg-white shadow-sm transition-all`}
                    >
                        {currentRoom.content || ''}
                    </div>
                    <div className="h-4 flex items-center justify-center">
                        {currentRoom.type === 'loot' &&
                            currentRoom.searched && (
                                <span className="text-[10px] font-bold text-gray-400 tracking-widest">
                                    [ ค้นหาแล้ว ]
                                </span>
                            )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Stage
