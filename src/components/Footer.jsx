import { useGame } from '../context/GameContext'

const Footer = () => {
    const { setIsStarted, setIsAchvOpen } = useGame() // phase10 ดึง setIsAchvOpen มาใช้งาน

    return (
        <div className="flex-none bg-gray-50 border-t border-gray-200 px-4 py-3 flex w-full items-center text-[10px] font-sans text-gray-400 tracking-widest z-20 uppercase sm:rounded-b-sm">
            <div className="flex-1 text-left">
                {/* กดเพื่อกลับไปหน้าแรก */}
                <button
                    onClick={() => setIsStarted(false)}
                    className="hover:text-gray-900 font-bold transition-colors"
                >
                    &lt; MAIN
                </button>
            </div>

            <div className="flex-1 flex justify-center text-center">
                {/* ผูกฟังก์ชันเปิด Modal ที่ปุ่มนี้ */}
                <button
                    onClick={() => setIsAchvOpen(true)}
                    className="hover:text-gray-900 font-bold flex items-center justify-center gap-1.5 w-full"
                >
                    <span className="font-sans font-bold text-[10px] text-gray-900 border border-gray-300 bg-white px-1 rounded-sm">
                        [ ACHV ]
                    </span>
                </button>
            </div>

            <div className="flex-1 flex justify-end text-[8px] text-right whitespace-nowrap">
                <a
                    href="https://www.yosong.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900 font-bold transition-colors"
                >
                    YOSONG
                </a>
                <a
                    href="https://github.com/weerayosong/space-castle-dooms"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900 font-bold transition-colors ml-3"
                >
                    GITHUB
                </a>
            </div>
        </div>
    )
}

export default Footer
