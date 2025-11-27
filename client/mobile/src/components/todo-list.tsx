import React from "react";
import { StyleSheet, View } from "react-native";
import {
    Checkbox,
    Divider,
    IconButton,
    Menu,
    useTheme,
} from "react-native-paper";

import { TodoModel } from "../types";
import { DateLabel, Flex, Text } from "./ui";

type Actions = {
    onToggleCompleted: (record: TodoModel) => void;
    onDelete: (record: TodoModel) => void;
    onEdit: (record: TodoModel) => void;
};

export const TodoList = ({
    todos,
    onDelete,
    onEdit,
    onToggleCompleted,
}: {
    isLoading?: boolean;
    todos: TodoModel[];
} & Actions) => {
    return (
        <View style={TodoListStyles.list}>
            {todos.map((todo, index) => (
                <React.Fragment key={todo._id}>
                    {index === 0 && <Divider />}
                    <TodoItem
                        onDelete={onDelete}
                        onEdit={onEdit}
                        todo={todo}
                        onToggleCompleted={onToggleCompleted}
                    />
                    <Divider />
                </React.Fragment>
            ))}
        </View>
    );
};

const TodoListStyles = StyleSheet.create({
    list: {
        display: "flex",
        flexDirection: "column",
    },
});

const TodoItem = ({
    todo,
    onDelete,
    onEdit,
    onToggleCompleted,
}: { todo: TodoModel } & Actions) => {
    const theme = useTheme();
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <View
            style={{
                borderColor: "black",
                paddingLeft: 10,
                paddingBottom: 10,
            }}
        >
            <Flex justifyContent="space-between" alignItems="center" gap={8}>
                <Checkbox.Android
                    color={theme.colors.surface}
                    status={todo.completed ? "checked" : "unchecked"}
                    onPress={() => {
                        onToggleCompleted(todo);
                    }}
                />
                <Text
                    variant="titleLarge"
                    weight={600}
                    style={{
                        flex: 1,
                        flexWrap: "wrap",
                        textDecorationLine: todo.completed
                            ? "line-through"
                            : "none",
                    }}
                >
                    {todo.title}
                </Text>
                <Menu
                    style={{ marginTop: 40 }}
                    key={visible ? "true" : "false"}
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <IconButton icon="dots-horizontal" onPress={openMenu} />
                    }
                >
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            onEdit(todo);
                        }}
                        leadingIcon="clipboard-edit-outline"
                        title="Редактировать"
                    />
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            onDelete(todo);
                        }}
                        leadingIcon="delete"
                        title="Удалить"
                    />
                </Menu>
            </Flex>
            <Flex style={{ paddingLeft: 6 }}>
                <DateLabel date={todo.expiredDate} />
            </Flex>
        </View>
    );
};
