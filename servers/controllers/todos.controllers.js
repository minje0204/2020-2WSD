const Todo = require('../../models/Todo');
exports.getAll = async function (req, res, next) {
    try {
        const allTodos = await Todo.find({
            user_id: res.locals.userId
        });
        res.json({ todos: allTodos });
    } catch (err) {
        next(err);
    }
};

