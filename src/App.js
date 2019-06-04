import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import './App.css';


class App extends React.Component {
  equalPressed=false;

  constructor(){
    super()
    this.state={
      calculation:"",
      result:""
    }
    this.handleNumber = this.handleNumber.bind(this);
  }

  handleNumber(data){
    if(this.equalPressed&&data!=='='&&data!=='+'&&data!=='-'&&data!=='*'&&data!=='/'){
      this.equalPressed=false;
      this.setState({
        calculation: String(data),
        result: ""
      })
      
    }
    else{
      if(data==='='){
        this.equalPressed=true;
        this.calculate();
      }
      else{
        if(data==='.'){
          if(this.state.calculation[this.state.calculation.length-1]!=='.'){
            this.setState({
              calculation: this.state.calculation+data
            })
          }
        }
        else{
          this.setState({
            calculation: this.state.calculation+data
          })
        }
      }
    }

  }

  handleOperation(data){
    this.equalPressed=false;
    let operationsArray=['+','-','*','/'];
    if(this.state.calculation&&!operationsArray.includes(this.state.calculation[this.state.calculation.length-1])){
      this.setState({
        calculation: this.state.calculation+data
      })
    }
  }

  calculate(){
    let operationsArray=['+','-','*','/'];
    let trimmed = this.state.calculation;
    if(operationsArray.includes(this.state.calculation[this.state.calculation.length-1])){
      trimmed = this.state.calculation.slice(0,this.state.calculation.length-1)
      this.setState({
        calculation: trimmed
      })
    }
    this.setState({
      result: eval(trimmed)
    })
  }

  handleBack(){
    this.setState({
      calculation: this.state.calculation.slice(0,this.state.calculation.length-1)
    })
  }

  render(){
  
    let numberRow=[];
    let operations=[];
    let data=[[1,2,3],[4,5,6],[7,8,9],[0,'.','=']];
    let operationsArray=['+','-','*','/'];
    
    for (let i = 0; i < 4; i++) {
      let buttons=[]
      for (let j = 0; j < 3; j++) {
        buttons.push(
        <TouchableOpacity onPress={() => this.handleNumber(data[i][j])} key={data[i][j]} style={styles.btn}>
          <Text style={styles.btnText}>{data[i][j]}</Text>
        </TouchableOpacity>
        )
      }
      numberRow.push(<View style={styles.row} key={i}>{buttons}</View>)
    }
    for (let i = 0; i < 4; i++) {
        operations.push(
        <TouchableOpacity onPress={() => this.handleOperation(operationsArray[i])} key={data[i]} style={styles.btn}>
          <Text style={styles.btnText}>{operationsArray[i]}</Text>
        </TouchableOpacity>
        )
    }

    return(
      <View style={styles.container}>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculation}</Text>
          <TouchableOpacity onPress={() => this.handleBack()} style={styles.backButton}><div className="back"></div></TouchableOpacity>
        </View>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.result}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {numberRow}  
          </View>
          <View style={styles.operations}>
            {operations}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  calculation:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end'
  },
  calculationText:{
    flex:8,
    fontSize:20,
    marginLeft:10,
    marginRight:10
  },
  backButton:{
    flex:1,
    alignSelf:'auto'
  },
  result:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'flex-end',
  },
  resultText:{
    fontSize:30,
    color:'black'
  },
  buttons:{
    flex:3,
    backgroundColor: 'black',
    flexDirection:'row'
  },
  numbers:{
    flex:3,
    backgroundColor: '#434343',
  },
  btn:{
    flex:1,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center'
  },
  btnText:{
    fontSize:30,
    color:'white'
  },
  row:{
    flex:1,
    flexDirection:'row',
  },
  operations:{
    flex:1,
    backgroundColor: '#636363',
    alignItems:'baseline'
  },

  test:{

  }
})

export default App

