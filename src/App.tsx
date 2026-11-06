
import { useState, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import './App.css'

import atractivosIcon from './assets/Atractivos.svg'
import culturaIcon from './assets/Cultura.svg'
import curiosidadesIcon from './assets/Curiosidades.svg'
import gastronomiaIcon from './assets/Gastronomia.svg'
import reciclarIcon from './assets/Reciclar.svg'
import triasicoIcon from './assets/Triasico.svg'

interface Question {
  question: string
  options: string[]
  correct: number
}

interface Theme {
  name: string
  color: string
  questions: Question[]
}

const iconMap = {
  0: atractivosIcon,
  1: curiosidadesIcon,
  2: culturaIcon,
  3: gastronomiaIcon,
  4: triasicoIcon,
  5: reciclarIcon
}

const themes: Theme[] = [
  {
    name: 'ATRACTIVOS',
    color: '#FFB643',
    questions: [
      {
        question: '¿SOBRE QUE SUCESO NATURAL HACE HINCAPIÉ EL MUSEO DE LA HISTORIA URBANA?',
        options: ['Inundación de la ciudad', 'Terremoto de 1944', 'Traslado de la ciudad'],
        correct: 1
      },
      {
        question: '¿QUÉ FUNCIÓN CUMPLÍA EL EDIFICIO DONDE SE ENCUENTRA ACTUALMENTE EL CENTRO CULTURAL ESTACIÓN SAN MARTÍN?',
        options: ['Cabildo provincial', 'Casa de Gobierno', 'Estación de trenes'],
        correct: 2
      },
      {
        question: 'ADEMÁS DE LA ESTATUA DE SARMIENTO, ¿LA ESTATUA DE QUE OTRO PRÓCER SE ENCUENTRA EN PLAZA 25 DE MAYO?',
        options: ['Fray Justo Santa María de Oro', 'Francisco N. Laprida', 'Gral. San Martín'],
        correct: 0
      },
      {
        question: '¿EN QUÉ IMPORTANTE EDIFICIO PÚBLICO SE ENCUENTRA EXPUESTA LA BANDERA CIUDADANA?',
        options: ['Casa de Gobierno', 'Legislatura provincial', 'Centro Cívico'],
        correct: 2
      },
      {
        question: '¿QUÉ ALTURA TIENE EL CAMPANIL DE LA CATEDRAL?',
        options: ['51 mts', '40 mts', '35 mts'],
        correct: 0
      }
    ]
  },
  {
    name: 'CURIOSIDADES',
    color: '#FFD180',
    questions: [
      {
        question: 'EN NUESTRA CIUDAD, EXISTE UNA ESPECIE ARBÓREA MUY PARTICULAR. ¿DE CUÁL SE TRATA?',
        options: ['Algarrobo más antiguo de San Juan', 'Palmera de dos brazos', 'Pino más alto de Argentina'],
        correct: 1
      },
      {
        question: '¿EN QUÉ ESQUINA CAPITALINA SE ENCUENTRA EL MURAL MÁS ALTO DE LA CIUDAD?',
        options: ['Av. España y Libertador', 'Av. Alem e Ignacio De La Roza', 'Av. Libertador y Las Heras'],
        correct: 1
      },
      {
        question: '¿DE QUÉ PAÍS ES ORIGINARIA LA FUENTE DE LA PLAZA 25 DE MAYO?',
        options: ['Francia', 'Inglaterra', 'Italia'],
        correct: 0
      },
      {
        question: '¿EN QUÉ PLAZA DE LA CIUDAD ENCUENTRA UBICADO EL MONOLITO DEL KM 0?',
        options: ['Plaza 25 de mayo', 'Plaza España', 'Plaza Laprida'],
        correct: 0
      },
      {
        question: '¿CON QUÉ NOMBRE ES CONOCIDA POPULARMENTE LA PLAZA HIPÓLITO YRIGOYEN?',
        options: ['Plaza de los niños', 'Plaza de la fuente', 'Plaza de la jorobita'],
        correct: 2
      }
    ]
  },
  {
    name: 'CULTURA/HISTORIA',
    color: '#FFB643',
    questions: [
      {
        question: '¿QUÉ RECONOCIDO EDUCADOR Y ESCRITOR SANJUANINO FUE PRESIDENTE DE LA NACIÓN?',
        options: ['José Ignacio De La Roza', 'Salvador María Del Carril', 'Domingo F. Sarmiento'],
        correct: 2
      },
      {
        question: '¿EL NOMBRE DE QUE IMPORTANTE ARTISTA SANJUANINO LLEVA EL MUSEO PROVINCIAL DE BELLAS ARTES?',
        options: ['Mario Pérez', 'Franklin Rawson', 'Santiago Paredes'],
        correct: 1
      },
      {
        question: '¿CON QUÉ NOMBRE ERA CONOCIDO ANTIGUAMENTE EL BARRIO DONDE SE ENCUENTRA LA CASA NATAL DE DOMINGO F. SARMIENTO?',
        options: ['El Pedernal', 'El Carrascal', 'El Algarrobo'],
        correct: 1
      },
      {
        question: '¿QUÉ ESPACIO CULTURAL SANJUANINO ES RECONOCIDO POR SU SALA DE CONCIERTOS Y SU ÓRGANO?',
        options: ['Auditorio Juan Victoria', 'Teatro Sarmiento', 'Museo Provincial de Bellas Artes'],
        correct: 0
      },
      {
        question: '¿QUÉ IMPORTANTE PRÓCER ARGENTINO SE ALOJÓ EN LA CELDA HISTÓRICA DEL CONVENTO SANTO DOMINGO?',
        options: ['Manuel Belgrano', 'José de San Martín', 'Miguel Marín de Güemes'],
        correct: 1
      }
    ]
  },
  {
    name: 'GASTRONOMÍA',
    color: '#FFD180',
    questions: [
      {
        question: '¿QUÉ CORTE DE CARNE ES EL MÁS REPRESENTATIVO DE SAN JUAN?',
        options: ['Vacío', 'Punta de espalda', 'Costillar'],
        correct: 1
      },
      {
        question: 'ADEMÁS DEL MALBEC, ¿QUÉ OTRO VARIETAL ES CARACTERÍSTICO DE LA PROVINCIA?',
        options: ['Merlot', 'Syrah', 'Sauvignon'],
        correct: 1
      },
      {
        question: '¿QUÉ FRUTO SECO ES DISTINTIVO DE SAN JUAN?',
        options: ['Pistacho', 'Avellana', 'Almendra'],
        correct: 0
      },
      {
        question: 'ADEMÁS DE LA BODEGA HAGMANN ¿QUÉ OTRA BODEGA CAPITALINA FORMA PARTE DE LA RUTA DEL VINO DE SAN JUAN?',
        options: ['Bodega Merced del Estero', 'Bodega Santiago Graffigna', 'Bodega Fabril Alto Verde'],
        correct: 1
      },
      {
        question: '¿CUÁL ES EL NOMBRE EL TÍPICO PLATO PREPARADO A BASE DE TOMATE, HUEVO Y CEBOLLA?',
        options: ['Guiso de tomate', 'Carbonada', 'Tomaticán'],
        correct: 2
      }
    ]
  },
  {
    name: 'TRIÁSICO EN LA CIUDAD',
    color: '#FFB643',
    questions: [
      {
        question: '¿EN QUÉ CALLE DE LA CIUDAD SE ENCUENTRA EL ENTE PROVINCIAL ISCHIGUALASTO?',
        options: ['Av. Ignacio De La Roza', 'Av. Libertador', 'Av. Rioja'],
        correct: 0
      },
      {
        question: '¿DÓNDE SE UBICA EL NUEVO MUSEO PALEONTOLÓGICO DE SAN JUAN?',
        options: ['Parque de Mayo', 'Plaza del Bicentenario', 'Parque Belgrano'],
        correct: 2
      },
      {
        question: '¿EN QUÉ PERÍODO DE LA ERA SECUNDARIA SE ENFOCA PRINCIPALMENTE EL MUSEO PALEONTOLÓGICO DE LA PROVINCIA?',
        options: ['Jurásico', 'Triásico', 'Cretácico'],
        correct: 1
      },
      {
        question: '¿CON QUÉ NOMBRE ES CONOCIDO POPULARMENTE EL PARQUE PROVINCIAL ISCHIGUALASTO?',
        options: ['Valle de los dinosaurios', 'Valle de la Luna', 'Valle Encantado'],
        correct: 1
      }
    ]
  },
  {
    name: 'LA CIUDAD RECICLA',
    color: '#FFD180',
    questions: [
      {
        question: '¿Cómo tienen que estar los residuos reciclable antes de entregarlos?',
        options: ['Sucios y mojados', 'Limpios y secos', 'Mezclados con restos de comida'],
        correct: 1
      },
      {
        question: '¿Cuál de estos grupos incluye materiales reciclables secos aceptados por el programa?',
        options: ['Papel, cartón, plásticos, vidrio y latas', 'Pañales usados y restos de comida', 'Cenizas y residuos sanitarios'],
        correct: 0
      },
      {
        question: '¿Qué significa separar en origen?',
        options: ['Dejarlos en la calle para que alguien los clasifique', 'Separarlos únicamente en una planta', 'Separar los residuos en el lugar donde se generan'],
        correct: 2
      }
    ]
  }
]

function App() {
  // Rotación directa de la ruleta mediante Framer Motion
  const wheelRotation = useMotionValue(0)

  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [spinCount, setSpinCount] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [availableThemes, setAvailableThemes] = useState<number[]>([0, 1, 2, 3, 4, 5])
  const [isDragging, setIsDragging] = useState(false)

  const wheelRef = useRef<HTMLDivElement>(null)

  // Información del movimiento táctil actual.
  // Se actualiza en cada movimiento para permitir vueltas completas.
  const dragState = useRef<{
    pointerId: number
    angle: number
    rotation: number
  } | null>(null)

  // Giro automático mediante el botón
  const spinWheel = (forcedIndex?: number) => {
    if (isSpinning || spinCount >= 3 || dragState.current) return

    setIsSpinning(true)
    setShowResult(false)
    setSelectedAnswer(null)

    let selectedIndex: number

    if (forcedIndex !== undefined) {
      selectedIndex = forcedIndex
    } else {
      const randomIndex = Math.floor(Math.random() * availableThemes.length)
      selectedIndex = availableThemes[randomIndex]
    }

    const segmentAngle = 360 / themes.length

    const targetAngle =
      360 - (selectedIndex * segmentAngle + segmentAngle / 2)

    // Tomar la posición real actual, incluso si se giró manualmente
    const currentRotation = wheelRotation.get()

    const normalizedRotation =
      ((currentRotation % 360) + 360) % 360

    // Agregar cuatro vueltas completas antes de detenerse
    const rotationNeeded =
      targetAngle - normalizedRotation + 1440

    animate(
      wheelRotation,
      currentRotation + rotationNeeded,
      {
        duration: 4,
        ease: 'easeOut'
      }
    )

    setTimeout(() => {
      setSelectedTheme(themes[selectedIndex])

      // Pregunta aleatoria dentro de la categoría seleccionada
      const randomQuestionIndex = Math.floor(
        Math.random() * themes[selectedIndex].questions.length
      )

      setCurrentQuestionIndex(randomQuestionIndex)
      setIsSpinning(false)
      setSpinCount(prev => prev + 1)

      setAvailableThemes(prev =>
        prev.filter(i => i !== selectedIndex)
      )
    }, 4000)
  }

  // Seleccionar una respuesta
  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (
      answerIndex ===
      selectedTheme!.questions[currentQuestionIndex].correct
    ) {
      setScore(prev => prev + 1)
    }
  }

  // Volver a la ruleta después de responder
  const nextQuestion = () => {
    setSelectedTheme(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)

    if (spinCount >= 3) {
      setGameComplete(true)
    }
  }

  // Reiniciar completamente el juego
  const resetGame = () => {
    wheelRotation.stop()
    wheelRotation.set(0)

    dragState.current = null

    setIsDragging(false)
    setSelectedTheme(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setSpinCount(0)
    setGameComplete(false)
    setAvailableThemes([0, 1, 2, 3, 4, 5])
    setIsSpinning(false)
  }

  // Comienza el movimiento manual con el dedo
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSpinning || spinCount >= 3) return

    e.preventDefault()

    const rect = wheelRef.current?.getBoundingClientRect()

    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const startAngle =
      Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * (180 / Math.PI)

    // Detener cualquier animación anterior
    wheelRotation.stop()

    // Guardar la posición inicial
    dragState.current = {
      pointerId: e.pointerId,
      angle: startAngle,
      rotation: wheelRotation.get()
    }

    // Capturar el puntero para no perder el movimiento
    e.currentTarget.setPointerCapture(e.pointerId)

    setIsDragging(true)
  }

  // Mover la ruleta siguiendo el dedo
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current

    if (!drag || drag.pointerId !== e.pointerId) return

    const rect = wheelRef.current?.getBoundingClientRect()

    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const currentAngle =
      Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * (180 / Math.PI)

    // Calcular el movimiento desde el último evento,
    // no desde el inicio del arrastre.
    let deltaAngle = currentAngle - drag.angle

    // Corregir el salto entre -180 y 180 grados
    if (deltaAngle > 180) {
      deltaAngle -= 360
    }

    if (deltaAngle < -180) {
      deltaAngle += 360
    }

    // Acumular la rotación para permitir vueltas completas
    drag.rotation += deltaAngle
    drag.angle = currentAngle

    // Actualizar directamente la animación sin renderizar React
    wheelRotation.set(drag.rotation)
  }

  // Finalizar el movimiento cuando se levanta el dedo
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current

    if (!drag || drag.pointerId !== e.pointerId) return

    dragState.current = null

    setIsDragging(false)

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }

    // Calcular el ángulo final y agregar inercia con varias vueltas
    const currentRotation = wheelRotation.get()
    const normalizedRotation = ((currentRotation % 360) + 360) % 360

    // Determinar qué segmento quedó seleccionado
    const segmentAngle = 360 / themes.length
    const selectedIndex = Math.floor(((360 - normalizedRotation + segmentAngle / 2) % 360) / segmentAngle)

    // Agregar 4 vueltas completas (1440°) para efecto de inercia
    const targetRotation = currentRotation + 1440

    setIsSpinning(true)
    setShowResult(false)
    setSelectedAnswer(null)

    animate(
      wheelRotation,
      targetRotation,
      {
        duration: 4,
        ease: 'easeOut'
      }
    )

    setTimeout(() => {
      setSelectedTheme(themes[selectedIndex])

      const randomQuestionIndex = Math.floor(
        Math.random() * themes[selectedIndex].questions.length
      )

      setCurrentQuestionIndex(randomQuestionIndex)
      setIsSpinning(false)
      setSpinCount(prev => prev + 1)

      setAvailableThemes(prev =>
        prev.filter(i => i !== selectedIndex)
      )
    }, 4000)
  }

  return (
    <div className="app">

      <header className="header">
        <h1> FIESTA NACIONAL DEL SOL 2026</h1>

        <p>¡Gira la ruleta y descubre San Juan!</p>

        <div className="spin-counter">
          <span>Tirada {Math.min(spinCount + 1, 3)} de 3</span>
        </div>
      </header>

      {/* RUleta */}
      <div style={{ display: selectedTheme ? 'none' : 'block' }}>
        <div className="wheel-container">

          <div className="wheel-wrapper">

            <motion.div
              ref={wheelRef}
              className="wheel"

              style={{
                rotate: wheelRotation,
                pointerEvents: isSpinning ? 'none' : 'auto',
                touchAction: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}

              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onLostPointerCapture={handlePointerUp}
            >

              <svg viewBox="0 0 400 400" className="wheel-svg">

                {themes.map((theme, index) => {
                  const angle = (360 / themes.length) * index
                  const nextAngle = (360 / themes.length) * (index + 1)

                  const startAngle = angle - 90
                  const endAngle = nextAngle - 90

                  const x1 =
                    200 + 190 * Math.cos((startAngle * Math.PI) / 180)

                  const y1 =
                    200 + 190 * Math.sin((startAngle * Math.PI) / 180)

                  const x2 =
                    200 + 190 * Math.cos((endAngle * Math.PI) / 180)

                  const y2 =
                    200 + 190 * Math.sin((endAngle * Math.PI) / 180)

                  const textAngle =
                    angle - 90 + (360 / themes.length) / 2

                  const textX =
                    200 + 145 * Math.cos((textAngle * Math.PI) / 180)

                  const textY =
                    200 + 145 * Math.sin((textAngle * Math.PI) / 180)

                  const iconUrl =
                    iconMap[index as keyof typeof iconMap]

                  return (
                    <g key={theme.name}>
                      <path
                        d={`M 200 200 L ${x1} ${y1} A 190 190 0 0 1 ${x2} ${y2} Z`}
                        fill={theme.color}
                        fillOpacity="0.48"
                        stroke="rgba(255,255,255,0.10)"
                        strokeWidth="0.8"
                      />
                      <image
                        href={iconUrl}
                        x={textX - 29}
                        y={textY - 29}
                        width="58"
                        height="58"
                        style={{
                          filter: 'drop-shadow(2px 3px 4px rgba(0,0,0,0.35))'
                        }}
                      />
                    </g>
                  )
                })}

                {/* Central circle with GIRAR text */}
                <circle
                  cx="200"
                  cy="200"
                  r="55"
                  fill="white"
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="2"
                />
                <text
                  x="200"
                  y="200"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="#FFB643"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  GIRAR
                </text>

              </svg>

            </motion.div>

            <div className="wheel-pointer">▼</div>

          </div>

          {/* BOTÓN DE GIRO AUTOMÁTICO */}
          {/* <motion.button
            className="spin-button"
            onClick={() => spinWheel()}
            disabled={isSpinning || spinCount >= 3}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSpinning
              ? '🎰 GIRANDO...'
              : spinCount >= 3
                ? '¡COMPLETADO!'
                : '🎲 GIRAR RULETA'}
          </motion.button>
 */}
          <div className="score-display">

            <p>Puntuación: {score}/3</p>

            {spinCount > 0 && (
              <button
                onClick={resetGame}
                className="reset-button"
              >
                Reiniciar
              </button>
            )}

          </div>

        </div>
      </div>

      {/* PANTALLA DE PREGUNTAS */}
      {selectedTheme && !gameComplete && (

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="questions-container"
        >

          <div
            className="theme-header"
            style={{ backgroundColor: selectedTheme.color }}
          >

            <h2>{selectedTheme.name}</h2>

            <p>Pregunta {spinCount} de 3</p>

          </div>

          <div className="question-card">

            <h3>
              {selectedTheme.questions[currentQuestionIndex].question}
            </h3>

            <div className="options">

              {selectedTheme.questions[currentQuestionIndex].options.map(
                (option, index) => (

                  <motion.button
                    key={index}

                    className={`option-button ${
                      showResult
                        ? index === selectedTheme.questions[currentQuestionIndex].correct
                          ? 'correct'
                          : selectedAnswer === index
                            ? 'incorrect'
                            : ''
                        : selectedAnswer === index
                          ? 'selected'
                          : ''
                    }`}

                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                  >

                    {String.fromCharCode(65 + index)}) {option}

                    {showResult &&
                      index === selectedTheme.questions[currentQuestionIndex].correct &&
                      ' ✓'}

                    {showResult &&
                      selectedAnswer === index &&
                      index !== selectedTheme.questions[currentQuestionIndex].correct &&
                      ' ✗'}

                  </motion.button>

                )
              )}

            </div>

            {showResult && (

              <motion.button
                className="next-button"
                onClick={nextQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >

                {spinCount < 3
                  ? 'Volver a la Ruleta'
                  : 'Ver Resultados'}

              </motion.button>

            )}

          </div>

        </motion.div>

      )}

      {/* RESULTADOS FINALES */}
      {gameComplete && (

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="results-container"
        >

          <div className="results-card">

            <h2>🎉 ¡Juego Completado!</h2>

            <p className="final-score">
              Tu puntuación final: {score}/3
            </p>

            <div className="score-message">

              {score === 3 && (
                <p>¡Excelente! Eres un experto en San Juan 🏆</p>
              )}

              {score === 2 && (
                <p>¡Muy bien! Conoces mucho sobre San Juan 👏</p>
              )}

              {score === 1 && (
                <p>¡Bien! Sigue aprendiendo sobre San Juan 📚</p>
              )}

              {score === 0 && (
                <p>¡No te rindas! Inténtalo de nuevo 💪</p>
              )}

            </div>

            <motion.button
              className="next-button"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Jugar de Nuevo
            </motion.button>

          </div>

        </motion.div>

      )}

    </div>
  )
}

export default App
