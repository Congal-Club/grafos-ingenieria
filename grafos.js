function makeQuestion(origin, destination) {
  let answer = prompt(`¿El nodo ${origin} está conectado con el nodo ${destination}? (s/n): `)
  answer = answer.toLowerCase()

  return answer === 's' || answer === 'si' || answer === 'yes' || answer === 'y' || answer === '1' || answer === 'sí'
}

function showAsPercentage(value) {
  return `${(value * 100).toFixed(2)}%`
}

function readGraphInfo(n) {
  let matrix = Array.from({ length: n }, () => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let isConnected = makeQuestion(String.fromCharCode(65 + i), String.fromCharCode(65 + j))
      matrix[i][j] = isConnected ? 1 : 0
    }
  }

  return matrix
}

function createMatrix(n, graph) {
  let adjacencyMatrix = structuredClone(graph)

  for (let i = 0; i < n; i++) {
    let numberOfConnections = adjacencyMatrix[i].filter((value) => value !== 0).length

    for (let j = 0; j < n; j++) {
      if (adjacencyMatrix[i][j] !== 0) {
        adjacencyMatrix[i][j] = 1 / numberOfConnections
      }
    }
  }

  return adjacencyMatrix
}

function calculatePercentage(n, adjacencyMatrix, percentageVector) {
  let initialVector = structuredClone(percentageVector)
  let finalVector = Array(n).fill(0)

  for (let i = 0; i < n; i++) {
    let sum = 0

    for (let j = 0; j < n; j++) {
      sum += adjacencyMatrix[j][i] * initialVector[j]
    }

    finalVector[i] = sum
  }

  return finalVector
}

function makeLessPopularInMostPopular(n, adjacencyMatrix, index) {
  let matrix = structuredClone(adjacencyMatrix)

  for (let i = 0; i < n; i++) {
    matrix[i][index] = 1
  }

  for (let i = 0; i < n; i++) {
    let numberOfConnections = matrix[i].filter((value) => value !== 0).length

    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== 0) {
        matrix[i][j] = 1 / numberOfConnections
      }
    }
  }

  return matrix
}

function main() {
  let numberOfIterations = parseInt(prompt('Escribe el número de iteraciones: '))
  let n = parseInt(prompt('Escribe el número de nodos que va a tener el grafo: '))

  let graph = readGraphInfo(n)
  let adjacencyMatrix = createMatrix(n, graph)
  let percentageVector = Array(n).fill(1 / n)

  console.log('\n\nLa matriz de adyacencia es: ', adjacencyMatrix, '\n\n')

  for (let i = 1; i <= numberOfIterations; i++) {
    percentageVector = calculatePercentage(n, adjacencyMatrix, percentageVector)
    console.log(`EL vector de porcentajes en la iteración ${i} es: `, percentageVector)
  }

  console.log(`\n\nVector de porcentajes con ${numberOfIterations} iteraciones es: `, percentageVector)

  let max = Math.max(...percentageVector)
  let min = Math.min(...percentageVector)
  let indexOfMax = percentageVector.indexOf(max)
  let indexOfMin = percentageVector.indexOf(min)

  console.log(`\n\nEl nodo ${String.fromCharCode(65 + indexOfMax)} con mayor porcentaje de ser visitado: ${showAsPercentage(max)}`)
  console.log(`El nodo ${String.fromCharCode(65 + indexOfMin)} con menor porcentaje de ser visitado: ${showAsPercentage(min)}`)

  let newAdjacencyMatrix = makeLessPopularInMostPopular(n, adjacencyMatrix, indexOfMin)

  /* MAKE LESS POPULAR TO THE MOST POPULAR */
  console.log('\n\nLa matriz de adyacencia para hacer el nodo menos popular en el mas popular es: ', newAdjacencyMatrix, '\n\n')

  percentageVector = Array(n).fill(1 / n)

  for (let i = 1; i <= numberOfIterations; i++) {
    percentageVector = calculatePercentage(n, newAdjacencyMatrix, percentageVector)
    console.log(`EL vector de porcentajes en la iteración ${i} es: `, percentageVector)
  }

  console.log(`\n\nVector de porcentajes con ${numberOfIterations} iteraciones es: `, percentageVector)

  max = Math.max(...percentageVector)
  min = Math.min(...percentageVector)
  indexOfMax = percentageVector.indexOf(max)
  indexOfMin = percentageVector.indexOf(min)

  console.log(`\n\nEl nuevo nodo con el mayor porcentaje de ser visitado es ${String.fromCharCode(65 + indexOfMax)} con un: ${showAsPercentage(max)}`)
  console.log(`El nuevo nodo con el menor porcentaje de ser visitado es ${String.fromCharCode(65 + indexOfMin)} con un: ${showAsPercentage(min)}`)
}

main()
