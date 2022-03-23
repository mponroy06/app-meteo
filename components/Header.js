import { View, Text, StyleSheet } from "react-native";


export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.logo}>Météo</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header:{
        flex: 1,
        height: 100,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    }
})