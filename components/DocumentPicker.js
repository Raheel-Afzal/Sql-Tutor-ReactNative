import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, ICONS, } from '../constants';
import DocumentPicker from 'react-native-document-picker';
import { Alert } from 'react-native';




const DocumentPickerField = ({ file, setFile }) => {

    const selectFile = async () => {
        try {

            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.docx, DocumentPicker.types.images, DocumentPicker.types.doc],

            });
            console.log("res", res)
            if (res.size < 5104500) {

                const fileDetail = {
                    uri: res.uri,
                    type: res.type,
                    name: res.name,
                }

                setFile(fileDetail)
            }
            else {
                Alert.alert('Warning', 'File size must be less than 5 mb')
            }

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {

            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    return (
        <View style={styles.itemContainer}>
            {
                file !== null && (
                    <View
                        style={styles.filePickerContainer}>
                        <View
                            style={{
                                width: '15%',
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            {
                                file?.type == 'application/pdf' ?
                                    <Image source={ICONS.pdfIcon} resizeMode='contain' style={{ width: 30 }} />
                                    :
                                    file?.type == 'image/jpeg' ?
                                        <Image source={ICONS.imageIcon} resizeMode='contain' style={{ width: 30 }} />
                                        :
                                        <Image source={ICONS.docxIcon} resizeMode='contain' style={{ width: 30 }} />

                            }
                        </View>
                        <View style={{ width: '60%', marginLeft: 6, justifyContent: 'center', }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: 'grey',
                                    width: '100%',
                                    marginTop:10,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                }}>
                                {file == null ? "File Name" : file.name}
                            </Text>
                            <Text
                                style={{
                                    color: 'grey',
                                    width: '100%',
                                    alignSelf: 'center',
                                    fontSize: 10,
                                }}>
                            </Text>
                        </View>
                    </View>
                )
            }
            <TouchableOpacity style={styles.filePicker} onPress={selectFile}>
                <Image source={ICONS.docPick} style={styles.docIcon} />
            </TouchableOpacity>
            <Text style={styles.size}>max size: 5 MB</Text>
        </View>
    );
};
export default DocumentPickerField
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.bgGrey,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    itemContainer: {
        width: '97%',
        marginRight: 10,
        alignItems: 'center',
        shadowColor: '#00000080',
        elevation: 12,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
        backgroundColor: COLORS.secondry,
        borderRadius: 15,
        marginVertical: 12,
        paddingVertical: 10,
    },


    filePickerContainer: {
        width: '80%',
        height: 45,
        borderWidth: 0.7,
        borderColor: 'grey',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    filePicker: {
        width: '85%',
        height: 45,
        borderRadius: 30,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    docIcon: {
        width: 25,
        height: 25,
    },
    applyBtnContainer: {
        alignItems: 'center',
        width: "80%",
        alignSelf: 'center',
        marginBottom: 20,
    },
    applyBtn: {
        width: '100%',
        height: 45,
        backgroundColor: '#f79007',
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    applyBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 4,
    },
   
});
