import { StyleSheet, Text, View, SafeAreaView} from "react-native";

export const WelcomeScreen = () => {
    return(
        <SafeAreaView style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    }
})