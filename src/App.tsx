import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

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
    color: '#8943EE',
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
        correct: 1
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
    color: '#4B0983',
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
    color: '#FFB643',
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
        correct: 2
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
    color: '#8943EE',
    questions: [
      {
        question: '¿EN QUÉ CALLE DE LA CIUDAD SE ENCUENTRA EL ENTE PROVINCIAL ISCHIGUALASTO?',
        options: ['Av. Ignacio De La Roza', 'Av. Libertador', 'Av. Rioja'],
        correct: 0
      },
      {
        question: '¿DÓNDE SE UBICA EL NUEVO MUSEO PALEONTOLÓGICO DE SAN JUAN?',
        options: ['Parque de Mayo', 'Plaza del Bicentenario', 'Parque Belgrano'],
        correct: 1
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
    color: '#4B0983',
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
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const spinWheel = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setShowResult(false)
    setSelectedAnswer(null)

    const randomRotation = Math.floor(Math.random() * 360) + 1440
    setRotation(prev => prev + randomRotation)

    setTimeout(() => {
      const normalizedRotation = (rotation + randomRotation) % 360
      const segmentAngle = 360 / themes.length
      const selectedIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % themes.length
      setSelectedTheme(themes[selectedIndex])
      setCurrentQuestionIndex(0)
      setIsSpinning(false)
    }, 4000)
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === selectedTheme!.questions[currentQuestionIndex].correct) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedTheme!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setSelectedTheme(null)
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetGame = () => {
    setSelectedTheme(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌞 FIESTA NACIONAL DEL SOL 2026</h1>
        <p>¡Gira la ruleta y descubre San Juan!</p>
      </header>

      <AnimatePresence mode="wait">
        {!selectedTheme ? (
          <motion.div
            key="wheel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="wheel-container"
          >
            <div className="wheel-wrapper">
              <motion.div
                className="wheel"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: "easeOut" }}
                style={{ pointerEvents: isSpinning ? 'none' : 'auto' }}
              >
                <svg viewBox="0 0 400 400" className="wheel-svg">
                  {themes.map((theme, index) => {
                    const angle = (360 / themes.length) * index
                    const nextAngle = (360 / themes.length) * (index + 1)
                    const startAngle = angle - 90
                    const endAngle = nextAngle - 90
                    
                    const x1 = 200 + 190 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 200 + 190 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 200 + 190 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 200 + 190 * Math.sin((endAngle * Math.PI) / 180)
                    
                    const textAngle = angle - 90 + (360 / themes.length) / 2
                    const textX = 200 + 145 * Math.cos((textAngle * Math.PI) / 180)
                    const textY = 200 + 145 * Math.sin((textAngle * Math.PI) / 180)
                    
                    return (
                      <g key={theme.name}>
                        <path
                          d={`M 200 200 L ${x1} ${y1} A 190 190 0 0 1 ${x2} ${y2} Z`}
                          fill={theme.color}
                          stroke="white"
                          strokeWidth="3"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                          style={{
                            textShadow: '2px 2px 3px rgba(0,0,0,0.8)',
                            filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.6))',
                            fontFamily: 'Arial, sans-serif',
                            letterSpacing: '0.1px'
                          }}
                        >
                          {theme.name}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </motion.div>
              <div className="wheel-pointer">▼</div>
            </div>

            <motion.button
              className="spin-button"
              onClick={spinWheel}
              disabled={isSpinning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSpinning ? '🎰 GIRANDO...' : '🎲 GIRAR RULETA'}
            </motion.button>

            {score > 0 && (
              <div className="score-display">
                <p>Puntuación: {score}</p>
                <button onClick={resetGame} className="reset-button">Reiniciar</button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="questions-container"
          >
            <div
              className="theme-header"
              style={{ backgroundColor: selectedTheme.color }}
            >
              <h2>{selectedTheme.name}</h2>
              <p>Pregunta {currentQuestionIndex + 1} de {selectedTheme.questions.length}</p>
            </div>

            <div className="question-card">
              <h3>{selectedTheme.questions[currentQuestionIndex].question}</h3>

              <div className="options">
                {selectedTheme.questions[currentQuestionIndex].options.map((option, index) => (
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
                    {showResult && index === selectedTheme.questions[currentQuestionIndex].correct && ' ✓'}
                    {showResult && selectedAnswer === index && index !== selectedTheme.questions[currentQuestionIndex].correct && ' ✗'}
                  </motion.button>
                ))}
              </div>

              {showResult && (
                <motion.button
                  className="next-button"
                  onClick={nextQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentQuestionIndex < selectedTheme.questions.length - 1 ? 'Siguiente Pregunta →' : 'Volver a la Ruleta'}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
