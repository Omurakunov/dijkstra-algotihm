
class Graph {
    constructor() {
        this.adjacencyList = {}
        this.shortestPath = {}
        this.history = []
        this.max = Number.MAX_VALUE
    }

    //This function adds the nodes
    addNode(node) {
        if (!this.adjacencyList[node]) this.adjacencyList[node] = []

        //Here we create for each node the object in this.shortestPath with keys: distance and prevNode
        if (!this.shortestPath[node]) this.shortestPath[node] = {distance: this.max, prevNode: null}
    }

    //In this function we create the connections between node with distance in it
    addEdge(node1, node2, distance) {
        this.adjacencyList[node1].push({node: node2, distance})
        this.adjacencyList[node2].push({node: node1, distance})

    }

    //Here we check if the distance is shorter than the previous one, If so we replace it
    addShortest(node, distance ,current) {
        let sum = distance + this.shortestPath[current].distance
        if (sum < this.shortestPath[node].distance) {
            this.shortestPath[node].prevNode = current
            this.shortestPath[node].distance = sum
        }
    }

    //It's a main function that does the BFT, and for each circulation calls the addShortest()
    dijkstra(src, dst) {

        //Here we check the situation if the client says that want to reach from point A to point A
        if (src === dst) {
            return {distance: 0, prevNode: src}
        }
        this.shortestPath[src].distance = 0
        let queue = [src]
        let visited = new Set()

        //Here is happening BFT
        while (queue.length > 0) {
            let current = queue.shift()
            if (!(visited.has(current))){
                visited.add(current)
                for (let neighbor of this.adjacencyList[current]) {
                    let {node, distance} = neighbor
                    queue.push(node)
                    this.addShortest(node, distance, current)

                }
            }
        }
        //Here we go through all previous Nodes and collect them to create a path
        this.history.push(dst)
        let prevNodes = [ dst ]
        while(prevNodes.length !== 0){
            let currentNode = prevNodes.shift()
            if (this.shortestPath[currentNode].prevNode){
                this.history.push(this.shortestPath[currentNode].prevNode)
                prevNodes.push(this.shortestPath[currentNode].prevNode)
            }

        }
        return `The shortest way from point ${src} to the point ${dst} is ${this.shortestPath[dst].distance}. Here is the path you need to walk through: ${this.history} `

    }


}

let graph = new Graph()

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);


console.log(graph.dijkstra('A', 'D'))
