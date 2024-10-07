import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { Rocket, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface SpaceObjectProps {
  id: number; // Add unique identifier
  type: 'debris' | 'satellite';
  position: { x: number; y: number };
  onCollect: () => void;
}

const SpaceObject = ({ id, type, position, onCollect }: SpaceObjectProps) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: position.x,
      y: position.y,
      transition: { duration: 0.5 },
    })
  }, [position, controls])

  return (
    <motion.div
      className={`absolute ${type === "debris" ? "text-red-500" : "text-green-500"}`}
      style={{ left: 0, top: 0 }}
      animate={controls}
      onClick={onCollect}
    >
      {type === "debris" ? <Trash2 size={24} /> : <Rocket size={24} />}
    </motion.div>
  )
}

export default function SpaceDebrisCleanup() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(false)
  const [spaceObjects, setSpaceObjects] = useState<SpaceObjectProps[]>([])
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const endGame = useCallback(() => {
    setGameActive(false)
    toast({
      title: "Game Over!",
      description: `You collected ${score} pieces of space debris.`,
    })
  }, [toast, score])

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      endGame()
    }
  }, [gameActive, timeLeft, endGame])

useEffect(() => {
  if (gameActive) {
    const interval = setInterval(spawnSpaceObject, 1000);
    return () => clearInterval(interval);
  }
}, [gameActive]); 

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(60)
    setSpaceObjects([])
  }

  const spawnSpaceObject = () => {
    if (gameAreaRef.current) {
      const { width, height } = gameAreaRef.current.getBoundingClientRect()
      const newObject: SpaceObjectProps = {
        id: Date.now(), // Assign unique identifier
        type: Math.random() > 0.2 ? "debris" : "satellite",
        position: {
          x: Math.random() * (width - 24),
          y: Math.random() * (height - 24),
        },
        onCollect: () => collectObject(Date.now(), newObject.type),
      }
      setSpaceObjects((prev) => [...prev, newObject])
    }
  }

  const collectObject = (id: number, type: 'debris' | 'satellite') => {
    if (type === "debris") {
      setScore((prev) => prev + 1)
    } else {
      setTimeLeft((prev) => Math.max(0, prev - 5))
      toast({
        title: "Oops!",
        description: "You hit a satellite! -5 seconds.",
        variant: "destructive",
      })
    }
    setSpaceObjects((prev) => prev.filter((obj) => obj.id !== id))
  }

  return (
    <section className="relative min-h-screen rounded-3xl border border-white w-full overflow-hidden bg-black py-16 text-white">
      <div className="stars absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-4 text-center text-6xl font-extrabold tracking-tight text-yellow-300 sm:text-7xl md:text-8xl"
        >
          Space Debris Cleanup
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12 text-center text-3xl font-bold text-gray-300"
        >
          Help clean up space junk and protect our satellites!
        </motion.p>

        <div className="mb-8 flex justify-between">
          <div className="text-2xl font-bold">Score: {score}</div>
          <div className="text-2xl font-bold">Time: {timeLeft}s</div>
        </div>

        <div className="mb-8 w-full">
          <Progress value={(timeLeft / 60) * 100} className="h-4" />
        </div>

        <div
          ref={gameAreaRef}
          className="relative mb-8 h-[400px] w-full rounded-lg border-4 border-gray-700 bg-gray-900"
        >
          {spaceObjects.map((obj) => (
            <SpaceObject
              key={obj.id} // Use the unique id as key
              id={obj.id} // Provide id prop to SpaceObject
              type={obj.type}
              position={obj.position}
              onCollect={obj.onCollect}
            />
          ))}
          {!gameActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <Button onClick={startGame} size="lg" className="text-2xl">
                Start Cleanup Mission
              </Button>
            </div>
          )}
        </div>

        <div className="text-center">
          <h3 className="mb-4 text-3xl font-bold text-yellow-300">How to Play</h3>
          <ul className="list-inside list-disc text-left text-xl">
            <li>Click on the space debris (trash icons) to collect them</li>
            <li>Avoid clicking on satellites (rocket icons)</li>
            <li>Collect as much debris as possible in 60 seconds</li>
            <li>Hitting a satellite will reduce your time by 5 seconds</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .stars {
          overflow: hidden;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 5s infinite;
        }
        @keyframes twinkle {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
