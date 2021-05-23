import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles/calc'


const App = () => {
    const [result_text , set_result_text] = useState('')
    const [calculation_text, set_calculation_text] = useState('')
    const operations = ['DEL','+','-','*','/']

    const calculateResult = () => {
        const text_result = result_text
        set_calculation_text(eval(text_result))
    }

    const validate = () => {
        const text_result = result_text
        switch(text_result.slice(-1)){
            case '+': 
            case '-':   
            case '*':
            case '/':
                return false
        }
        return true
    }

    const onPressedHandler = (text) => {   
        if(text === '=')
            return validate() && calculateResult()
        set_result_text(result_text + text)       
    }

    const operateHandler = (operation) => {
        switch(operation){
            case 'DEL':
                let text = result_text.split('')
                text.pop()            
                set_result_text(text.join(''))
                if(text == '') set_calculation_text('')
                break;
            case '+': 
            case '-':   
            case '*':
            case '/':
                const last_char = result_text.split('').pop()
                if(operations.indexOf(last_char) > 0) return
                if(result_text === '') return
                set_result_text(result_text + operation)  
        }
        
    }

    let rows = []
    let nums = [[1, 2, 3],[4, 5, 6],[7, 8, 9],['.', 0, '=']]
    for(let i=0; i < 4; i++){
        let row = []
        for(let j=0; j < 3; j++){
            row.push(<TouchableOpacity key={nums[i][j]} onPress={() => onPressedHandler(nums[i][j])} style={styles.btn}>
                        <Text style={styles.btnText}>{nums[i][j]}</Text>
                     </TouchableOpacity>
            )
        }
        rows.push(<View key={i} style={styles.row}>
            {row}
        </View>)
    }
    let operate = []
    for(let i=0; i < 5; i++){
        operate.push(<TouchableOpacity key={operations[i]} onPress={() => operateHandler(operations[i])} style={styles.btn}>
                        <Text style={[styles.btnText, styles.white]}>{operations[i]}</Text>
                    </TouchableOpacity>)
    }

  return (
    <View style={styles.container}>
        <View style={styles.result}>
            <Text style={styles.resultText}>{result_text}</Text>
        </View>
        <View style={styles.calculation}>
        <Text style={styles.calculationText}>{calculation_text}</Text>
        </View>
        <View style={styles.buttons}>
            <View style={styles.numbers}>
                {rows}
            </View>
            <View style={styles.operations}>
                {operate}
            </View>
        </View>
    </View>
  );
};

export default App;