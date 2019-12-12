import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Button,
} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        height: '50%',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    input: {
        marginVertical: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },

    button: {
        marginVertical: 5,
    },
})

const AuthScreen: NavigationStackScreenComponent = () => {
    const [input, setInput] = useState({ email: '', password: '' })
    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}
                style={styles.container}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={text => setInput({ ...input, email: text })}
                    placeholder="Email Address"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        setInput({ ...input, password: text })
                    }
                    placeholder="Password"
                />
                <View style={styles.button}>
                    <Button
                        title="Login"
                        color="blue"
                        onPress={() => console.log(input)}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Sign Up"
                        color="red"
                        onPress={() => console.log(input)}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authentication',
}

export default AuthScreen
