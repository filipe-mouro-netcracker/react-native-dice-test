import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
    // Map<NumberOfDiceSides, quantityOfSaidDice>
    const [selectedDices, setSelectedDices] = useState<Map<number, number>>(
        new Map()
    );
    const [results, setResults] = useState<number[]>([]);

    const addResult = (value: number) => {
        setResults(prev => [...prev, value]);
    };

    const getRandomIntInclusive = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const addDice = (sides: number) => {
        setSelectedDices(prev => {
            const newMap = new Map(prev);
            newMap.set(sides, (newMap.get(sides) || 0) + 1);
            return newMap;
        });
    };

    return (
        <View style={styles.container}>
            <Button title="add d4" onPress={() => addDice(4)} />
            <Button title="add d6" onPress={() => addDice(6)} />
            <Button title="add d8" onPress={() => addDice(8)} />
            <Button title="add d10" onPress={() => addDice(10)} />
            <Button title="add d12" onPress={() => addDice(12)} />
            <Button title="add d20" onPress={() => addDice(20)} />
            <Button title="add d100" onPress={() => addDice(100)} />
            <Button
                title="clear dices"
                onPress={() => setSelectedDices(new Map())}
            />
            {Array.from(selectedDices.entries()).map(([sides, count]) => (
                <Text key={sides}>
                    d{sides} x {count}
                </Text>
            ))}
            <Button
                title="Roll Dices"
                onPress={() => {
                    const result = Array.from(selectedDices.entries()).reduce(
                        (sum, [sides, count]) =>
                            sum +
                            Array.from({ length: count }, () =>
                                getRandomIntInclusive(1, sides)
                            ).reduce((a, b) => a + b, 0),
                        0
                    );
                    addResult(result);
                }}
            />
            <Button title="Clear Results" onPress={() => setResults([])} />
            <Text>Results:</Text>
            {results.map((result, index) => (
                <Text key={index}>
                    Result {index + 1}: {result}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
