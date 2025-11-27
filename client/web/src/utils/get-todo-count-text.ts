export const getTodoCountText = (count: number) => {
    return `${count} ${
        count === 1 ? "задача" : count > 1 && count < 5 ? "задачи" : "задач"
    }`;
};
