import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Navigator } from 'react-native';
import TaskList from './TaskList';
import TaskForm from './TaskForm';


class PluralTodo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [
        {task: 'Learn React Native'},
        {task: 'Learn React'}
      ]
    };
  }
  renderRow(todo) {
    return (
        <TaskRow todo={todo} />
    );
  }
  onAddStarted() {
    this.nav.push({
      name: 'taskform'
    });
  }
  onAdd(task) {
    console.log('a task was added: ', task);
    this.state.todos.push({task: task});
    this.setState({todos: this.state.todos });
    this.nav.pop();
  }
  onCancel() {
    console.log('Cancelled!');
    this.nav.pop();
  }

  renderScene(route, nav) {
    switch(route.name) {
      case 'taskform':
        return (
          <TaskForm
            onAdd={this.onAdd.bind(this)} 
            onCancel={this.onCancel.bind(this)} 
          />
        );
         
      default:
        return (
            <TaskList 
          onAddStarted={this.onAddStarted.bind(this)}
          todos={this.state.todos}
        />
        )
    }
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }
  render() {
    return (
      <Navigator 
        configureScene={this.configureScene}
        initialRoute={{ name: 'tasklist', index: 0}}
        ref={( (nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(PluralTodo);
