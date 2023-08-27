import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { COLORS, Url } from '../../constants';
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';

const ViewAssignments = ({ navigation }) => {

    const isFocused = useIsFocused()
    const [assignments, setAssignments] = useState([])


    const handleDelete = (Aid) => {
        // Send a DELETE request to the API endpoint
        fetch(`${Url}/Teacher/DeleteAssignment?Aid=${Aid}`, {
            method: 'DELETE',
        })
            .then(message => {
                console.log('message: ', message);
                alert(message.json());
                getAssignments()

            })
            .catch(error => console.error(error));
    };



    const getAssignments = () => {

        axios.get(`${Url}/Teacher/GetAssgs`)
            .then(response => {
                setAssignments(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(() => {
        getAssignments()
    }, [isFocused]);


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>View Assignment</Text>
            <ScrollView style={styles.scrollView}>
                {assignments.map((assignment) => (
                    <TouchableOpacity
                        key={assignment.Sid}
                        style={styles.assignmentContainer}
                    >
                        <View style={styles.assignmentBox}>
                            <Text style={[styles.titleText, { textAlign: 'center', marginVertical: 10 }]}>Assignment Number: {assignment.AssignmentNumber}</Text>
                            <Text style={styles.titleText}>Title: {assignment.Title}</Text>
                            <Text style={styles.descriptionText}>Due Date: {new Date(assignment.Deadline).toLocaleDateString()}</Text>
                            <Text style={styles.dateText}>Database Name: {assignment.DatabaseName}</Text>
                            <Text style={styles.dateText}>Semester: {assignment.Smester}</Text>
                            <Text style={styles.fileURLText}>Section: {assignment.Section}</Text>
                            <View style={styles.actionBtnContainer}>
                                <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(assignment.Aid)}>
                                    <Text style={styles.actionBtnText} >Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.bottomBtn}>
                <TouchableOpacity style={[styles.actionBtn, { width: 100, backgroundColor: COLORS.blueColor }]} onPress={() => navigation.goBack()} >
                    <Text style={styles.actionBtnText}>Back</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    actionBtnContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'flex-end'
    },
    actionBtn: {
        borderRadius: 12,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10
    },
    actionBtnText: {
        color: COLORS.secondry
    },
    editBtn: {
        backgroundColor: COLORS.green
    },
    deleteBtn: {
        backgroundColor: COLORS.red
    },
    bottomBtn: {
        marginVertical: 10,
        flexDirection: 'row',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    assignmentContainer: {
        marginBottom: 10,
    },
    assignmentBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        padding: 10,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    descriptionText: {
        fontSize: 14,
        color: 'white',
    },
    dateText: {
        fontSize: 12,
        color: 'white',
        marginTop: 5,
    },
    fileURLText: {
        fontSize: 15,
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    downloadText: {
        fontSize: 16,
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    backButton: {
        marginTop: 20,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default ViewAssignments;
