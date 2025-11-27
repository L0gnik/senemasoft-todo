import { Card, Flex, Layout, Modal, Typography } from "antd";
import {
    ConfirmDeleteAction,
    ThemeSwitch,
    TodoForm,
    TodoList,
} from "src/components";
import { useTodos } from "src/hooks";
import { getTodoCountText } from "src/utils";

import styles from "./main-page.module.css";

export const MainPage = () => {
    const {
        todos,
        isLoading,
        todoCount,
        createTodo,
        toggleCompleted,
        deleteTodo,
        patchTodo,
        action,
        setAction,
    } = useTodos();
    const todoText = getTodoCountText(todoCount);
    return (
        <Layout className={styles.layout}>
            <Layout.Header className={styles.header}>
                <div className={styles.header_text}>TodoApp</div>
                <ThemeSwitch />
            </Layout.Header>
            <Layout.Content className={styles.content}>
                <Typography className={styles.overview}>
                    <Typography.Title>Мои задачи</Typography.Title>
                    <Typography.Text>{todoText}</Typography.Text>
                </Typography>
                <Flex gap={16} align="start" wrap="wrap">
                    <Card title="Новая задача" className={styles.form}>
                        <TodoForm
                            sumbitText="Создать"
                            onSubmit={(values) => createTodo(values)}
                            isLoading={isLoading}
                        />
                    </Card>
                    <div className={styles.table}>
                        <TodoList
                            onEdit={(todo) =>
                                setAction({ item: todo, type: "edit" })
                            }
                            onDelete={(todo) =>
                                setAction({ item: todo, type: "delete" })
                            }
                            onToggleCompleted={(todo) => toggleCompleted(todo)}
                            todos={todos || []}
                            isLoading={isLoading}
                        />
                    </div>
                </Flex>
            </Layout.Content>
            <Modal
                open={!!action}
                title={
                    action?.type === "edit"
                        ? "Редактировать"
                        : "Подтверждение действия"
                }
                destroyOnHidden
                footer={null}
                onCancel={() => setAction(null)}
            >
                {action?.type === "edit" && (
                    <TodoForm
                        sumbitText="Применить"
                        initialValues={action.item}
                        onSubmit={(values) =>
                            patchTodo(action.item._id, values)
                        }
                        isLoading={isLoading}
                    />
                )}
                {action?.type === "delete" && (
                    <ConfirmDeleteAction
                        recordName={action.item.title}
                        onConfirm={() => deleteTodo(action.item._id)}
                        onCancel={() => setAction(null)}
                    />
                )}
            </Modal>
        </Layout>
    );
};
