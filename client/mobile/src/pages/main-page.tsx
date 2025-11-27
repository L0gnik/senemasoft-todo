import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { IconButton, Portal, useTheme } from "react-native-paper";
import { Modal } from "src/components/ui";

import { ConfirmDeleteAction, TodoForm, TodoList } from "../components";
import { useTodos } from "../hooks";

export const MainPage = () => {
    const {
        todos,
        onToggleCompleted,
        action,
        createTodo,
        deleteTodo,
        patchTodo,
        setAction,
    } = useTodos();
    const theme = useTheme();
    return (
        <View>
            <Portal>
                <IconButton
                    onPress={() => setAction({ type: "create" })}
                    containerColor={theme.colors.surface}
                    icon="pencil-plus"
                    mode="contained"
                    size={50}
                    style={{
                        position: "absolute",
                        bottom: 50,
                        right: 40,
                    }}
                />
            </Portal>
            <TodoList
                todos={todos || []}
                onToggleCompleted={(todo) => onToggleCompleted(todo)}
                onDelete={(todo) => setAction({ item: todo, type: "delete" })}
                onEdit={(todo) => setAction({ item: todo, type: "edit" })}
            />
            <Modal visible={!!action} onDismiss={() => setAction(null)}>
                <Modal.Title>
                    {action?.type === "delete"
                        ? "Подтверждение"
                        : action?.type === "edit"
                        ? "Редактирование"
                        : "Новая задача"}
                </Modal.Title>
                <Modal.Content>
                    {action?.type === "delete" && (
                        <ConfirmDeleteAction
                            onConfirm={() => deleteTodo(action.item._id)}
                            onCancel={() => setAction(null)}
                            recordName={action.item.title}
                        />
                    )}
                    {action?.type === "edit" && (
                        <TodoForm
                            sumbitText="Применить"
                            initialValues={action.item}
                            onSubmit={(values) =>
                                patchTodo(action.item._id, values)
                            }
                        />
                    )}
                    {action?.type === "create" && (
                        <TodoForm onSubmit={createTodo} sumbitText="Добавить" />
                    )}
                </Modal.Content>
            </Modal>
            <StatusBar style="auto" />
        </View>
    );
};
