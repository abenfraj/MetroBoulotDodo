const dijkstra = (graph, start, end) => {
  const distances = {};
  const previous = {};
  const nodes = new PriorityQueue();
  const path = [];
  let smallest;
  let vertex;
  let neighbor;
  let alt;

  // Build up initial state
  for (vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.enqueue(0, vertex);
    } else {
      distances[vertex] = Infinity;
      nodes.enqueue(Infinity, vertex);
    }

    previous[vertex] = null;
  }

  while (nodes.values.length) {
    smallest = nodes.dequeue().val;
    if (smallest === end) {
      // We are done, build up path to return
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      break;
    }

    if (smallest || distances[smallest] !== Infinity) {
      for (neighbor in graph[smallest]) {
        // Find neighboring node
        alt = distances[smallest] + graph[smallest][neighbor];
        if (alt < distances[neighbor]) {
          // Updating new smallest distance to neighbor
          distances[neighbor] = alt;
          // Updating previous - How we got to neighbor
          previous[neighbor] = smallest;
          // Enqueue in priority queue with new priority
          nodes.enqueue(alt, neighbor);
        }
      }
    }
  }
  return path.concat(smallest).reverse();
};

module.exports = {
    dijkstra,
};