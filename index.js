const fastify = require("fastify");
const serverOptions = {
    logger: true
};
const app = fastify(serverOptions);

// app.route({
//     url: "/hello",
//     method: "GET",
//     handler(request, reply) {
//       reply.send("Hello word!");
//     },
// });

let todos = [];
app.get("/todos", {
    handler(request, reply) {
        // reply.send("Hello world v2");
        reply.send(todos);
    },
});

app.post("/todos", {
    handler(request, reply) {
        const newTodo = {id: todos.length + 1, ...request.body};
        todos.push(newTodo);
        reply.code(201).send(newTodo);
    },
});

app.get("/todos/:id(\\d+)", {
    handler(request, reply) {
        const {id} = request.params;

        const todo = todos.find(todo => todo.id === +id);
        if (todo) {
            return reply.send(todo);
        }
        reply.code(404).send(`Todo not found: [${id}]`);
    },
});

app.patch("/todos", {
    handler(request, reply) {
        const {id, label} = request.body;
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todo.label = label;
            return reply.send(todo);
        }
        reply.code(404).send(`Todo not found: [${id}]`);
    },
});

app.delete("/todos/:id(\\d+)", {
    handler(request, reply) {
        const {id} = request.params;
        const todo = todos.find(todo => todo.id === +id);
        if (todo) {
            todos = todos.filter(todo => todo.id !== +id);
            return reply.code(204).send();
        }
        reply.code(404).send(`Todo not found: [${id}]`);
    },
});

app.listen({
    port: 8080,
    host: "localhost"
}).then((address) => {
    console.log(`Server is running on ${address}`);
});