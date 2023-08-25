import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native'
export const CustomInput = ({ value, onChangeText, icon, placeholder, inputStyle }) => {
    return (
        <View>
            <TextInput
                style={[styles.InputFields, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
            {
                icon && <Image
                    source={icon}
                    resizeMode={'center'}
                    style={styles.icon}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    InputFields: {
        backgroundColor: '#efefef',
        borderWidth: 0.5,
        borderColor: "#dbdbdb",
        borderRadius: 10,
        paddingLeft: 52,
        fontSize: 16,
        marginVertical: 10
    },
    icon: {
        height: 20,
        position: "relative",
        bottom: 38,
        right: 40
    },
    iconLeft: {
        height: 20,

    }
});

